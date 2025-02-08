import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateModifiedStat } from './calculateModifiedStat';

export const determineMoveOrder = (
	player: BattlePokemon,
	opponent: BattlePokemon
): string => {
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
