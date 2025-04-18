import { GrowthRateName } from '../interfaces/PokemonSpeciesData';
import { getMiddleOfThree } from './getMiddleOfThree';

/**
 *
 * @param xp the current xp
 * @returns {
 * level: the pokemons level,
 *
 * xpAtNextLevel: how much xp it will have at the next level,
 *
 * progressToNextLevel: progress to next level as decimal between 0-1
 * }
 */
export const calculateLevelData = (
	xp: number,

	growthRate: GrowthRateName
): {
	level: number;
	xpAtNextLevel: number;
	progressToNextLevel: number;
	xpForThisLevel: number;
} => {
	if (!growthRate) {
		return {
			level: 1,
			progressToNextLevel: 1,
			xpAtNextLevel: 1,
			xpForThisLevel: 1,
		};
	}
	//medium growth rate: n*n*n
	const calculated = Math.floor(Math.cbrt(xp));
	//level must be between 1 and 100
	const level = getMiddleOfThree([1, calculated, 100]);

	const xpAtNextLevel = Math.pow(level + 1, 3);
	const xpForThisLevel = Math.pow(level, 3);
	const totalXpToNextLevel = xpAtNextLevel - xpForThisLevel;
	const progressToNextLevel = (xp - xpForThisLevel) / totalXpToNextLevel;

	return { level, progressToNextLevel, xpAtNextLevel, xpForThisLevel };
};
