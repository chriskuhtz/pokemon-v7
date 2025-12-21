import { DRY_SKIN_DAMAGE_FACTOR } from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { getMiddleOfThree } from '../getMiddleOfThree';

export const applyRainDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'dry-skin') {
		addMessage(`${pokemon.data.name}'s dry skin recovered in the rain`);
		return {
			...pokemon,
			damage: getMiddleOfThree([
				0,
				pokemon.damage - Math.round(pokemon.stats.hp * DRY_SKIN_DAMAGE_FACTOR),
				pokemon.stats.hp,
			]),
		};
	}
	return pokemon;
};
