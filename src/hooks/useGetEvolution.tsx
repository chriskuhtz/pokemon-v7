import { useFetch } from '@potfisch-industries-npm/usefetch';
import { useEffect, useMemo, useState } from 'react';
import {
	EvolutionChainData,
	EvolutionChainLink,
} from '../interfaces/EvolutionChainData';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';

export const getSpeciesForPokemon = async (
	data: PokemonData
): Promise<PokemonSpeciesData | undefined> => {
	const speciesRequest = await fetch(data.species.url);

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
): { evo: EvolutionChainLink | undefined; invalidate: () => void } => {
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

	const evo = useMemo(() => {
		const correctLink = flattenedChain.find(
			(link) => link.species.name === data.name && link.evolves_to.length > 0
		);

		if (!correctLink || correctLink.evolves_to.length === 0) {
			return;
		}

		return correctLink.evolves_to[0];
	}, [data.name, flattenedChain]);

	return { evo, invalidate };
};
