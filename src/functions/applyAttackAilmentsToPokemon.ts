import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getTypeNames } from './getTypeNames';
import { isKO } from './isKo';

export const applyAttackAilmentsToPokemon = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	if (isKO(pokemon)) {
		//already knocked out, no need to add ailments
		return pokemon;
	}
	if (pokemon.primaryAilment) {
		//already has an ailment
		return pokemon;
	}
	const random = Math.random();
	if (
		attack.data.meta.ailment.name === 'burn' &&
		random < attack.data.meta.ailment_chance &&
		//fire pokemon cant get burned
		!getTypeNames(pokemon.data.types).includes('fire')
	) {
		dispatchToast(`${pokemon.data.name} was burned`);
		return { ...pokemon, primaryAilment: { type: 'burn' } };
	}
	if (
		attack.data.meta.ailment.name === 'paralysis' &&
		random < attack.data.meta.ailment_chance &&
		//electric pokemon cant get paralyzed
		!getTypeNames(pokemon.data.types).includes('electric') &&
		//limber pokemon cant get paralyzed
		pokemon.ability !== 'limber'
	) {
		dispatchToast(`${pokemon.data.name} was paralyzed`);
		return { ...pokemon, primaryAilment: { type: 'paralysis' } };
	}
	if (
		attack.data.meta.ailment.name === 'freeze' &&
		random < attack.data.meta.ailment_chance &&
		//ice pokemon cant get frozen
		!getTypeNames(pokemon.data.types).includes('ice')
	) {
		dispatchToast(`${pokemon.data.name} was frozen solid`);
		return { ...pokemon, primaryAilment: { type: 'freeze' } };
	}

	return pokemon;
};
