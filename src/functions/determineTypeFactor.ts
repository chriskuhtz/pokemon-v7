import { typeEffectivenessChart } from '../interfaces/PokemonType';
import {
	BattleAttack,
	BattlePokemon,
} from '../modules/Battle/hooks/useBattlePokemon';

export const determineTypeFactor = (
	target: BattlePokemon,
	attack: BattleAttack
): number => {
	let res = 1;
	const targetTypes = target.data.types.map((t) => t.type.name);

	targetTypes.forEach((t) => {
		const effectiveness = typeEffectivenessChart[t];

		if (effectiveness.notvery.includes(attack.data.type.name)) {
			res /= 2;
		} else if (effectiveness.superEffective.includes(attack.data.type.name)) {
			res *= 2;
		} else if (effectiveness.none.includes(attack.data.type.name)) {
			res = 0;
		}
	});
	return res;
};
