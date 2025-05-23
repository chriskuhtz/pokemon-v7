import { Inventory } from '../interfaces/Inventory';
import { SaveFile } from '../interfaces/SaveFile';

export const getTotalInventoryAmount = (inventory: Inventory): number => {
	return Object.values(inventory).reduce((sum, summand) => sum + summand, 0);
};
export const getBagLimit = (campUpgrades: SaveFile['campUpgrades']): number => {
	if (campUpgrades['bag size upgrade 3']) {
		return 50;
	}
	if (campUpgrades['bag size upgrade 2']) {
		return 40;
	}
	if (campUpgrades['bag size upgrade 1']) {
		return 30;
	}
	return 20;
};
export const isBagOverloaded = (s: SaveFile): boolean => {
	return getTotalInventoryAmount(s.bag) > getBagLimit(s.campUpgrades);
};
