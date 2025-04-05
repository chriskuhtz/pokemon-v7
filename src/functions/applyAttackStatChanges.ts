import { AbilityName } from '../constants/checkLists/abilityCheckList';
import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getTypeNames } from './getTypeNames';

export const applyAttackStatChanges = (
	target: BattlePokemon,
	attackerAbility: AbilityName,
	attack: BattleAttack,
	addMessage: (x: Message) => void,
	selfInflicted: boolean,
	battleFieldEffects: BattleFieldEffect[]
): BattlePokemon => {
	let updatedMon = { ...target };

	if (attack.name === 'curse') {
		if (getTypeNames(updatedMon).includes('ghost')) {
			return updatedMon;
		} else {
			[
				{ stat: { name: 'attack' as Stat }, change: 1 },
				{ stat: { name: 'defense' as Stat }, change: 1 },
				{ stat: { name: 'speed' as Stat }, change: -1 },
			].forEach((s) => {
				updatedMon = applyStatChangeToPokemon(
					updatedMon,
					s.stat.name,
					s.change,
					selfInflicted,
					battleFieldEffects,
					addMessage
				);
			});
		}
	}

	attack.data.stat_changes.forEach((s) => {
		if (
			attackerAbility === 'sheer-force' &&
			((selfInflicted && s.change > 0) || (!selfInflicted && s.change < 0))
		) {
			//sheer force prevents positive side effects
			return updatedMon;
		}

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
