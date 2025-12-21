import { pokemonNames } from '../constants/pokemonNames';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const alternateFormOffset = (ownedPokemon: OwnedPokemon) => {
	let res = 1;
	if (pokemonNames.some((pn) => pn === ownedPokemon.name + '-alola')) {
		res += 1;
	}
	if (pokemonNames.some((pn) => pn === ownedPokemon.name + '-galar')) {
		res += 1;
	}
	if (pokemonNames.some((pn) => pn === ownedPokemon.name + '-hisui')) {
		res += 1;
	}
	if (pokemonNames.some((pn) => pn === ownedPokemon.name + '-paldea')) {
		res += 1;
	}
	return res;
};
