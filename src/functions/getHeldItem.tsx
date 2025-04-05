import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const getHeldItem = (
	p: BattlePokemon | OwnedPokemon,
	considerKlutz = true
): ItemType | undefined => {
	if (!isBattlePokemon(p)) {
		return p.heldItemName;
	}
	if (p.ability === 'klutz' && considerKlutz) {
		return undefined;
	}
	return p.heldItemName;
};
