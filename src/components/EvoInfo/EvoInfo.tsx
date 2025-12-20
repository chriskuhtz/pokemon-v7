import { useGetEvolution } from '../../hooks/useGetEvolution';
import { EvolutionReducerPayload } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { Stack } from '../../uiComponents/Stack/Stack';
import { EvoButton } from './components/EvoButton';

export const EvoInfo = ({
	data,
	inventory,
	evolve,
	ownedPokemon,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	inventory: Inventory;
	evolve: (x: EvolutionReducerPayload) => void;
}) => {
	const { evos, invalidate } = useGetEvolution(data);

	if (!evos) {
		return <button disabled>This Pokemon is fully evolved</button>;
	}

	return (
		<Stack mode="column">
			{evos.map((evo, i) => (
				<EvoButton
					ownedPokemon={ownedPokemon}
					key={data.name + i}
					name={data.name}
					evo={evo}
					inventory={inventory}
					evolve={(payload) => {
						evolve(payload);
						invalidate();
					}}
				/>
			))}
		</Stack>
	);
};
