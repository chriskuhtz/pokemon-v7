import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getTypeNames } from './getTypeNames';

export const applyAttackStatChanges = (
	pokemon: BattlePokemon,
	attack: BattleAttack,
	addMessage: (x: Message) => void,
	selfInflicted: boolean,
	battleFieldEffects: BattleFieldEffect[]
): BattlePokemon => {
	let updatedMon = { ...pokemon };

	if (attack.name === 'curse' && getTypeNames(pokemon).includes('ghost')) {
		return updatedMon;
	}

	attack.data.stat_changes.forEach((s) => {
		updatedMon = applyStatChangeToPokemon(
			updatedMon,
			s.stat.name,
			s.change,
			selfInflicted,
			battleFieldEffects,
			addMessage
		);
	});

	return updatedMon;
};
