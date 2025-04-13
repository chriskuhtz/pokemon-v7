import { MoveName } from '../constants/checkLists/movesCheckList';
import { Message } from '../hooks/useMessageQueue';
import { SecondaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';
import { getMiddleOfThree } from './getMiddleOfThree';
import { isKO } from './isKo';

export const applySecondaryAilmentToPokemon = ({
	pokemon,
	addMessage,
	ailment,
	newType,
	move,
	healAmount,
	targetId,
	by,
}: {
	pokemon: BattlePokemon;
	ailment: SecondaryAilment['type'];
	addMessage: (x: Message) => void;
	newType?: PokemonType;
	move?: MoveName;
	healAmount?: number;
	targetId?: string;
	by?: string;
}): BattlePokemon => {
	if (
		ailment !== 'color-changed' &&
		pokemon.secondaryAilments.some((s) => s.type === ailment)
	) {
		//already has this ailment
		return pokemon;
	}
	if (isKO(pokemon)) {
		//already knocked out, no need to add ailments
		return pokemon;
	}

	if (pokemon.ability === 'own-tempo' && ailment === 'confusion') {
		addMessage({
			message: `${pokemon.data.name} prevents confusion with own tempo`,
		});
		return pokemon;
	}
	if (pokemon.ability === 'oblivious' && ailment === 'infatuation') {
		addMessage({ message: `${pokemon.data.name} is oblivious` });
		return pokemon;
	}
	if (ailment === 'trap') {
		addMessage({ message: `${pokemon.data.name} became trapped` });
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
		addMessage({ message: `${pokemon.data.name} became confused` });
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
		addMessage({
			message: `${pokemon.data.name} raised its power with ${pokemon.ability}`,
		});
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
		addMessage({ message: `${pokemon.data.name} became a ${newType} pokemon` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'color-changed', duration: 9000, newType },
			],
		};
	}
	if (ailment === 'guard-spec') {
		addMessage({ message: `guard spec applied` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{ type: 'guard-spec', duration: 5 },
			],
		};
	}
	if (ailment === 'dire-hit') {
		addMessage({ message: `dire hit applied` });
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
			addMessage({ message: `${pokemon.data.name}'s ${move} was disabled` });
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
	if (ailment === 'encore') {
		if (!move) {
			throw new Error('encore has to be applied with move');
		} else {
			addMessage({ message: `${pokemon.data.name} receiced an encore` });
			return {
				...pokemon,
				secondaryAilments: [
					...pokemon.secondaryAilments,
					{
						type: 'encore',
						duration: getMiddleOfThree([4, Math.floor(Math.random() * 7), 7]),
						move,
					},
				],
			};
		}
	}
	if (ailment === 'leech-seed') {
		addMessage({ message: `${pokemon.data.name} was seeded` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'leech-seed',
					duration: 9000,
				},
			],
		};
	}
	if (ailment === 'leeching-on' && healAmount) {
		addMessage({ message: `${pokemon.data.name} leeched on` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'leeching-on',
					duration: 9000,
					healAmount,
				},
			],
		};
	}
	if (ailment === 'raging') {
		addMessage({ message: `${pokemon.data.name} is starting to rage` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'raging',
					duration: 9000,
				},
			],
		};
	}
	if (ailment === 'focused') {
		addMessage({ message: `${pokemon.data.name} tightened its focus` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'focused',
					duration: 9000,
				},
			],
		};
	}
	if (ailment === 'infatuation' && targetId) {
		addMessage({ message: `${pokemon.data.name} became infatuated` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'infatuation',
					duration: 9000,
					targetId,
				},
			],
		};
	}
	if (ailment === 'mind-read' && by) {
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'mind-read',
					duration: 2,
					targetId,
				},
			],
		};
	}
	if (ailment === 'nightmare' && pokemon.primaryAilment?.type === 'sleep') {
		addMessage({ message: `${pokemon.data.name} got nightmares` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'nightmare',
					duration: 9000,
				},
			],
		};
	}
	if (ailment === 'cursed') {
		addMessage({ message: `${pokemon.data.name} was cursed` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'cursed',
					duration: 9000,
				},
			],
		};
	}
	if (ailment === 'foresighted') {
		addMessage({ message: `${pokemon.data.name} was inspected` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'foresighted',
					duration: 9000,
				},
			],
		};
	}
	if (ailment === 'torment') {
		addMessage({
			message: `${pokemon.data.name} cant use the same move twice in a row now`,
		});
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'torment',
					duration: 9000,
				},
			],
		};
	}
	if (ailment === 'destiny-bonded' && targetId) {
		addMessage({ message: `${pokemon.data.name} is destiny bonded` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'destiny-bonded',
					duration: 1,
				},
			],
		};
	}
	if (ailment === 'perish-songed') {
		addMessage({ message: `${pokemon.data.name} heard the perish song` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'perish-songed',
					duration: 3,
				},
			],
		};
	}
	if (ailment === 'mean-looked') {
		addMessage({ message: `${pokemon.data.name} is trapped by fear` });
		return {
			...pokemon,
			secondaryAilments: [
				...pokemon.secondaryAilments,
				{
					type: 'mean-looked',
					duration: 9000,
				},
			],
		};
	}
	return pokemon;
};
