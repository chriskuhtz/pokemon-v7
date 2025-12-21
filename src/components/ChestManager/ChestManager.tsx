import { useContext, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import {
	getBagLimit,
	getTotalInventoryAmount,
} from '../../functions/getBagLimit';
import { GameDataContext } from '../../hooks/useGameData';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { ItemsFilterType } from '../../interfaces/ItemsFilterType';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { BagLimitBar } from '../BagLimitBar/BagLimitBar';
import { ItemInfoButton } from '../ItemInfoButton/ItemInfoButton';
import { useFilteredInventory } from '../ItemsFilter/ItemsFilter';
import { ItemSprite } from '../ItemSprite/ItemSprite';

export const ChestManager = ({
	chest,
	takeEverythingFromCategory,
	storeEverything,
	putItemInBag,
	putItemInStorage,
	takeEverything,
	canLeaveOverloaded,
}: {
	chest: Inventory;
	takeEverythingFromCategory: (category: ItemsFilterType) => void;
	storeEverything: () => void;
	takeEverything: () => void;
	putItemInBag: (item: ItemType) => void;
	putItemInStorage: (item: ItemType) => void;
	canLeaveOverloaded: boolean;
}) => {
	const [search, setSearch] = useState<string>('');
	const { setActiveTabReducer, saveFile } = useContext(SaveFileContext);
	const gameData = useContext(GameDataContext);

	const {
		filteredInventory: filteredStorage,
		buttons: buttonsForStorage,
		currentFilter,
	} = useFilteredInventory(chest, true);

	const totalAmount = useMemo(
		() => getTotalInventoryAmount(saveFile.bag),
		[saveFile]
	);

	const isOverloaded = getBagLimit(saveFile, gameData) - totalAmount < 0;

	return (
		<Page
			goBack={
				isOverloaded && !canLeaveOverloaded
					? undefined
					: () => {
							setActiveTabReducer('OVERWORLD');
					  }
			}
			headline="Storage Chest:"
		>
			<Stack mode="row" justifyContent="center">
				<FaSearch size={battleSpriteSize} />{' '}
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
				/>
				{!search && buttonsForStorage}
				<BagLimitBar />
				{isOverloaded && !canLeaveOverloaded && (
					<h3>You cant carry all of this, leave some items in the chest</h3>
				)}
			</Stack>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '1rem',
				}}
			>
				<Stack mode="column">
					<h3>Bag:</h3>
					<button onClick={storeEverything}>Store Everything</button>
					{Object.entries(saveFile.bag)
						.filter(([key, amount]) => amount > 0 && key.includes(search))
						.map(([item, amount]) => (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
								key={'bag' + item + amount}
							>
								<ItemSprite
									item={item as ItemType}
									onClick={() => putItemInStorage(item as ItemType)}
								/>
								<strong
									onClick={() => putItemInStorage(item as ItemType)}
								>{`	${item}(${amount})`}</strong>
								<ItemInfoButton itemName={item as ItemType} />
							</div>
						))}
				</Stack>
				<Stack mode="column">
					<h3>Chest:</h3>

					{
						<button
							onClick={() => {
								if (currentFilter) {
									takeEverythingFromCategory(currentFilter);
								} else takeEverything();
							}}
						>
							{currentFilter ? `Take all ${currentFilter}` : 'Take Everything'}
						</button>
					}
					{Object.entries(filteredStorage)
						.filter(([key, amount]) => amount > 0 && key.includes(search))
						.map(([item, amount]) => (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
								key={'storage' + item + amount}
							>
								<ItemSprite
									item={item as ItemType}
									onClick={() => putItemInBag(item as ItemType)}
								/>
								<strong
									onClick={() => putItemInBag(item as ItemType)}
								>{`	${item}(${amount})`}</strong>
								<ItemInfoButton itemName={item as ItemType} />
							</div>
						))}
				</Stack>
			</div>
		</Page>
	);
};
