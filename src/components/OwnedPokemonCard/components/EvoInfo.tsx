import { useMemo } from 'react';
import { PokemonName } from '../../../constants/pokemonNames';
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
	const deets = evo.evolution_details[evo.evolution_details.length - 1];
	const { min_happiness, item, min_level, time_of_day, held_item, trigger } =
		deets;
	const itemName = item?.name as ItemType | undefined;
	const { level } = calculateLevelData(ownedPokemon.xp);

	const minLevelIncludingTrade =
		min_level ?? trigger.name === 'trade' ? 30 : null;
	const checks: string[] = useMemo(() => {
		const res = [];

		if (minLevelIncludingTrade && minLevelIncludingTrade > level) {
			res.push(`Level ${minLevelIncludingTrade}`);
		}
		if (itemName && !inventory[itemName]) {
			res.push(itemName);
		}
		if (min_happiness && ownedPokemon.happiness <= min_happiness) {
			res.push(`${min_happiness} Happiness`);
		}
		if (time_of_day && getTimeOfDay().toLowerCase() !== time_of_day) {
			res.push(`${time_of_day}-time`);
		}
		if (held_item && ownedPokemon.heldItemName !== held_item.name) {
			res.push(`held item ${held_item.name}`);
		}

		return res;
	}, [
		held_item,
		inventory,
		itemName,
		level,
		minLevelIncludingTrade,
		min_happiness,
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
