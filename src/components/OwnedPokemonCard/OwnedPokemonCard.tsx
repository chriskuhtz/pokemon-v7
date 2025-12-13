import { EvolutionReducerPayload } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { OwnedPokemonCardContent } from './components/OwnedPokemonCardContent';

export const OwnedPokemonCard = ({
	pokemon,
	giveHeldItem,
	takeHeldItem,
	inventory,
	data,
	setNickName,
	evolve,
}: {
	pokemon: OwnedPokemon;
	giveHeldItem: (newItem: ItemType) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
	data: PokemonData;
	setNickName: (id: string, newNick: string | undefined) => void;
	evolve: (x: EvolutionReducerPayload) => void;
}) => {
	return (
		<OwnedPokemonCardContent
			evolve={evolve}
			ownedPokemon={pokemon}
			data={data}
			inventory={inventory}
			takeHeldItem={takeHeldItem}
			giveHeldItem={giveHeldItem}
			setNickName={(x) => setNickName(pokemon.id, x)}
		/>
	);
};
