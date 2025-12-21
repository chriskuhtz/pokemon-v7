import {
	ICE_BODY_HEAL_FACTOR,
	HAIL_DAMAGE_FACTOR,
} from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { getHeldItem } from '../getHeldItem';
import { getMiddleOfThree } from '../getMiddleOfThree';
import { hasType } from '../hasType';

export const applyHailDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'magic-guard') {
		addMessage(`${pokemon.name} prevents damage with magic-guard`);
		return pokemon;
	}
	if (
		hasType(pokemon, 'ice') ||
		['snow-cloak', 'overcoat'].includes(pokemon.ability) ||
		getHeldItem(pokemon) === 'safety-goggles'
	) {
		return pokemon;
	}
	if (pokemon.ability === 'ice-body') {
		addMessage(`${pokemon.data.name} recovered hp from the hail`);
		return {
			...pokemon,
			damage: getMiddleOfThree([
				0,
				pokemon.damage - Math.round(pokemon.stats.hp * ICE_BODY_HEAL_FACTOR),
				pokemon.stats.hp,
			]),
		};
	}
	addMessage(`${pokemon.data.name} takes damage from the hail`);
	return {
		...pokemon,
		damage: pokemon.damage + Math.round(pokemon.stats.hp * HAIL_DAMAGE_FACTOR),
	};
};
