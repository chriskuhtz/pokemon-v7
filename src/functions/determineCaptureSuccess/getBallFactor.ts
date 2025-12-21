import { BattleLocation } from '../../interfaces/BattleLocation';
import { PokeballType } from '../../interfaces/Item';
import { PokemonType } from '../../interfaces/PokemonType';
import { getMiddleOfThree } from '../getMiddleOfThree';
import { getTimeOfDay } from '../getTimeOfDay';

export const getBallFactor = (
	ball: PokeballType,
	targetTypes: PokemonType[],
	battleRound: number,
	location: BattleLocation,
	caughtBefore: boolean,
	level: number,
	targetWeight: number,
	targetBaseSpeed: number
): number => {
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
		ballfactor = 1.25;
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
		ballfactor = getMiddleOfThree([0.5, 1, targetWeight / 666]);
	}
	//1.5 at a base speed of 75 or more
	if (ball === 'fast-ball') {
		ballfactor = getMiddleOfThree([0.5, 1, targetBaseSpeed / 50]);
	}
	if (
		ball === 'dusk-ball' &&
		(location === 'CAVE' ||
			getTimeOfDay() === 'EVENING' ||
			getTimeOfDay() === 'NIGHT')
	) {
		ballfactor = 1;
	}

	return ballfactor;
};
