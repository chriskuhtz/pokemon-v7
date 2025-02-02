import { ItemType } from '../interfaces/Item';

export const getItemUrl = (item: ItemType): string =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`;
