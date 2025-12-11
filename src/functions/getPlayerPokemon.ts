import { BattlePokemon } from '../interfaces/BattlePokemon';
import { filterPokemonByOwnerId } from './filterPokemonByOwnerId';

export const getPlayerPokemon = (
	x: BattlePokemon[],
	playerId: string
): BattlePokemon[] => {
	return filterPokemonByOwnerId(x, playerId);
};

export const isPlayerPokemon = (x: BattlePokemon, playerId: string): boolean =>
	x.ownerId === playerId;
