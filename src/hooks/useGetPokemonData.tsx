import { useFetch } from '@potfisch-industries-npm/usefetch';
import { PokemonData } from '../interfaces/PokemonData';

export const useGetPokemonData = (name: number) => {
	return useFetch<PokemonData>(async () =>
		(await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json()
	);
};
