import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const getHatchTimeModifier = (team: OwnedPokemon[]): number => {
	return team.some((t) => t.ability === 'magma-armor') ? 2 : 1;
};
