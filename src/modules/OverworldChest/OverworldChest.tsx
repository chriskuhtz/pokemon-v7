import { useContext, useEffect, useState } from 'react';
import { ChestManager } from '../../components/ChestManager/ChestManager';
import { filterItemsByType } from '../../functions/filterItemsByType';
import { SaveFileContext } from '../../hooks/useSaveFile';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { ItemsFilterType } from '../../interfaces/ItemsFilterType';

const OverworldChestContent = ({
	chestId,
	chest,
}: {
	chestId: string;
	chest: Inventory;
}) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const [chestState, setChestState] = useState(chest);

	useEffect(() => {
		window.localStorage.setItem(chestId, JSON.stringify(chestState));
	}, [chestId, chestState]);

	const putItemInStorage = (item: ItemType) => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, { [item]: 1 }, true),
		});
		setChestState(joinInventories(chestState, { [item]: 1 }));
	};

	const putItemInBag = (item: ItemType) => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, { [item]: 1 }),
		});
		setChestState(joinInventories(chestState, { [item]: 1 }, true));
	};

	const storeEverything = () => {
		patchSaveFileReducer({
			bag: EmptyInventory,
		});
		setChestState(joinInventories(chestState, saveFile.bag));
	};
	const takeEverythingFromCategory = (category: ItemsFilterType) => {
		patchSaveFileReducer({
			bag: joinInventories(
				saveFile.bag,
				Object.fromEntries(
					Object.entries(chestState).filter(([item]) =>
						filterItemsByType(item as ItemType, category)
					)
				)
			),
		});
		setChestState(
			joinInventories(
				EmptyInventory,
				Object.fromEntries(
					Object.entries(chestState).filter(
						([item]) => !filterItemsByType(item as ItemType, category)
					)
				)
			)
		);
	};
	const takeEverything = () => {
		patchSaveFileReducer({
			bag: joinInventories(saveFile.bag, chestState),
		});
		setChestState(EmptyInventory);
	};

	return (
		<ChestManager
			chest={chestState}
			takeEverythingFromCategory={takeEverythingFromCategory}
			storeEverything={storeEverything}
			putItemInBag={putItemInBag}
			putItemInStorage={putItemInStorage}
			takeEverything={takeEverything}
			canLeaveOverloaded={false}
		/>
	);
};

export const OverworldChest = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	if (!saveFile.meta.currentChestId) {
		return (
			<button
				onClick={() =>
					patchSaveFileReducer({
						...saveFile,
						meta: { activeTab: 'OVERWORLD' },
					})
				}
			>
				No active Chest, Return to World Map
			</button>
		);
	}

	const chestData = window.localStorage.getItem(
		saveFile.meta.currentChestId ?? ''
	);
	const chest = chestData
		? (JSON.parse(chestData) as Inventory)
		: EmptyInventory;

	return (
		<OverworldChestContent
			chestId={saveFile.meta.currentChestId}
			chest={chest}
		/>
	);
};
