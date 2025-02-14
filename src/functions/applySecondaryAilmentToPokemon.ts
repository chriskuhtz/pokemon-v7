import { AddToastFunction } from '../hooks/useToasts';
import { SecondaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isKO } from './isKo';

export const applySecondaryAilmentToPokemon = (
	pokemon: BattlePokemon,
	ailment: SecondaryAilment['type'],
	dispatchToast: AddToastFunction
): BattlePokemon => {
	if (isKO(pokemon)) {
		//already knocked out, no need to add ailments
		return pokemon;
	}
	if (pokemon.secondaryAilments.some((s) => s.type === ailment)) {
		//already has this ailment
		return pokemon;
	}
	if (pokemon.ability === 'oblivious' && ailment === 'infatuation') {
		dispatchToast(`${pokemon.data.name} is oblivious`);
		return pokemon;
	}
	if (ailment === 'trap') {
		dispatchToast(`${pokemon.data.name} became trapped`);
		const duration = 1 + Math.round(Math.random() * 4);
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'trap', duration },
			],
		};
	}
	return pokemon;
};
