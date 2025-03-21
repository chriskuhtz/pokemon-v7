import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateLevelData } from './calculateLevelData';

export const determineRunawaySuccess = (
	team: BattlePokemon[],
	opponents: BattlePokemon[]
) => {
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

	if (avgteamLevel > avgOpsLevel) {
		return true;
	}
	return (
		avgOpsLevel >= avgteamLevel &&
		Math.random() + (avgOpsLevel - avgteamLevel) * 0.05 < 0.5
	);
};
