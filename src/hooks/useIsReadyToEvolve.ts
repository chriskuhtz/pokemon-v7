import { useContext } from 'react';
import { determineEvoChecks } from '../functions/determineEvoChecks';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { useGetEvolution } from './useGetEvolution';
import { SaveFileContext } from './useSaveFile';

export const useIsReadyToEvolve = (
	pokemon: OwnedPokemon,
	data?: PokemonData
) => {
	const { saveFile } = useContext(SaveFileContext);
	const { evos } = useGetEvolution(data);

	return (
		evos &&
		evos.length > 0 &&
		evos?.some(
			(evo) =>
				determineEvoChecks(pokemon, saveFile.bag, evo).checks.length === 0
		)
	);
};
