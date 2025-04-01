import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { typeEffectivenessChart } from '../interfaces/PokemonType';
import { getTypeNames } from './getTypeNames';

export const determineTypeFactor = (
	target: BattlePokemon,
	attack: BattleAttack,
	normalized?: boolean,
	addMessage?: (x: Message) => void
): number => {
	let res = 1;
	const targetTypes = getTypeNames(target);

	const effectiveness =
		typeEffectivenessChart[normalized ? 'normal' : attack.data.type.name];

	targetTypes.forEach((t) => {
		if (effectiveness.isNotVeryEffectiveAgainst.includes(t)) {
			res /= 2;
		} else if (effectiveness.isSuperEffectiveAgainst.includes(t)) {
			res *= 2;
		} else if (effectiveness.doesntEffect.includes(t)) {
			res = 0;
		}
	});

	if (target.ability === 'levitate' && attack.data.type.name === 'ground') {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with levitate`,
			});
		}
		res = 0;
	}

	if (target.ability === 'wonder-guard' && res <= 1) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with wonder guard`,
			});
		}
		return 0;
	}
	if (
		target.ability === 'lightning-rod' &&
		attack.data.type.name === 'electric'
	) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with lightning rod`,
			});
		}
		return 0;
	}

	if (res === 0) {
		if (addMessage) {
			addMessage({ message: 'It has no effect' });
		}
		return 0;
	}
	if (res > 1 && addMessage) {
		addMessage({ message: 'It is very effective' });
	}
	if (res < 1 && addMessage) {
		addMessage({ message: 'It is not very effective' });
	}
	return res;
};
