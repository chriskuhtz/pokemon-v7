import { useMemo } from 'react';
import { determineEvoChecks } from '../../../functions/determineEvoChecks';
import { isTimeOfDay, TimeOfDay } from '../../../functions/getTimeOfDay';
import { keepAlternateFormThroughEvolution } from '../../../functions/handleAlternateForms';
import { useGetEvolution } from '../../../hooks/useGetEvolution';
import { EvolutionReducerPayload } from '../../../hooks/useSaveFile';
import { EvolutionChainLink } from '../../../interfaces/EvolutionChainData';
import { Inventory } from '../../../interfaces/Inventory';
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
	evolve: (x: EvolutionReducerPayload) => void;
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
					evolve={(payload) => {
						evolve(payload);
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
	evolve: (x: EvolutionReducerPayload) => void;
	name: string;
	ownedPokemon: OwnedPokemon;
}) => {
	const { checks, itemName, held_item, deets } = determineEvoChecks(
		ownedPokemon,
		inventory,
		evo
	);

	const evoRequirement =
		useMemo((): EvolutionReducerPayload['evoRequirement'] => {
			if (deets.min_happiness || deets.min_affection || deets.min_beauty) {
				return 'FRIENDSHIP';
			}
			if (held_item) {
				return 'HELD_ITEM';
			}
			if (itemName) {
				return 'ITEM';
			}

			return 'LEVEL_UP';
		}, [deets, held_item, itemName]);

	const timeOfDayRequirement: TimeOfDay | undefined = useMemo(() => {
		if (isTimeOfDay(deets.time_of_day)) {
			return deets.time_of_day;
		}
	}, [deets.time_of_day]);
	return (
		<button
			disabled={checks.length > 0}
			style={{
				padding: '.5rem',
				border: '1px solid black',
				borderRadius: '1rem',
			}}
			onClick={() =>
				evolve({
					name: ownedPokemon.name,
					id: ownedPokemon.id,
					newName: keepAlternateFormThroughEvolution({
						newName: evo.species.name,
						currentName: ownedPokemon.name,
					}).newName,
					consumeHeldItem: !!held_item,
					consumedItem: itemName,
					evoRequirement,
					timeOfDayRequirement,
				})
			}
		>
			{checks.length > 0
				? `${checks.join(' & ')} required for evolution`
				: itemName
				? `Use ${itemName} to evolve ${name}`
				: `evolve ${name}`}
		</button>
	);
};
