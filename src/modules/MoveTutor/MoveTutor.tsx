import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { MoveInfoButton } from '../../components/MoveInfoButton/MoveInfoButton';
import { MovesDisplay } from '../../components/OwnedPokemonCard/components/MovesDisplay';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { internalDex } from '../../constants/gameData/internalDexData';
import { handledMoves, MoveName } from '../../constants/movesCheckList';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getEntryWithOverflow } from '../../functions/filterTargets';
import { moveIsTeachable } from '../../functions/moveIsAvailable';
import { withChangedMoves } from '../../functions/withChangedMoves';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType, moveUnlockPayments } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { LearnMethod } from '../../interfaces/PokemonData';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

const learnMethodOrder: Record<LearnMethod, number> = {
	'level-up': 1,
	egg: 2,
	tutor: 3,
	machine: 4,
	'form-change': 5,
	'light-ball-egg': 6,
	'stadium-surfing-pikachu': 7,
	'colosseum-shadow': 8,
	'xd-purification': 9,
	'colosseum-purification': 10,
	'xd-shadow': 11,
	'zygarde-cube': 12,
};

export const MoveTutor = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const [id, setId] = useState<string>(team[0].id);

	const pokemonWithId = useMemo(
		() => team.find((t) => t.id === id),
		[id, team]
	);

	const updateMoves = useCallback(
		(id: string, newMoveNames: MoveName[]) => {
			patchSaveFileReducer({
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id === id) {
						return withChangedMoves(p, newMoveNames);
					}

					return p;
				}),
			});
		},
		[patchSaveFileReducer, saveFile.pokemon]
	);

	const navigate = useNavigate();
	return (
		<Page
			headline="Move Tutor"
			goBack={() => navigate('MOVE_TUTOR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{!id && <strong>Which Pokemon should I teach a move to?</strong>}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
						padding: '2rem',
						columnGap: '1rem',
					}}
				>
					{team.map((t) => (
						<PokemonSprite
							key={t.id}
							onClick={() => setId(t.id)}
							name={t.name}
							sizeFactor={id === t.id ? 3 : 1}
							config={{ officalArtwork: true, shiny: t.shiny }}
						/>
					))}
				</div>
				{pokemonWithId && (
					<>
						<h2>Choose Active Moves:</h2>
						<MovesDisplay ownedPokemon={pokemonWithId} setMoves={updateMoves} />
						<h2>Learn new Moves:</h2>
						<MoveEditor ownedPokemon={pokemonWithId} />
					</>
				)}
			</Stack>
		</Page>
	);
};

const MoveEditor = ({ ownedPokemon }: { ownedPokemon: OwnedPokemon }) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

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
						return {
							...ownedPokemon,
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

	const options = useMemo(() => {
		if (!data) {
			return [];
		}
		return data.moves
			.filter((m) => handledMoves.includes(m.move.name as MoveName))
			.map((m) => {
				if (saveFile.settings?.randomLearnSets) {
					const index =
						handledMoves.findIndex((handled) => handled === m.move.name) +
						ownedPokemon.name.length * 5;
					const randomizedMove = getEntryWithOverflow([...handledMoves], index);
					return {
						...m,
						move: {
							...m.move,
							name: randomizedMove,
						},
					};
				}
				return m;
			})
			.filter(
				(m) => !ownedPokemon.unlockedMoves.includes(m.move.name as MoveName)
			)
			.sort((a, b) => {
				if (ownedPokemon.unlockedMoves.includes(a.move.name as MoveName)) {
					return -1;
				}
				if (ownedPokemon.unlockedMoves.includes(b.move.name as MoveName)) {
					return 1;
				}

				if (
					a.version_group_details[0].move_learn_method.name === 'level-up' &&
					b.version_group_details[0].move_learn_method.name === 'level-up'
				) {
					return (
						a.version_group_details[0].level_learned_at -
						b.version_group_details[0].level_learned_at
					);
				}

				return (
					learnMethodOrder[a.version_group_details[0].move_learn_method.name] -
					learnMethodOrder[b.version_group_details[0].move_learn_method.name]
				);
			});
	}, [
		data,
		ownedPokemon.name.length,
		ownedPokemon.unlockedMoves,
		saveFile.settings?.randomLearnSets,
	]);

	const getCostForLearnMethod = (
		moveName: MoveName,
		learnMethod: LearnMethod
	): ItemType => {
		if (learnMethod === 'level-up') {
			return 'berry-juice';
		}
		return (
			[
				...moveUnlockPayments,
				...moveUnlockPayments,
				...moveUnlockPayments,
				...moveUnlockPayments,
				...moveUnlockPayments,
				...moveUnlockPayments,
			].at(moveName.length) ?? 'berry-juice'
		);
	};

	return (
		<Stack mode={'column'}>
			{options.map((m) => {
				const payment = getCostForLearnMethod(
					m.move.name as MoveName,
					m.version_group_details[0].move_learn_method.name
				);
				const available = moveIsTeachable(
					m,
					calculateLevelData(ownedPokemon.xp, ownedPokemon.growthRate).level
				);

				const disabled = saveFile.bag[payment] < 1 || !available;
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
									!disabled && moveToConfirm === m.move.name
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
								disabled={disabled}
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
