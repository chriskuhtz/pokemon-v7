import { useFetch } from '@potfisch-industries-npm/usefetch';
import { ItemType } from '../interfaces/Item';
import { ItemData } from '../interfaces/ItemData';

export const useGetItemData = (itemName: ItemType) => {
	return useFetch<ItemData>(async () =>
		(await fetch(`https://pokeapi.co/api/v2/item/${itemName}`)).json()
	);
};
