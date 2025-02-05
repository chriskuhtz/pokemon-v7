import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const receiveNewPokemonFunction = (
	newMon: Omit<OwnedPokemon, 'onTeam'>,
	pokemon: OwnedPokemon[]
): OwnedPokemon[] => {
	const numberOfTeamMembers = pokemon.filter((p) => p.onTeam).length;

	return [...pokemon, { ...newMon, onTeam: numberOfTeamMembers < 6 }];
};
