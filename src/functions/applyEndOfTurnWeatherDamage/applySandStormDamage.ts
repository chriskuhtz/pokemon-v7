import { SANDSTORM_DAMAGE_FACTOR } from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { getHeldItem } from '../getHeldItem';
import { getTypeNames } from '../getTypeNames';

export const applySandStormDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'magic-guard') {
		addMessage(`${pokemon.name} prevents damage with magic-guard`);
		return pokemon;
	}
	if (
		getTypeNames(pokemon).some((t) =>
			['ground', 'steel', 'rock'].includes(t)
		) ||
		['sand-veil', 'overcoat', 'sand-rush', 'sand-force'].includes(
			pokemon.ability
		) ||
		getHeldItem(pokemon) === 'safety-goggles'
	) {
		return pokemon;
	}
	addMessage(`${pokemon.data.name} takes damage from the sandstorm`);
	return {
		...pokemon,
		damage:
			pokemon.damage + Math.round(pokemon.stats.hp * SANDSTORM_DAMAGE_FACTOR),
	};
};
