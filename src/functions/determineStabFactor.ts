import {
	BattleAttack,
	BattlePokemon,
} from '../modules/Battle/hooks/useBattlePokemon';

export const determineStabFactor = (
	attacker: BattlePokemon,
	attack: BattleAttack
): number => {
	const attackerTypes = attacker.data.types.map((t) => t.type.name);
	if (attackerTypes.includes(attack.data.type.name)) {
		return 1.5;
	}

	return 1;
};
