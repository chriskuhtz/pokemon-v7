import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { typeEffectivenessChart } from '../interfaces/PokemonType';
import { getTypeNames } from './getTypeNames';

export const determineTypeFactor = (
	target: BattlePokemon,
	attack: BattleAttack,
	addMessage?: (x: string) => void
): number => {
	let res = 1;
	const targetTypes = getTypeNames(target);

	const effectiveness = typeEffectivenessChart[attack.data.type.name];

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
			addMessage(`${target.data.name} prevents damage with levitate`);
		}
		res = 0;
	}

	if (target.ability === 'wonder-guard' && res <= 1) {
		if (addMessage) {
			addMessage(`${target.data.name} prevents damage with wonder guard`);
		}
		return 0;
	}

	if (res === 0) {
		if (addMessage) {
			addMessage('It has no effect');
		}
		return 0;
	}
	if (res > 1 && addMessage) {
		addMessage('It is very effective');
	}
	if (res < 1 && addMessage) {
		addMessage('It is not very effective');
	}
	return res;
};
