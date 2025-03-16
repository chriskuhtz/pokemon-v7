import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonGender } from '../interfaces/OwnedPokemon';

export const getRivalryFactor = (
	attacker: BattlePokemon,
	targetGender: PokemonGender
): number => {
	if (attacker.ability !== 'rivalry') {
		return 1;
	}
	if (attacker.gender === 'GENDERLESS' || targetGender === 'GENDERLESS') {
		return 1;
	}
	if (attacker.gender !== targetGender) {
		return 0.75;
	}

	return 1.25;
};
