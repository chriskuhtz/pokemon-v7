import { useMemo } from 'react';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { getTimeOfDay } from '../../../functions/getTimeOfDay';
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
		newDexId: number,
		newName: string,
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
					evolve={(newDexId, newName, consumeHeldItem, item) => {
						evolve(newDexId, newName, consumeHeldItem, item);
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
		newDexId: number,
		newName: string,
		consumeHeldItem: boolean,
		item?: ItemType
	) => void;
	name: string;
	ownedPokemon: OwnedPokemon;
}) => {
	const deets = evo.evolution_details[evo.evolution_details.length - 1];
	const { min_happiness, item, min_level, time_of_day, held_item } = deets;
	const itemName = item?.name as ItemType | undefined;
	const newDexId = Number.parseInt(evo.species.url.split('/').reverse()[1]);
	const { level } = calculateLevelData(ownedPokemon.xp);

	console.log(deets);
	const checks: string[] = useMemo(() => {
		const res = [];

		if (min_level && min_level > level) {
			res.push(`Level ${min_level}`);
		}
		if (itemName && inventory[itemName] <= 0) {
			res.push(itemName);
		}
		if (min_happiness && ownedPokemon.happiness <= min_happiness) {
			res.push(`${min_happiness} Happiness`);
		}
		if (time_of_day && getTimeOfDay().toLowerCase()) {
			res.push(`${time_of_day}-time`);
		}
		if (held_item && ownedPokemon.heldItemName !== held_item) {
			res.push(`held item ${held_item}`);
		}

		return res;
	}, [
		held_item,
		inventory,
		itemName,
		level,
		min_happiness,
		min_level,
		ownedPokemon.happiness,
		ownedPokemon.heldItemName,
		time_of_day,
	]);

	return (
		<button
			disabled={checks.length > 0}
			style={{
				padding: '.5rem',
				border: '1px solid black',
				borderRadius: '1rem',
			}}
			onClick={() => evolve(newDexId, evo.species.name, !!held_item, itemName)}
		>
			{checks.length > 0
				? `${checks.join(' & ')} required for evolution`
				: `Use ${itemName} to evolve ${name}`}
		</button>
	);
};
