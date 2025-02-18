import { BattlePokemon } from '../interfaces/BattlePokemon';
import { filterPokemonByOwnerId } from './filterPokemonByOwnerId';
import { getPlayerId } from './getPlayerId';

export const getPlayerPokemon = (x: BattlePokemon[]): BattlePokemon[] => {
	const playerId = getPlayerId();
	if (!playerId) {
		return [];
	}
	return filterPokemonByOwnerId(x, playerId);
};

export const isPlayerPokemon = (x: BattlePokemon): boolean =>
	x.ownerId === getPlayerId();
