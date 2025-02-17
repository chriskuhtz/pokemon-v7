import { OPPO_ID } from '../constants/gameData';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { filterPokemonByOwnerId } from './filterPokemonByOwnerId';

export const getOpponentPokemon = (x: BattlePokemon[]): BattlePokemon[] => {
	return filterPokemonByOwnerId(x, OPPO_ID);
};
