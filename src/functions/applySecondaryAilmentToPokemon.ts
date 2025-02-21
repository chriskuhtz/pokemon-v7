import { MoveName } from '../constants/checkLists/movesCheckList';
import { AddToastFunction } from '../hooks/useToasts';
import { SecondaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { getMiddleOfThree } from './getMiddleOfThree';
import { isKO } from './isKo';

export const applySecondaryAilmentToPokemon = (
	pokemon: BattlePokemon,
	ailment: SecondaryAilment['type'],
	addMessage: AddToastFunction,
	newType?: PokemonType,
	move?: MoveName
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
		const duration = getMiddleOfThree([1, Math.round(Math.random() * 5), 5]);
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
	if (ailment === 'guard-spec') {
		addMessage(`guard spec applied`);
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'guard-spec', duration: 5 },
			],
		};
	}
	if (ailment === 'dire-hit') {
		addMessage(`dire hit applied`);
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'guard-spec', duration: 9000 },
			],
		};
	}
	if (ailment === 'disable') {
		if (!move) {
			throw new Error('disabled has to be applied with move');
		} else {
			addMessage(`${pokemon.data.name}'s ${move} was disabled`);
			return {
				...pokemon,
				secondaryAilments: [
					...pokemon.secondaryAilments,
					{
						type: 'disable',
						duration: getMiddleOfThree([4, Math.floor(Math.random() * 7), 7]),
						move,
					},
				],
			};
		}
	}
	return pokemon;
};
