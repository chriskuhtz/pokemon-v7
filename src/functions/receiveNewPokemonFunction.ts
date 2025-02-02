import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { SaveFile } from '../interfaces/SaveFile';

export const receiveNewPokemonFunction = (
	newMon: Omit<OwnedPokemon, 'onTeam'>,
	pokemon: SaveFile['pokemon']
): SaveFile['pokemon'] => {
	const numberOfTeamMembers = pokemon.filter((p) => p.onTeam).length;

	return [...pokemon, { ...newMon, onTeam: numberOfTeamMembers < 6 }];
};
