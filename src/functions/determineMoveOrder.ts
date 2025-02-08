import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleAction } from '../modules/Battle/hooks/UseBattleSteps/useBattleSteps';
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
	const playerSpeed = calculateModifiedStat(
		player.stats.speed,
		player.statBoosts.speed
	);
	const opponentSpeed = calculateModifiedStat(
		opponent.stats.speed,
		opponent.statBoosts.speed
	);

	if (opponentSpeed > playerSpeed) {
		return opponent.id;
	}
	if (opponentSpeed === playerSpeed && Math.random() > 0.5) {
		return opponent.id;
	}
	return player.id;
};
