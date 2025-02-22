import React from 'react';
import { MdHealing } from 'react-icons/md';
import { HealAction } from '../../components/ItemCard/components/HealAction';
import { ThrowAwayAction } from '../../components/ItemCard/components/ThrowAwayAction';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { useFilteredInventory } from '../../components/ItemsFilter/ItemsFilter';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { baseSize } from '../../constants/gameData';
import { canBenefitFromItem } from '../../functions/canBenefitFromItem';
import { Inventory } from '../../interfaces/Inventory';
import {
	EncounterChanceItem,
	isEncounterChanceItem,
	isItem,
	ItemType,
} from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { FaSprayCan } from 'react-icons/fa';

export const Bag = ({
	inventory,
	discardItem,
	goBack,
	applyItem,
	team,
	applySacredAsh,
	applyEncounterRateModifierItem,
}: {
	inventory: Inventory;
	discardItem: (item: ItemType, number: number) => void;
	goBack: () => void;
	team: OwnedPokemon[];
	applySacredAsh: () => void;
	applyEncounterRateModifierItem: (x: EncounterChanceItem) => void;
	applyItem: (pokemon: OwnedPokemon, item: ItemType, move?: MoveName) => void;
}): JSX.Element => {
	const { filteredInventory, buttons } = useFilteredInventory(inventory);
	return (
		<Page goBack={goBack} headline="Inventory:">
			<Stack mode="column">
				{buttons}
				{Object.entries(filteredInventory).map(([item, amount]) => {
					if (amount <= 0) {
						return <React.Fragment key={item}></React.Fragment>;
					}

					return (
						<ItemCard
							key={item}
							item={item as ItemType}
							amount={amount}
							actionElements={[
								<ThrowAwayAction
									amount={amount}
									discardItem={(x: number) => discardItem(item as ItemType, x)}
								/>,
								isItem(item) &&
								team.filter((t) => canBenefitFromItem(t, item)).length > 0 ? (
									<HealAction
										item={item}
										applyItem={applyItem}
										healablePokemon={team.filter((t) =>
											canBenefitFromItem(t, item)
										)}
									/>
								) : (
									<></>
								),
								item === 'sacred-ash' ? (
									<MdHealing
										tabIndex={0}
										role="button"
										onKeyDown={(e) => {
											e.stopPropagation();
											if (e.key === 'Enter') {
												applySacredAsh();
											}
										}}
										onClick={() => applySacredAsh()}
										size={baseSize / 2}
									/>
								) : (
									<></>
								),
								isEncounterChanceItem(item) ? (
									<FaSprayCan
										tabIndex={0}
										role="button"
										onKeyDown={(e) => {
											e.stopPropagation();
											if (e.key === 'Enter') {
												applyEncounterRateModifierItem(item);
											}
										}}
										onClick={() => applyEncounterRateModifierItem(item)}
										size={baseSize / 2}
									/>
								) : (
									<></>
								),
							]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
