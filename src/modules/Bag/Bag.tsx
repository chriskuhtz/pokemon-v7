import React from 'react';
import { MdHealing } from 'react-icons/md';
import { HealAction } from '../../components/ItemCard/components/HealAction';
import { ThrowAwayAction } from '../../components/ItemCard/components/ThrowAwayAction';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { baseSize } from '../../constants/gameData';
import { canBenefitFromItem } from '../../functions/canBenefitFromItem';
import { Inventory } from '../../interfaces/Inventory';
import {
	EvBoostItemType,
	HealingItemType,
	isEvBoostItem,
	isHealingItem,
	isPPRestorationItem,
	ItemType,
	PPRestoringItemType,
} from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Bag = ({
	inventory,
	discardItem,
	goBack,
	applyItem,
	team,
	applySacredAsh,
}: {
	inventory: Inventory;
	discardItem: (item: ItemType, number: number) => void;
	goBack: () => void;
	team: OwnedPokemon[];
	applySacredAsh: () => void;
	applyItem: (
		pokemon: OwnedPokemon,
		item: HealingItemType | PPRestoringItemType | EvBoostItemType,
		move?: MoveName
	) => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Inventory:">
			<Stack mode="column">
				{Object.entries(inventory).map(([item, amount]) => {
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
								(isHealingItem(item) ||
									isPPRestorationItem(item) ||
									isEvBoostItem(item)) &&
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
							]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
