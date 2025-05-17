import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokeballType } from '../interfaces/Item';
import { PokemonType } from '../interfaces/PokemonType';
import { CatchBoosts } from '../interfaces/SaveFile';
import { calculateLevelData } from './calculateLevelData';
import { getMiddleOfThree } from './getMiddleOfThree';
import { getTimeOfDay } from './getTimeOfDay';
import { getTypeNames } from './getTypeNames';

export type BattleLocation = 'UNDERWATER' | 'CAVE' | 'STANDARD';

export const determineCaptureSuccess = (
	ball: PokeballType,
	target: BattlePokemon,
	battleRound: number,
	location: BattleLocation,
	caughtBefore: boolean,
	catchBoosts: CatchBoosts
): boolean => {
	//master ball always catches
	if (ball === 'master-ball') {
		return true;
	}
	const { level } = calculateLevelData(target.xp, target.growthRate);
	const targetTypes = getTypeNames(target);

	const catchBoostFactor =
		1 +
		Object.entries(catchBoosts).reduce((sum, [type, boost]) => {
			if (targetTypes.includes(type as PokemonType)) {
				return sum + boost;
			}
			return sum;
		}, 0) *
			0.1;

	let ballfactor = 0.5; // base: poke-ball, luxury-ball, heal-ball, cherish-ball

	if (ball === 'ultra-ball' || ball === 'safari-ball') {
		ballfactor = 1;
	}
	if (ball === 'great-ball') {
		ballfactor = 0.75;
	}

	if (
		ball === 'net-ball' &&
		(targetTypes.includes('bug') || targetTypes.includes('water'))
	) {
		ballfactor = 1;
	}
	if (ball === 'dive-ball' && location === 'UNDERWATER') {
		ballfactor = 1;
	}
	if (ball === 'nest-ball') {
		ballfactor = 0.5 + 0.016 * Math.max(0, 30 - level);
	}
	if (ball === 'repeat-ball' && caughtBefore) {
		ballfactor = 1;
	}
	//max after 10 rounds
	if (ball === 'timer-ball') {
		ballfactor = Math.max(1, 0.5 + 0.1 * battleRound);
	}
	if (ball === 'quick-ball') {
		ballfactor = Math.max(0.5, 1 - battleRound * 0.125);
	}
	//1.5 at a weight of 1000 or more
	if (ball === 'heavy-ball') {
		ballfactor = getMiddleOfThree([0.5, 1, target.data.weight / 666]);
	}
	//1.5 at a base speed of 75 or more
	if (ball === 'fast-ball') {
		ballfactor = getMiddleOfThree([
			0.5,
			1,
			(target.data.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 1) /
				50,
		]);
	}
	if (
		ball === 'dusk-ball' &&
		(location === 'CAVE' ||
			getTimeOfDay() === 'EVENING' ||
			getTimeOfDay() === 'NIGHT')
	) {
		ballfactor = 1;
	}

	//between .5 and 0, lower health, better chance
	const healthfactor =
		(1 - (target.stats.hp - target.damage) / target.stats.hp) / 2;

	//between 1 and 0, lower level, better chance
	const levelFactor = (100 - level) / 100;

	//between 1 and 0
	const captureRateFactor = target.capture_rate / 255;

	//between 0 and 4
	const catchRate =
		(ballfactor + healthfactor + levelFactor + captureRateFactor) *
		catchBoostFactor;

	//between 1 and 2.5
	const random = 1 + Math.random() * 1.5;

	return catchRate > random;
};
