import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokeballType } from '../interfaces/Item';
import { calculateLevelData } from './calculateLevelData';
import { isEvening, isNight } from './getTimeOfDay';
import { getTypeNames } from './getTypeNames';

export type BattleLocation = 'UNDERWATER' | 'CAVE' | 'STANDARD';

export const determineCaptureSuccess = (
	ball: PokeballType,
	target: BattlePokemon,
	battleRound: number,
	location: BattleLocation
): boolean => {
	//master ball always catches
	if (ball === 'master-ball') {
		return true;
	}
	const { level } = calculateLevelData(target.xp);
	const targetTypes = getTypeNames(target);

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
		ballfactor = 1.5;
	}
	if (ball === 'dive-ball' && location === 'UNDERWATER') {
		ballfactor = 1.5;
	}
	if (ball === 'nest-ball') {
		ballfactor = 0.5 + 0.033 * Math.max(0, 30 - level);
	}
	if (ball === 'repeat-ball' && target.caughtBefore) {
		ballfactor = 1.5;
	}
	//max after 10 rounds
	if (ball === 'timer-ball') {
		ballfactor = Math.max(1.5, 0.5 + 0.1 * battleRound);
	}
	if (ball === 'quick-ball' && battleRound === 1) {
		ballfactor = 1.5;
	}
	if (
		ball === 'dusk-ball' &&
		(location === 'CAVE' || isNight() || isEvening())
	) {
		ballfactor = 1.5;
	}

	//between .5 and 0, lower health, better chance
	const healthfactor =
		(1 - (target.stats.hp - target.damage) / target.stats.hp) / 2;

	//between 1 and 0, lower level, better chance
	const levelFactor = (100 - level) / 100;

	//between 1 and 0
	const captureRateFactor = target.capture_rate / 255;

	//between 0 and 4
	const catchRate = ballfactor + healthfactor + levelFactor + captureRateFactor;

	//between 1 and 2.5
	const random = 1 + Math.random() * 1.5;

	return catchRate > random;
};
