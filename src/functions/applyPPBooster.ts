import { MoveName } from '../constants/movesCheckList';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PPBoostItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

const applyBoost = (currentStage: number, item: PPBoostItemType): number => {
	if (item === 'pp-max' || currentStage >= 3) {
		return 3;
	} else return currentStage + 1;
};

export function applyPPMoveBooster<T extends BattlePokemon | OwnedPokemon>(
	pokemon: T,
	move: MoveName,
	item: PPBoostItemType
): T {
	let updatedBoostedMoves = [...pokemon.ppBoostedMoves];

	let found = false;
	updatedBoostedMoves = updatedBoostedMoves.map((u) => {
		if (u.name === move) {
			found = true;
			return { name: move, stage: applyBoost(u.stage, item) };
		}
		return u;
	});
	if (!found) {
		updatedBoostedMoves.push({ name: move, stage: applyBoost(0, item) });
	}

	return { ...pokemon, ppBoostedMoves: updatedBoostedMoves };
}
