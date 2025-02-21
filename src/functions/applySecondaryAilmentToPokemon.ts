import { AddToastFunction } from '../hooks/useToasts';
import { SecondaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { isKO } from './isKo';

export const applySecondaryAilmentToPokemon = (
	pokemon: BattlePokemon,
	ailment: SecondaryAilment['type'],
	addMessage: AddToastFunction,
	newType?: PokemonType
): BattlePokemon => {
	if (isKO(pokemon)) {
		//already knocked out, no need to add ailments
		return pokemon;
	}
	if (
		ailment !== 'color-changed' &&
		pokemon.secondaryAilments.some((s) => s.type === ailment)
	) {
		//already has this ailment
		return pokemon;
	}
	if (pokemon.ability === 'own-tempo' && ailment === 'confusion') {
		addMessage(`${pokemon.data.name} prevents confusion with own tempo`);
		return pokemon;
	}
	if (pokemon.ability === 'oblivious' && ailment === 'infatuation') {
		addMessage(`${pokemon.data.name} is oblivious`);
		return pokemon;
	}
	if (ailment === 'trap') {
		addMessage(`${pokemon.data.name} became trapped`);
		const duration = 2 + Math.round(Math.random() * 3);
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: ailment, duration },
			],
		};
	}
	if (ailment === 'confusion') {
		addMessage(`${pokemon.data.name} became confused`);
		const duration = 2 + Math.round(Math.random() * 3);
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: ailment, duration },
			],
		};
	}
	if (ailment === 'flash-fire') {
		addMessage(`${pokemon.data.name} raised its power with ${pokemon.ability}`);
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'flash-fire', duration: 9000 },
			],
		};
	}
	if (
		ailment === 'color-changed' &&
		newType &&
		pokemon.secondaryAilments.find((a) => a.type === 'color-changed')
			?.newType !== newType
	) {
		addMessage(`${pokemon.data.name} became a ${newType} pokemon`);
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'color-changed', duration: 9000, newType },
			],
		};
	}
	return pokemon;
};
