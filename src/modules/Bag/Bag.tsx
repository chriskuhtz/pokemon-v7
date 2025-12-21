import React, { useContext } from 'react';
import { FaRunning } from 'react-icons/fa';
import { MdHealing } from 'react-icons/md';
import { BagLimitBar } from '../../components/BagLimitBar/BagLimitBar';
import { ThrowAwayAction } from '../../components/ItemCard/components/ThrowAwayAction';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { ItemInfoButton } from '../../components/ItemInfoButton/ItemInfoButton';
import { useFilteredInventory } from '../../components/ItemsFilter/ItemsFilter';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { useEscapeRope } from '../../hooks/useEscapeRope';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { isKeyItem, ItemType } from '../../interfaces/Item';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Bag = ({ goBack }: { goBack: () => void }): JSX.Element => {
	const { applyEscapeRope, disabled } = useEscapeRope();
	const {
		saveFile,
		useSacredAshReducer: applySacredAsh,
		discardItemReducer: discardItem,
	} = useContext(SaveFileContext);

	const { bag: inventory } = saveFile;

	const { filteredInventory, buttons } = useFilteredInventory(inventory, true);
	return (
		<Page goBack={goBack} headline="Inventory:">
			<Stack mode="column">
				<h4>Bag Capacity:</h4>
				<BagLimitBar />
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
								<ItemInfoButton itemName={item as ItemType} />,
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
										size={battleSpriteSize}
									/>
								) : (
									<></>
								),
								item === 'escape-rope' && !disabled ? (
									<></>
								) : (
									<FaRunning
										tabIndex={0}
										role="button"
										onKeyDown={(e) => {
											e.stopPropagation();
											if (e.key === 'Enter') {
												applyEscapeRope();
											}
										}}
										onClick={() => applyEscapeRope()}
										size={battleSpriteSize}
									/>
								),
								isKeyItem(item) ? (
									<></>
								) : (
									<ThrowAwayAction
										item={item as ItemType}
										amount={amount}
										discardItem={(x: number) =>
											discardItem(item as ItemType, x)
										}
									/>
								),
							]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
