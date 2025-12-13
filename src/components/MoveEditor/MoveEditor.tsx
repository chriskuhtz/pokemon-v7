import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MoveName } from '../../constants/movesCheckList';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getCostForLearnMethod } from '../../functions/getCostForLearnMethod';
import { getMovesArray } from '../../functions/getMovesArray';
import { moveIsTeachable } from '../../functions/moveIsAvailable';
import { mapMovesArrayToPokemon } from '../../functions/withChangedMoves';
import { GameDataContext } from '../../hooks/useGameData';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { useLearnableMoves } from '../../hooks/useLearnableMoves';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';
import { Stack } from '../../uiComponents/Stack/Stack';
import { ItemSprite } from '../ItemSprite/ItemSprite';
import { MoveInfoButton } from '../MoveInfoButton/MoveInfoButton';

export const MoveEditor = ({
	ownedPokemon,
}: {
	ownedPokemon: OwnedPokemon;
}) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const { internalDex } = useContext(GameDataContext);

	const [moveToConfirm, setMoveToConfirm] = useState<MoveName | undefined>();

	const unlockMove = useCallback(
		(move: MoveName, payment: ItemType) => {
			if (saveFile.bag[payment] < 1) {
				return;
			}
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [payment]: 1 }, true),
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id === ownedPokemon.id) {
						const moves = [
							...getMovesArray(ownedPokemon),
							{ name: move, usedPP: 0 },
						];

						return {
							...mapMovesArrayToPokemon(ownedPokemon, moves),
							unlockedMoves: [...ownedPokemon.unlockedMoves, move],
						};
					}

					return p;
				}),
			});
			addMessage({
				message: `${ownedPokemon.name} learned ${move}`,
				needsNoConfirmation: true,
			});
			setMoveToConfirm(undefined);
		},
		[
			addMessage,
			ownedPokemon,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.pokemon,
		]
	);
	const { res: data, invalidate } = useGetPokemonData(
		internalDex[ownedPokemon.name].dexId
	);

	useEffect(() => {
		if (data?.name && ownedPokemon.name !== data.name) {
			invalidate();
		}
	}, [data, invalidate, ownedPokemon]);

	const options = useLearnableMoves(ownedPokemon, data);

	const [onlyLearnable, setOnlyLearnable] = useState<boolean>(false);

	return (
		<Stack mode={'column'}>
			<button key={'button'} onClick={() => setOnlyLearnable(!onlyLearnable)}>
				{onlyLearnable ? 'Show all moves' : 'Only show learnable'}
			</button>
			{options.map((m) => {
				const payment = getCostForLearnMethod(
					m.move.name as MoveName,
					m.version_group_details[0].move_learn_method.name
				);
				const available = moveIsTeachable(
					m,
					calculateLevelData(ownedPokemon.xp, ownedPokemon.growthRate).level
				);
				if (onlyLearnable && !m.learnable) {
					return <React.Fragment key={m.move.name}></React.Fragment>;
				}
				return (
					<div
						key={m.move.name}
						style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
					>
						<div style={{ flexGrow: 1 }}>
							<Card
								key={m.move.name}
								onClick={() => setMoveToConfirm(m.move.name as MoveName)}
								actionElements={
									m.learnable && moveToConfirm === m.move.name
										? [
												<strong
													onClick={() =>
														unlockMove(m.move.name as MoveName, payment)
													}
												>
													Confirm
												</strong>,
										  ]
										: []
								}
								icon={<ItemSprite item={payment} />}
								disabled={!m.learnable}
								content={
									<>
										<strong>
											{available
												? m.move.name
												: `${m.move.name} available at Lvl ${m.version_group_details[0].level_learned_at}`}
										</strong>
										<strong>
											{saveFile.bag[payment] < 1 && ` : ${payment} required`}
										</strong>
									</>
								}
							/>{' '}
						</div>
						<MoveInfoButton movename={m.move.name as MoveName} />
					</div>
				);
			})}
		</Stack>
	);
};
