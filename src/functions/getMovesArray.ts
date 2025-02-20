import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function getMovesArray<T extends BattlePokemon | OwnedPokemon>(
	pokemon: T
): T['firstMove'][] {
	return [
		pokemon.firstMove,
		pokemon.secondMove,
		pokemon.thirdMove,
		pokemon.fourthMove,
	].filter((m) => m !== undefined);
}
