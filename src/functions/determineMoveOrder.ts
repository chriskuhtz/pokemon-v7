import { PARA_SPEED_FACTOR } from '../interfaces/Ailment';
import { BattleAction } from '../interfaces/BattleActions';

import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateModifiedStat } from './calculateModifiedStat';

export const determineMoveOrder = (
	player: BattlePokemon,
	opponent: BattlePokemon,
	playerMove: BattleAction
): string => {
	//catching always goes first
	if (playerMove.type === 'CatchProcessInfo') {
		return player.id;
	}
	const playerSpeed =
		calculateModifiedStat(player.stats.speed, player.statBoosts.speed) *
		(player.primaryAilment?.type === 'paralysis' ? PARA_SPEED_FACTOR : 1);
	const opponentSpeed =
		calculateModifiedStat(opponent.stats.speed, opponent.statBoosts.speed) *
		(opponent.primaryAilment?.type === 'paralysis' ? PARA_SPEED_FACTOR : 1);

	if (opponentSpeed > playerSpeed) {
		return opponent.id;
	}
	if (opponentSpeed === playerSpeed && Math.random() > 0.5) {
		return opponent.id;
	}
	return player.id;
};
