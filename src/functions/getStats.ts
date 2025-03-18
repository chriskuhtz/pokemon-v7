import { Nature } from '../interfaces/Natures';
import { StatInfo } from '../interfaces/PokemonData';
import { StatObject } from '../interfaces/StatObject';
import { calculateLevelData } from './calculateLevelData';
import { calculateStat } from './calculateStat';

export const getStats = (
	stats: StatInfo[],
	xp: number,
	nature: Nature,
	evs: StatObject
): StatObject => {
	const baseHp = stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 100;
	const baseAttack =
		stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 100;
	const baseSpatk =
		stats.find((s) => s.stat.name === 'special-attack')?.base_stat ?? 100;
	const baseSpDef =
		stats.find((s) => s.stat.name === 'special-defense')?.base_stat ?? 100;
	const baseDef =
		stats.find((s) => s.stat.name === 'special-defense')?.base_stat ?? 100;
	const baseSpeed =
		stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 100;

	const { level } = calculateLevelData(xp);

	return {
		hp: calculateStat(baseHp, 0, evs?.hp ?? 0, nature, level, 'hp'),
		attack: calculateStat(
			baseAttack,
			0,
			evs?.['attack'] ?? 0,
			nature,
			level,
			'attack'
		),
		'special-attack': calculateStat(
			baseSpatk,
			0,
			evs?.['special-attack'] ?? 0,
			nature,
			level,
			'special-attack'
		),
		'special-defense': calculateStat(
			baseSpDef,
			0,
			evs?.['special-defense'] ?? 0,
			nature,
			level,
			'special-defense'
		),
		speed: calculateStat(
			baseSpeed,
			0,
			evs?.['speed'] ?? 0,
			nature,
			level,
			'speed'
		),
		defense: calculateStat(
			baseDef,
			0,
			evs?.['defense'] ?? 0,
			nature,
			level,
			'defense'
		),
		evasion: 100,
		accuracy: 100,
	};
};
