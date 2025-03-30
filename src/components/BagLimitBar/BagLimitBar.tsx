import { useContext, useMemo } from 'react';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { SaveFile } from '../../interfaces/SaveFile';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';

export const getTotalInventoryAmount = (inventory: Inventory): number => {
	return Object.values(inventory).reduce((sum, summand) => sum + summand, 0);
};
export const getBagLimit = (campUpgrades: SaveFile['campUpgrades']): number => {
	if (campUpgrades['bag size upgrade 3']) {
		return 60;
	}
	if (campUpgrades['bag size upgrade 2']) {
		return 50;
	}
	if (campUpgrades['bag size upgrade 1']) {
		return 40;
	}
	return 30;
};
export const isBagOverloaded = (s: SaveFile): boolean => {
	return getTotalInventoryAmount(s.bag) > getBagLimit(s.campUpgrades);
};

export const BagLimitBar = () => {
	const { saveFile } = useContext(SaveFileContext);
	const totalAmount = useMemo(
		() => getTotalInventoryAmount(saveFile.bag),
		[saveFile]
	);
	return (
		<AnimatedBar
			max={getBagLimit(saveFile.campUpgrades)}
			offset={getBagLimit(saveFile.campUpgrades) - totalAmount}
			inversedColor
			textColor="black"
		/>
	);
};
