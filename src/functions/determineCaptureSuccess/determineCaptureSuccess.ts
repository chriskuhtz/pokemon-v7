import { BattleLocation } from '../../interfaces/BattleLocation';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { PokeballType } from '../../interfaces/Item';
import { PokemonType } from '../../interfaces/PokemonType';
import { CatchBoosts } from '../../interfaces/SaveFile';
import { calculateLevelData } from '../calculateLevelData';
import { getTypeNames } from '../getTypeNames';
import { getBallFactor } from './getBallFactor';

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

	//between 1 and 0, lower health, better chance
	const healthfactor = 1 - (target.stats.hp - target.damage) / target.stats.hp;

	//between .5 and 0, lower level, better chance
	let levelFactor = (100 - level) / 200;
	//low level pokemon are full health most of the time and the player only has access to poke balls at the start
	if (level < 10) {
		levelFactor *= 2;
	}

	//between 1 and 0
	const captureRateFactor = target.capture_rate / 255;

	const ballfactor = getBallFactor(
		ball,
		targetTypes,
		battleRound,
		location,
		caughtBefore,
		level,
		target.data.weight,
		target.data.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 1
	);
	//between 0 and 4
	const catchRate =
		(ballfactor + healthfactor + levelFactor + captureRateFactor) *
		catchBoostFactor;

	//between 1 and 2.5
	const random = 1 + Math.random() * 1.5;

	return catchRate > random;
};
