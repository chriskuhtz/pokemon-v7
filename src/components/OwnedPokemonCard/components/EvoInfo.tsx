import { calculateLevelData } from '../../../functions/calculateLevelData';
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
	evolve: (newDexId: number, newName: string, item?: ItemType) => void;
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
					evolve={(newDexId, newName, item) => {
						evolve(newDexId, newName, item);
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
	evolve: (newDexId: number, newName: string, item?: ItemType) => void;
	name: string;
	ownedPokemon: OwnedPokemon;
}) => {
	const deets = evo.evolution_details[evo.evolution_details.length - 1];
	const { min_happiness, item, min_level } = deets;
	const itemName = item?.name as ItemType | undefined;

	const newDexId = Number.parseInt(evo.species.url.split('/').reverse()[1]);
	const { level } = calculateLevelData(ownedPokemon.xp);

	return (
		<>
			{itemName && inventory[itemName] > 0 && (
				<button
					style={{
						padding: '.5rem',
						border: '1px solid black',
						borderRadius: '1rem',
					}}
					onClick={() => evolve(newDexId, evo.species.name, itemName)}
				>
					Use {itemName} to evolve {name}
				</button>
			)}
			{itemName && inventory[itemName] <= 0 && (
				<button
					disabled
					style={{
						padding: '.5rem',
						border: '1px solid black',
						borderRadius: '1rem',
					}}
				>
					{itemName} required for evolution
				</button>
			)}
			{min_happiness && ownedPokemon.happiness >= min_happiness && (
				<button
					style={{
						padding: '.5rem',
						border: '1px solid black',
						borderRadius: '1rem',
					}}
					onClick={() => evolve(newDexId, evo.species.name)}
				>
					Evolve {name}
				</button>
			)}
			{min_happiness && ownedPokemon.happiness <= min_happiness && (
				<button
					disabled
					style={{
						padding: '.5rem',
						border: '1px solid black',
						borderRadius: '1rem',
					}}
					onClick={() => evolve(newDexId, evo.species.name)}
				>
					{min_happiness} Happiness required for evolution
				</button>
			)}
			{min_level && level >= min_level && (
				<button
					style={{
						padding: '.5rem',
						border: '1px solid black',
						borderRadius: '1rem',
					}}
					onClick={() => evolve(newDexId, evo.species.name)}
				>
					Evolve {name}
				</button>
			)}
			{min_level && level < min_level && (
				<button
					disabled
					style={{
						padding: '.5rem',
						border: '1px solid black',
						borderRadius: '1rem',
					}}
					onClick={() => evolve(newDexId, evo.species.name)}
				>
					Level {min_level} required for evolution
				</button>
			)}
		</>
	);
};
