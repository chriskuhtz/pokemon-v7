import { Nature } from '../interfaces/Natures';
import { Stat } from '../interfaces/StatObject';
import { determineNatureFactor } from './determineNatureFactor';
import { getSettings } from './getPlayerId';

export const calculateStat = (
	base: number,
	iv: number,
	ev: number,
	nature: Nature,
	level: number,
	stat: Stat,
	withoutBonus?: boolean
): number => {
	const bonus = withoutBonus ? 0 : stat === 'hp' ? level + 10 : 5;

	const settings = getSettings();

	const actualIv = settings?.minimalGrindingMode ? 0 : iv;
	const actualEv = settings?.minimalGrindingMode ? 0 : ev;

	const denominator = 100;
	const numerator = (2 * base + actualIv + actualEv / 4) * level;
	const natureFactor = determineNatureFactor(nature, stat);

	return Math.floor((numerator / denominator + bonus) * natureFactor);
};
