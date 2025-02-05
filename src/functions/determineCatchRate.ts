import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokeballType } from '../interfaces/Item';
import { calculateLevelData } from './calculateLevelData';
import { isNight } from './isNight';

export const determineCatchRate = (
	ball: PokeballType,
	target: BattlePokemon,
	battleRounds: number,
	location: 'UNDERWATER' | 'CAVE' | 'STANDARD',
	caughtBefore?: boolean
	//implement capture_rate from species
) => {
	const { level } = calculateLevelData(target.xp);
	const targetTypes = target.data.types.map((t) => t.type.name);

	let ballfactor = 0.125; // base: poke-ball, luxury-ball, heal-ball, cherish-ball
	if (ball === 'master-ball') {
		ballfactor = 1;
	}
	if (ball === 'ultra-ball' || ball === 'safari-ball') {
		ballfactor = 0.5;
	}
	if (ball === 'great-ball') {
		ballfactor = 0.25;
	}

	if (
		ball === 'net-ball' &&
		(targetTypes.includes('bug') || targetTypes.includes('water'))
	) {
		ballfactor = 0.875;
	}
	if (ball === 'dive-ball' && location === 'UNDERWATER') {
		ballfactor = 0.875;
	}
	if (ball === 'nest-ball') {
		ballfactor = 0.125 + 0.025 * Math.max(0, 30 - level);
	}
	if (ball === 'repeat-ball' && caughtBefore) {
		ballfactor = 0.875;
	}
	if (ball === 'timer-ball') {
		ballfactor = 0.125 + 0.005 * battleRounds;
	}
	if (ball === 'quick-ball' && battleRounds === 1) {
		ballfactor = 0.875;
	}
	if (ball === 'dusk-ball' && (location === 'CAVE' || isNight())) {
		ballfactor = 0.875;
	}

	//lower health, better chance
	const healthPercentage =
		1 - (target.stats.hp - target.damage) / target.stats.hp;
	const healthfactor = 1 + healthPercentage;

	//lower level, better chance
	const levelFactor = (100 - level) / 100;

	const catchRate = ballfactor + healthfactor * levelFactor * ballfactor;

	return catchRate;
};
