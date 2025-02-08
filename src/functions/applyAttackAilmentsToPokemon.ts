import { AddToastFunction } from '../hooks/useToasts';
import { BattleAttack } from '../interfaces/BattleAttack';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isKO } from './isKo';

export const applyAttackAilmentsToPokemon = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	if (isKO(pokemon)) {
		//already knocked out, no need to add ailments
		return pokemon;
	}
	if (pokemon.primaryAilment) {
		//already has an ailment
		return pokemon;
	}
	const random = Math.random();
	if (
		attack.data.meta.ailment.name === 'burn' &&
		random < attack.data.meta.ailment_chance
	) {
		dispatchToast(`${pokemon.data.name} was burned`);
		return { ...pokemon, primaryAilment: { type: 'burn' } };
	}

	return pokemon;
};
