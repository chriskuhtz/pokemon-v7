import { useContext } from 'react';
import { BagLimitBar } from '../../components/BagLimitBar/BagLimitBar';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
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
					{Object.entries(saveFile.bag)
						.filter(([, amount]) => amount > 0)
						.map(([item, amount]) => (
							<button
								key={'bag' + item + amount}
								onClick={() => putItemInStorage(item as ItemType)}
							>
								{item}({amount})
							</button>
						))}
				</Stack>
				<Stack mode="column">
					<h3>Storage:</h3>
					{Object.entries(saveFile.storage)
						.filter(([, amount]) => amount > 0)
						.map(([item, amount]) => (
							<button
								key={'storage' + item + amount}
								onClick={() => putItemInBag(item as ItemType)}
							>
								{item}({amount})
							</button>
						))}
				</Stack>
			</div>
		</Page>
	);
};
