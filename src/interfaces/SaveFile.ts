import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';

export interface SaveFile {
	playerId: string;
	inventory: Inventory;
	pokemon: OwnedPokemon[];
}
