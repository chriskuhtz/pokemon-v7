import { useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BagLimitBar } from '../../components/BagLimitBar/BagLimitBar';
import {
	filterItemsByType,
	ItemsFilterType,
	useFilteredInventory,
} from '../../components/ItemsFilter/ItemsFilter';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { EmptyInventory, joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const StorageChest = () => {
	const { setActiveTabReducer, saveFile, patchSaveFileReducer } =
		useContext(SaveFileContext);

	const putItemInStorage = (item: ItemType) => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, { [item]: 1 }, true),
			storage: joinInventories(saveFile.storage, { [item]: 1 }),
		});
	};
	const putAllOfItemInStorage = (item: ItemType) => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, { [item]: saveFile.bag[item] }, true),
			storage: joinInventories(saveFile.storage, {
				[item]: saveFile.bag[item],
			}),
		});
	};
	const putItemInBag = (item: ItemType) => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, { [item]: 1 }),
			storage: joinInventories(saveFile.storage, { [item]: 1 }, true),
		});
	};
	const putAllOfItemInBag = (item: ItemType) => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, { [item]: saveFile.storage[item] }),
			storage: joinInventories(
				saveFile.storage,
				{ [item]: saveFile.storage[item] },
				true
			),
		});
	};
	const storeEverything = () => {
		patchSaveFileReducer({
			bag: EmptyInventory,
			storage: joinInventories(saveFile.storage, saveFile.bag),
		});
	};
	const takeEverythingFromCategory = (category: ItemsFilterType) => {
		patchSaveFileReducer({
			bag: joinInventories(
				saveFile.bag,
				Object.fromEntries(
					Object.entries(saveFile.storage).filter(([item]) =>
						filterItemsByType(item as ItemType, category)
					)
				)
			),
			storage: joinInventories(
				EmptyInventory,
				Object.fromEntries(
					Object.entries(saveFile.storage).filter(
						([item]) => !filterItemsByType(item as ItemType, category)
					)
				)
			),
		});
	};

	const {
		filteredInventory: filteredStorage,
		buttons: buttonsForStorage,
		currentFilter,
	} = useFilteredInventory(saveFile.storage);

	return (
		<Page
			goBack={() => setActiveTabReducer('OVERWORLD')}
			headline="Storage Chest:"
		>
			<BagLimitBar />

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '.5rem',
				}}
			>
				<Stack mode="column">
					<h3>Bag:</h3>
					<button onClick={storeEverything}>Store Everything</button>
					{Object.entries(saveFile.bag)
						.filter(([, amount]) => amount > 0)
						.map(([item, amount]) => (
							<Card
								actionElements={[
									<FaArrowRight
										style={{ zIndex: 1 }}
										onClick={(e) => {
											putAllOfItemInStorage(item as ItemType);
											e.stopPropagation();
										}}
									/>,
								]}
								icon={<ItemSprite item={item as ItemType} />}
								content={`	${item}(${amount})`}
								key={'bag' + item + amount}
								onClick={() => putItemInStorage(item as ItemType)}
							/>
						))}
				</Stack>
				<Stack mode="column">
					<h3>Storage:</h3>
					{buttonsForStorage}
					{Object.entries(filteredStorage).filter(([, amount]) => amount > 0)
						.length > 0 &&
						currentFilter && (
							<Card
								key={'storage' + 'take all'}
								onClick={() => takeEverythingFromCategory(currentFilter)}
								actionElements={[]}
								icon={<FaArrowLeft />}
								content={`Take all ${currentFilter}`}
							/>
						)}
					{Object.entries(filteredStorage)
						.filter(([, amount]) => amount > 0)
						.map(([item, amount]) => (
							<Card
								key={'storage' + item + amount}
								onClick={() => putItemInBag(item as ItemType)}
								actionElements={[<ItemSprite item={item as ItemType} />]}
								icon={
									<FaArrowLeft
										style={{ zIndex: 1 }}
										onClick={(e) => {
											putAllOfItemInBag(item as ItemType);
											e.stopPropagation();
										}}
									/>
								}
								content={`	${item}(${amount})`}
							/>
						))}
				</Stack>
			</div>
		</Page>
	);
};
