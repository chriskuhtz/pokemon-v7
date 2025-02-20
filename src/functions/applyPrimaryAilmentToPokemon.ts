import { AddToastFunction } from '../hooks/useToasts';
import { PrimaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getTypeNames } from './getTypeNames';
import { isKO } from './isKo';

export const applyPrimaryAilmentToPokemon = (
	pokemon: BattlePokemon,
	ailment: PrimaryAilment['type'],
	dispatchToast: AddToastFunction,
	toastSuffix?: string
): BattlePokemon => {
	if (isKO(pokemon)) {
		//already knocked out, no need to add ailments
		return pokemon;
	}
	if (pokemon.primaryAilment) {
		//already has an ailment
		return pokemon;
	}

	if (
		ailment === 'burn' &&
		//fire pokemon cant get burned
		!getTypeNames(pokemon).includes('fire') &&
		//flash fire pokemon cant get burned
		pokemon.ability !== 'flash-fire'
	) {
		dispatchToast(
			`${pokemon.data.name} was burned ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		return { ...pokemon, primaryAilment: { type: 'burn' } };
	}
	if (
		ailment === 'paralysis' &&
		//electric pokemon cant get paralyzed
		!getTypeNames(pokemon).includes('electric') &&
		//limber pokemon cant get paralyzed
		pokemon.ability !== 'limber'
	) {
		dispatchToast(
			`${pokemon.data.name} was paralyzed ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		return { ...pokemon, primaryAilment: { type: 'paralysis' } };
	}
	if (
		ailment === 'freeze' &&
		//ice pokemon cant get frozen
		!getTypeNames(pokemon).includes('ice')
	) {
		dispatchToast(
			`${pokemon.data.name} was frozen solid ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		return { ...pokemon, primaryAilment: { type: 'freeze' } };
	}
	if (
		ailment === 'sleep' &&
		!['vital-spirit', 'insomnia'].includes(pokemon.ability)
	) {
		dispatchToast(
			`${pokemon.data.name} was put to sleep ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		return { ...pokemon, primaryAilment: { type: 'sleep' } };
	}
	if (
		(ailment === 'poison' || ailment === 'toxic') &&
		!['immunity'].includes(pokemon.ability) &&
		//poison and steel pokemon cant get poisoned
		!getTypeNames(pokemon).includes('poison') &&
		!getTypeNames(pokemon).includes('steel')
	) {
		dispatchToast(
			`${pokemon.data.name} was ${
				ailment === 'toxic' ? 'badly' : ''
			} poisoned ${toastSuffix ? 'by ' + toastSuffix : ''}`
		);
		return { ...pokemon, primaryAilment: { type: ailment } };
	}
	return pokemon;
};
