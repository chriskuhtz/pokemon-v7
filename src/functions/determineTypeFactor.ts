import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { typeEffectivenessChart } from '../interfaces/PokemonType';
import { getTypeNames } from './getTypeNames';

export const determineTypeFactor = (
	target: BattlePokemon,
	attack: BattleAttack
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
	return res;
};
