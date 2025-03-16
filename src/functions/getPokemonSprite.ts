import { nameToIdMap, PokemonName } from '../constants/pokemonNames';

export const getPokemonSprite = (name: PokemonName, mode?: 'back'): string => {
	const id = nameToIdMap[name];
	//if (gif) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
		mode ? `${mode}/` : ''
	}${id}.gif`;
	// }
	// if (mode === 'back') {
	// 	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
	// }
	// return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
