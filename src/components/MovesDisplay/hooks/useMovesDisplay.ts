import { useCallback, useContext, useMemo } from 'react';
import { MoveName } from '../../../constants/movesCheckList';
import { getMovesArray } from '../../../functions/getMovesArray';
import {
	withActivatedMove,
	withChangedMoves,
	withDeActivatedMove,
} from '../../../functions/withChangedMoves';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import {
	OwnedPokemon,
	OwnedPokemonMove,
} from '../../../interfaces/OwnedPokemon';

export const useMovesDisplay = ({
	ownedPokemon,
}: {
	ownedPokemon: OwnedPokemon;
}) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { res: battleMon, invalidate } = useGetBattleTeam([ownedPokemon], {});

	const currentMoves = useMemo(
		() => getMovesArray(ownedPokemon),
		[ownedPokemon]
	);

	const updateMoves = useCallback(
		(id: string, newMoves: OwnedPokemonMove[]) => {
			patchSaveFileReducer({
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id === id) {
						return withChangedMoves(p, newMoves);
					}

					return p;
				}),
			});
		},
		[patchSaveFileReducer, saveFile.pokemon]
	);

	const reorder = (dir: 'UP' | 'DOWN', name: MoveName) => {
		const focused = currentMoves.find((m) => m.name === name);
		const index = currentMoves.findIndex((m) => m.name === name);
		if (!focused) {
			return;
		}

		if (index === 0 && dir == 'UP') {
			return;
		}
		if (index === currentMoves.length - 1 && dir == 'DOWN') {
			return;
		}
		const displaced =
			dir === 'UP' ? currentMoves[index - 1] : currentMoves[index + 1];

		const newMoves = currentMoves.map((p) => {
			if (p === displaced) {
				return focused;
			}
			if (p === focused) {
				return displaced;
			}
			return p;
		});

		updateMoves(ownedPokemon.id, newMoves);
	};

	const activateMove = (name: MoveName) => {
		patchSaveFileReducer({
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id === ownedPokemon.id) {
					return withActivatedMove(ownedPokemon, name);
				}

				return p;
			}),
		});
		invalidate();
	};
	const deActivateMove = (move: OwnedPokemonMove) => {
		patchSaveFileReducer({
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id === ownedPokemon.id) {
					return withDeActivatedMove(ownedPokemon, move);
				}

				return p;
			}),
		});
		invalidate();
	};
	const b = battleMon?.at(0);

	return { b, deActivateMove, activateMove, reorder, currentMoves };
};
