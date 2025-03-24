import { MapId } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { Pokedex } from '../interfaces/SaveFile';

export const addPokemonToDex = (
	currentDex: Pokedex,
	name: PokemonName,
	route: MapId,
	caught?: boolean
) => {
	const updatedDex = { ...currentDex };
	if (caught && !currentDex[name].caughtOnRoutes.includes(route)) {
		updatedDex[name] = {
			seenOnRoutes: [...new Set([...updatedDex[name].seenOnRoutes, route])],
			caughtOnRoutes: [...new Set([...updatedDex[name].caughtOnRoutes, route])],
		};
	}
	if (!caught && !currentDex[name].seenOnRoutes.includes(route)) {
		updatedDex[name] = {
			...updatedDex[name],
			seenOnRoutes: [...new Set([...updatedDex[name].seenOnRoutes, route])],
		};
	}
	return updatedDex;
};
