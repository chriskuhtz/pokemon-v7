import { MoveName } from '../../constants/checkLists/movesCheckList';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getTypeNames } from '../../functions/getTypeNames';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
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
	evolve: (newDexId: number, newName: string, item?: ItemType) => void;
}) => {
	const typeNames = getTypeNames({ ...pokemon, data });

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '2fr 10fr',
				padding: '1rem',
				alignItems: 'center',
				justifyItems: 'center',
				border: '2px solid black',
				borderRadius: '1rem',
			}}
		>
			<IconSolarSystem
				sun={{ url: getPokemonSprite(pokemon.dexId) }}
				firstPlanetUrl={`/typeIcons/${typeNames[0]}.png`}
				secondPlanetUrl={
					typeNames.length > 1 ? `/typeIcons/${typeNames[1]}.png` : undefined
				}
				thirdPlanetUrl={getItemUrl(pokemon.ball)}
				fourthPlanetUrl={
					pokemon.heldItemName ? getItemUrl(pokemon.heldItemName) : undefined
				}
			/>
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
