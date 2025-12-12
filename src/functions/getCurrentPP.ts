import { BattlePokemon, BattleMove } from '../interfaces/BattlePokemon';

export const getCurrentPP = (pokemon: BattlePokemon, move: BattleMove) => {
	const boost = pokemon.ppBoostedMoves.find(
		(boosted) => boosted.name === move.name
	)?.stage;
	const boostfactor = () => {
		if (boost === 1) {
			return 1.2;
		}
		if (boost === 2) {
			return 1.4;
		}
		if (boost === 3) {
			return 1.6;
		}
		return 1;
	};
	return move.data.pp * boostfactor() - move.usedPP;
};
