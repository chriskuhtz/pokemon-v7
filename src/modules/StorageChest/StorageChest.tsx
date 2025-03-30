import { useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BagLimitBar } from '../../components/BagLimitBar/BagLimitBar';
import { useFilteredInventory } from '../../components/ItemsFilter/ItemsFilter';
import { battleSpriteSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
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
	const putItemInBag = (item: ItemType) => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, { [item]: 1 }),
			storage: joinInventories(saveFile.storage, { [item]: 1 }, true),
		});
	};
	const storeEverything = () => {
		patchSaveFileReducer({
			bag: EmptyInventory,
			storage: joinInventories(saveFile.storage, saveFile.bag),
		});
	};

	const { filteredInventory: filteredStorage, buttons: buttonsForStorage } =
		useFilteredInventory(saveFile.storage);

	return (
		<Page
			goBack={() => setActiveTabReducer('OVERWORLD')}
			headline="Storage Chest:"
		>
			<BagLimitBar />

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
				}}
			>
				<Stack mode="column">
					<h3>Bag:</h3>
					<button onClick={storeEverything}>Store Everything</button>
					{Object.entries(saveFile.bag)
						.filter(([, amount]) => amount > 0)
						.map(([item, amount]) => (
							<Card
								actionElements={[<FaArrowRight />]}
								icon={
									<img
										height={battleSpriteSize}
										src={getItemUrl(item as ItemType)}
									/>
								}
								content={`	${item}(${amount})`}
								key={'bag' + item + amount}
								onClick={() => putItemInStorage(item as ItemType)}
							/>
						))}
				</Stack>
				<Stack mode="column">
					<h3>Storage:</h3>
					{buttonsForStorage}
					{Object.entries(filteredStorage)
						.filter(([, amount]) => amount > 0)
						.map(([item, amount]) => (
							<Card
								key={'storage' + item + amount}
								onClick={() => putItemInBag(item as ItemType)}
								actionElements={[
									<img
										height={battleSpriteSize}
										src={getItemUrl(item as ItemType)}
									/>,
								]}
								icon={<FaArrowLeft />}
								content={`	${item}(${amount})`}
							/>
						))}
				</Stack>
			</div>
		</Page>
	);
};
