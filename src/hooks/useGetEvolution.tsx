import { useFetch } from '@potfisch-industries-npm/usefetch';
import { useEffect, useMemo, useState } from 'react';
import { deAlternate } from '../functions/handleAlternateForms';
import {
	EvolutionChainData,
	EvolutionChainLink,
} from '../interfaces/EvolutionChainData';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';

export const getSpeciesForPokemon = async (
	data: PokemonData
): Promise<PokemonSpeciesData | undefined> => {
	const speciesRequest = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${deAlternate(data.name)}`
	);

	if (speciesRequest.status === 200) {
		const data = speciesRequest.json();
		return data;
	}
};

export const getEvoChainForPokemon = async (data: PokemonData) => {
	const speciesData = await getSpeciesForPokemon(data);

	if (speciesData) {
		const evoChainRequest = await fetch(speciesData.evolution_chain.url);

		if (evoChainRequest.status === 200) {
			const data = evoChainRequest.json();

			return data;
		}
	}
};

export const useGetEvolution = (
	data: PokemonData
): { evos: EvolutionChainLink[] | undefined; invalidate: () => void } => {
	const { status, res, invalidate } = useFetch<EvolutionChainData>(() =>
		getEvoChainForPokemon(data)
	);
	const [flattenedChain, setFlattenedChain] = useState<EvolutionChainLink[]>(
		[]
	);

	useEffect(() => {
		if (res) {
			setFlattenedChain([res.chain]);
			if (res.chain.evolves_to) {
				const currentLinks = res.chain.evolves_to;
				setFlattenedChain((flattenedChain) => [
					...flattenedChain,
					...res.chain.evolves_to,
				]);
				currentLinks.forEach((link) => {
					setFlattenedChain((flattenedChain) => [
						...flattenedChain,
						...link.evolves_to,
					]);
				});
			}
		}
	}, [status, res, setFlattenedChain]);

	const evos = useMemo(() => {
		const correctLink = flattenedChain.find(
			(link) =>
				link.species.name === deAlternate(data.name) &&
				link.evolves_to.length > 0
		);

		if (!correctLink || correctLink.evolves_to.length === 0) {
			return;
		}

		return correctLink.evolves_to;
	}, [data.name, flattenedChain]);

	const exceptionCheckedEvos = evos?.map((e) => {
		//@ts-expect-error this is an error in the api
		if (e.species.name === 'oinkologne') {
			return { ...e, species: { ...e.species, name: 'oinkologne-male' } };
		}
		return e;
	});
	//@ts-expect-error this is an error in the api
	return { evos: exceptionCheckedEvos, invalidate };
};
