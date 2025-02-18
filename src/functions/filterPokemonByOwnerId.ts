import { BattlePokemon } from '../interfaces/BattlePokemon';

export const filterPokemonByOwnerId = (
	x: BattlePokemon[],
	ownerId: string
): BattlePokemon[] => {
	return x.filter((p) => p.ownerId === ownerId);
};
