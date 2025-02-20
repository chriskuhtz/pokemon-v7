import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { baseSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getTypeNames } from '../../functions/getTypeNames';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import { OwnedPokemonCardContent } from './components/OwnedPokemonCardContent';

export const OwnedPokemonCard = ({
	pokemon,
	reorder,
	giveHeldItem,
	takeHeldItem,
	inventory,
}: {
	pokemon: OwnedPokemon;
	reorder: (x: 'UP' | 'DOWN') => void;
	giveHeldItem: (newItem: ItemType) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
}) => {
	const { res } = useGetPokemonData(pokemon.dexId);

	if (!res) {
		return <LoadingScreen />;
	}

	const typeNames = getTypeNames({ ...pokemon, data: res });

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
				<div>
					{pokemon.heldItemName && (
						<button onClick={takeHeldItem}>Take Item</button>
					)}
					<OwnedPokemonCardContent ownedPokemon={pokemon} data={res} />
				</div>
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
