import { StatInfo } from '../interfaces/PokemonData';
import { StatObject } from '../interfaces/StatObject';

export const getEvAwards = (stats: StatInfo[]): StatObject => {
	const baseHp = stats.find((s) => s.stat.name === 'hp')?.effort ?? 0;
	const baseAttack = stats.find((s) => s.stat.name === 'attack')?.effort ?? 0;
	const baseSpatk =
		stats.find((s) => s.stat.name === 'special-attack')?.effort ?? 0;
	const baseSpDef =
		stats.find((s) => s.stat.name === 'special-defense')?.effort ?? 0;
	const baseDef =
		stats.find((s) => s.stat.name === 'special-defense')?.effort ?? 0;
	const baseSpeed = stats.find((s) => s.stat.name === 'speed')?.effort ?? 0;

	return {
		hp: baseHp,
		attack: baseAttack,
		'special-attack': baseSpatk,
		'special-defense': baseSpDef,
		speed: baseSpeed,
		defense: baseDef,
		evasion: 0,
		accuracy: 0,
	};
};
