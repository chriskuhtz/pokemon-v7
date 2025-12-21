import { useContext } from 'react';
import { ChestManager } from '../../components/ChestManager/ChestManager';
import { filterItemsByType } from '../../functions/filterItemsByType';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { EmptyInventory, joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { ItemsFilterType } from '../../interfaces/ItemsFilterType';

export const InventoryChest = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

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
	const takeEverything = () => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, saveFile.storage),
			storage: EmptyInventory,
		});
	};

	return (
		<ChestManager
			chest={saveFile.storage}
			takeEverythingFromCategory={takeEverythingFromCategory}
			takeEverything={takeEverything}
			storeEverything={storeEverything}
			canLeaveOverloaded
			putItemInBag={putItemInBag}
			putItemInStorage={putItemInStorage}
		/>
	);
};
