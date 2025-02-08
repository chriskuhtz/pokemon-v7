import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokeballType } from '../interfaces/Item';
import { calculateLevelData } from './calculateLevelData';
import { isNight } from './isNight';

export const determineCaptureSuccess = (
	ball: PokeballType,
	target: BattlePokemon,
	battleRounds: number,
	location: 'UNDERWATER' | 'CAVE' | 'STANDARD',
	caughtBefore?: boolean
): boolean => {
	//master ball always catches
	if (ball === 'master-ball') {
		return true;
	}
	const { level } = calculateLevelData(target.xp);
	const targetTypes = target.data.types.map((t) => t.type.name);

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
		ballfactor = 0.125 + 0.025 * Math.max(0, 60 - level);
	}
	if (ball === 'repeat-ball' && caughtBefore) {
		ballfactor = 1;
	}
	//max after 10 rounds
	if (ball === 'timer-ball') {
		ballfactor = Math.max(1, 0.5 + 0.005 * battleRounds);
	}
	if (ball === 'quick-ball' && battleRounds === 1) {
		ballfactor = 1;
	}
	if (ball === 'dusk-ball' && (location === 'CAVE' || isNight())) {
		ballfactor = 1;
	}

	//between 1 and 0, lower health, better chance
	const healthfactor = 1 - (target.stats.hp - target.damage) / target.stats.hp;

	//between 1 and 0, lower level, better chance
	const levelFactor = (100 - level) / 100;

	//between 1 and 0
	const capture_rateFactor = target.capture_rate / 255;

	//between 0 and 4
	const catchRate =
		ballfactor + healthfactor + levelFactor + capture_rateFactor;

	//between 1 and 3
	const random = 1 + Math.random() * 2;

	console.log(
		'ballFactor',
		ballfactor,
		'healtFactor',
		healthfactor,
		'levelFactor',
		levelFactor,
		'capture_rate_factor',
		capture_rateFactor,
		'final',
		catchRate,
		'random',
		random
	);

	return catchRate > random;
};
