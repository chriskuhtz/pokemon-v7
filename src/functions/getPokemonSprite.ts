import { nameToIdMap, PokemonName } from '../constants/pokemonNames';

export const getPokemonSprite = (name: PokemonName, mode?: 'back'): string =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
		mode ? `${mode}/` : ''
	}${nameToIdMap[name]}.gif`;
