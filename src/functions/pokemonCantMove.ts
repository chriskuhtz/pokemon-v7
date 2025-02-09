import { PARA_CHANCE } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const pokemonCantMove = (pokemon: BattlePokemon): boolean => {
	return (
		pokemon.primaryAilment?.type === 'freeze' ||
		pokemon.primaryAilment?.type === 'sleep' ||
		(pokemon.primaryAilment?.type === 'paralysis' &&
			Math.random() < PARA_CHANCE)
	);
};
