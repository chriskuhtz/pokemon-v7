import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';

export const changeBattlePokemonType = (
	p: BattlePokemon,
	newType: PokemonType,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	if (p.colorChangedType !== newType) {
		dispatchToast(`${p.data.name} became a ${newType} Pokemon`);
	}

	return {
		...p,
		colorChangedType: newType,
	};
};
