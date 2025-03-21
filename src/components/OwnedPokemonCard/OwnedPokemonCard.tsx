import { MoveName } from '../../constants/checkLists/movesCheckList';
import { PokemonName } from '../../constants/pokemonNames';
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
	setMoves,
	setNickName,
	evolve,
}: {
	pokemon: OwnedPokemon;
	giveHeldItem: (newItem: ItemType) => void;
	setMoves: (id: string, moves: MoveName[]) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
	data: PokemonData;
	setNickName: (id: string, newNick: string | undefined) => void;
	evolve: (
		newName: PokemonName,
		consumeHeldItem: boolean,
		item?: ItemType
	) => void;
}) => {
	return (
		<div
			style={{
				padding: '1rem',

				border: '2px solid black',
				borderRadius: '1rem',
			}}
		>
			<OwnedPokemonCardContent
				evolve={evolve}
				setMoves={setMoves}
				ownedPokemon={pokemon}
				data={data}
				inventory={inventory}
				takeHeldItem={takeHeldItem}
				giveHeldItem={giveHeldItem}
				setNickName={(x) => setNickName(pokemon.id, x)}
			/>
		</div>
	);
};
