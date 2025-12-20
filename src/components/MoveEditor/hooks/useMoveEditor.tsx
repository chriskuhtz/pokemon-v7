import { useContext, useState, useCallback, useEffect } from 'react';
import { MoveName } from '../../../constants/movesCheckList';
import { getMovesArray } from '../../../functions/getMovesArray';
import { mapMovesArrayToPokemon } from '../../../functions/withChangedMoves';
import { GameDataContext } from '../../../hooks/useGameData';
import { useGetPokemonData } from '../../../hooks/useGetPokemonData';
import { useLearnableMoves } from '../../../hooks/useLearnableMoves';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';

export const useMoveEditor = ({
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

	return {
		onlyLearnable,
		setOnlyLearnable,
		options,
		unlockMove,
		moveToConfirm,
		setMoveToConfirm,
	};
};
