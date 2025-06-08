import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleFieldEffect } from '../modules/Battle/BattleField';

export const hasBattleFieldEffect = (
	mon: BattlePokemon,
	effect: BattleFieldEffect['type'],
	activeEffects: BattleFieldEffect[]
) => {
	return activeEffects.some(
		(a) => a.ownerId === mon.ownerId && a.type === effect
	);
};
