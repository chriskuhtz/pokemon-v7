import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { applyHappinessChange } from './applyHappinessChange';

export const applyHappinessFromWalking = (
	pokemon: OwnedPokemon,
	steps: number
): OwnedPokemon => {
	const overflow = 255;
	const total = pokemon.stepsWalked + steps;

	if (total > overflow) {
		const change = Math.floor(total / overflow) * 1;
		const rest = total % overflow;
		const withAddedFriendship = applyHappinessChange(pokemon, change);

		return { ...withAddedFriendship, stepsWalked: rest };
	}

	return { ...pokemon, stepsWalked: total };
};
