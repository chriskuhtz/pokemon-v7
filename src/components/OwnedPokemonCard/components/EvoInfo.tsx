import { PokemonName } from '../../../constants/pokemonNames';
import { determineEvoChecks } from '../../../functions/determineEvoChecks';
import { useGetEvolution } from '../../../hooks/useGetEvolution';
import { EvolutionChainLink } from '../../../interfaces/EvolutionChainData';
import { Inventory } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { Stack } from '../../../uiComponents/Stack/Stack';

export const EvoInfo = ({
	data,
	inventory,
	evolve,
	ownedPokemon,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	inventory: Inventory;
	evolve: (
		newName: PokemonName,
		consumeHeldItem: boolean,
		item?: ItemType
	) => void;
}) => {
	const { evos, invalidate } = useGetEvolution(data);

	if (!evos) {
		return <></>;
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
					evolve={(newName, consumeHeldItem, item) => {
						evolve(newName, consumeHeldItem, item);
						invalidate();
					}}
				/>
			))}
		</Stack>
	);
};

const EvoButton = ({
	evo,
	inventory,
	evolve,
	name,
	ownedPokemon,
}: {
	evo: EvolutionChainLink;
	inventory: Inventory;
	evolve: (
		newName: PokemonName,
		consumeHeldItem: boolean,
		item?: ItemType
	) => void;
	name: string;
	ownedPokemon: OwnedPokemon;
}) => {
	const { checks, itemName, held_item } = determineEvoChecks(
		ownedPokemon,
		inventory,
		evo
	);

	return (
		<button
			disabled={checks.length > 0}
			style={{
				padding: '.5rem',
				border: '1px solid black',
				borderRadius: '1rem',
			}}
			onClick={() => evolve(evo.species.name, !!held_item, itemName)}
		>
			{checks.length > 0
				? `${checks.join(' & ')} required for evolution`
				: itemName
				? `Use ${itemName} to evolve ${name}`
				: `evolve ${name}`}
		</button>
	);
};
