import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonGender } from '../interfaces/OwnedPokemon';

export const arePokemonOfOppositeGenders = (
	a: PokemonGender,
	b: PokemonGender
): 'YES' | 'NO' | 'GENDERLESS' => {
	if (a === 'GENDERLESS' || b === 'GENDERLESS') {
		return 'GENDERLESS';
	}
	return a === b ? 'NO' : 'YES';
};
export const getRivalryFactor = (
	attacker: BattlePokemon,
	targetGender: PokemonGender
): number => {
	if (attacker.ability !== 'rivalry') {
		return 1;
	}
	const oppositeGenders = arePokemonOfOppositeGenders(
		attacker.gender,
		targetGender
	);

	if (oppositeGenders === 'GENDERLESS') {
		return 1;
	}
	if (oppositeGenders === 'YES') {
		return 0.75;
	}

	return 1.25;
};
