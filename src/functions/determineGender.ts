import { PokemonGender } from '../interfaces/OwnedPokemon';

export const determineGender = (gender_rate: number): PokemonGender => {
	if (gender_rate === -1) {
		return 'GENDERLESS';
	}
	if (Math.random() < gender_rate / 8) {
		return 'FEMALE';
	}

	return 'MALE';
};
