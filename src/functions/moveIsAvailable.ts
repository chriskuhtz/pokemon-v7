import { PokemonData } from '../interfaces/PokemonData';

export const moveIsAvailable = (
	m: PokemonData['moves'][0],
	level: number
): boolean =>
	m.version_group_details[0].move_learn_method.name === 'level-up' &&
	m.version_group_details[0].level_learned_at <= level;
