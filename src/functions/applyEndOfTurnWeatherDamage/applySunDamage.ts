import {
	DRY_SKIN_DAMAGE_FACTOR,
	SOLAR_POWER_DAMAGE_FACTOR,
} from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

export const applySunDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'dry-skin') {
		addMessage(`${pokemon.data.name}'s dry skin is damaged by the sun `);
		return {
			...pokemon,
			damage:
				pokemon.damage + Math.round(pokemon.stats.hp * DRY_SKIN_DAMAGE_FACTOR),
		};
	}
	if (pokemon.ability === 'solar-power') {
		addMessage(
			`${pokemon.data.name} is channeling solar power to increase its special attack, but its too much`
		);
		return {
			...pokemon,
			damage:
				pokemon.damage +
				Math.round(pokemon.stats.hp * SOLAR_POWER_DAMAGE_FACTOR),
		};
	}
	return pokemon;
};
