import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonType } from '../interfaces/PokemonType';

export const getTypeNames = (
	pokemon: BattlePokemon | (OwnedPokemon & { data: PokemonData })
): PokemonType[] => {
	if (isBattlePokemon(pokemon)) {
		return pokemon.colorChangedType
			? [pokemon.colorChangedType]
			: pokemon.data.types.map((t) => t.type.name);
	}
	return pokemon.data.types.map((t) => t.type.name);
};
