import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const getHighestXpOnTeam = (pokemon: OwnedPokemon[]): number => {
	return Math.max(...pokemon.filter((p) => p.onTeam).map((p) => p.xp));
};
