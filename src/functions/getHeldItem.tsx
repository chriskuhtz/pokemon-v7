import { BattlePokemon } from '../interfaces/BattlePokemon';
import { ItemType } from '../interfaces/Item';

export const getHeldItemInBattle = (p: BattlePokemon): ItemType | undefined => {
	if (p.ability === 'klutz') {
		return undefined;
	}
	return p.heldItemName;
};
