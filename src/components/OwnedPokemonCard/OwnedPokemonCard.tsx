import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { baseSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getTypeNames } from '../../functions/getTypeNames';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { Card } from '../../uiComponents/Card/Card';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { OwnedPokemonCardContent } from './components/OwnedPokemonCardContent';

export const OwnedPokemonCard = ({
	pokemon,
	reorder,
	giveHeldItem,
	takeHeldItem,
	inventory,
	data,
	setMoves,
}: {
	pokemon: OwnedPokemon;
	reorder: (x: 'UP' | 'DOWN') => void;
	giveHeldItem: (newItem: ItemType) => void;
	setMoves: (id: string, moves: MoveName[]) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
	data: PokemonData;
}) => {
	const typeNames = getTypeNames({ ...pokemon, data });

	return (
		<Card
			key={pokemon.id}
			icon={
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
			}
			content={
				<OwnedPokemonCardContent
					setMoves={setMoves}
					ownedPokemon={pokemon}
					data={data}
					inventory={inventory}
					takeHeldItem={takeHeldItem}
					giveHeldItem={giveHeldItem}
				/>
			}
			actionElements={[
				<FaArrowUp
					onClick={() => reorder('UP')}
					size={baseSize / 3}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === 'Enter') {
							reorder('UP');
						}
					}}
				/>,
				<FaArrowDown
					onClick={() => reorder('DOWN')}
					size={baseSize / 3}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === 'Enter') {
							reorder('DOWN');
						}
					}}
				/>,
			]}
		/>
	);
};
