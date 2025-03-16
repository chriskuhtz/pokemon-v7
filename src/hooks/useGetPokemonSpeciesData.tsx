import { useFetch } from '@potfisch-industries-npm/usefetch';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';

export const useGetPokemonSpeciesData = (name: number) => {
	return useFetch<PokemonSpeciesData>(async () =>
		(await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)).json()
	);
};
