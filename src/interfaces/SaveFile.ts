import { RoutesType } from '../App';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';

export interface SaveFile {
	playerId: string;
	inventory: Inventory;
	pokemon: OwnedPokemon[];
	money: number;
	meta: {
		activeTab: RoutesType;
	};
}
