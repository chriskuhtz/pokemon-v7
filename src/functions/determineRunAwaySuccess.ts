import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateLevelData } from './calculateLevelData';

export const determineRunawaySuccess = (
	team: BattlePokemon[],
	opponents: BattlePokemon[]
) => {
	const runAwayer = team.find((t) => t.ability === 'run-away');

	const avgteamLevel =
		team.reduce(
			(sum, summand) => sum + calculateLevelData(summand.xp).level,
			0
		) / team.length;

	const avgOpsLevel =
		opponents.reduce(
			(sum, summand) => sum + calculateLevelData(summand.xp).level,
			0
		) / opponents.length;

	if (runAwayer) {
		return true;
	}
	const advantage = (avgteamLevel - avgOpsLevel) / 100;

	return Math.random() + advantage > 0.5;
};
