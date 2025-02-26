import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const isKO = (p: BattlePokemon) => {
	return p.stats.hp - p.damage <= 0;
};
export const isOwnedPokemonKO = (p: OwnedPokemon) => {
	return p.maxHp - p.damage <= 0;
};
