import { MoveName } from '../../../constants/movesCheckList';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { isPPBoostItem, ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Chip } from '../../../uiComponents/Chip/Chip';
import { IconSolarSystem } from '../../../uiComponents/IconSolarSystem/IconSolarSystem';
import { getPokemonSprite } from '../../PokemonSprite/PokemonSprite';

export const HealablePokemon = ({
	setSelectedPokemon,
	item,
	applyItem,
	p,
}: {
	item: ItemType;
	setSelectedPokemon: (pokemon: OwnedPokemon) => void;
	applyItem: (pokemon: OwnedPokemon, item: ItemType, move?: MoveName) => void;
	p: OwnedPokemon;
}): JSX.Element => {
	return (
		<IconSolarSystem
			onClick={() => {
				if (['ether', 'max-ether'].includes(item) || isPPBoostItem(item)) {
					setSelectedPokemon(p);
				} else {
					applyItem(p, item);
				}
			}}
			key={p.id}
			firstPlanet={
				<Chip>
					<strong>{calculateLevelData(p.xp, p.growthRate).level}</strong>
				</Chip>
			}
			sun={{ url: getPokemonSprite(p.name, { shiny: p.shiny }) }}
		/>
	);
};
