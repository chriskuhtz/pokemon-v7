import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';

export const getTypeNames = (
	pokemon: BattlePokemon | (OwnedPokemon & { data: PokemonData })
): string[] => {
	if (isBattlePokemon(pokemon)) {
		return pokemon.colorChangedType
			? [pokemon.colorChangedType]
			: pokemon.data.types.map((t) => t.type.name);
	}
	return pokemon.data.types.map((t) => t.type.name);
};
