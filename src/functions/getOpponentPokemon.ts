import { BattlePokemon } from '../interfaces/BattlePokemon';
import { filterPokemonByOwnerId } from './filterPokemonByOwnerId';
import { OPPO_ID } from './makeChallengerPokemon';

export const getOpponentPokemon = (x: BattlePokemon[]): BattlePokemon[] => {
	return filterPokemonByOwnerId(x, OPPO_ID);
};
