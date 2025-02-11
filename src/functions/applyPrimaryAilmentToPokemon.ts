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
		!getTypeNames(pokemon.data.types).includes('fire')
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
		!getTypeNames(pokemon.data.types).includes('electric') &&
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
		!getTypeNames(pokemon.data.types).includes('ice')
	) {
		dispatchToast(
			`${pokemon.data.name} was frozen solid ${
				toastSuffix ? 'by ' + toastSuffix : ''
			}`
		);
		return { ...pokemon, primaryAilment: { type: 'freeze' } };
	}
	return pokemon;
};
