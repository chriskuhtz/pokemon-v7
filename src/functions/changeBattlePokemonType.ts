import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';

export const changeBattlePokemonType = (
	p: BattlePokemon,
	newType: PokemonType,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	dispatchToast(`${p.data.name} became a ${newType} Pokemon`);
	return {
		...p,
		colorChangedType: newType,
	};
};
