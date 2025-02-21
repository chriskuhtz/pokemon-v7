import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function getMovesArray<T extends BattlePokemon | OwnedPokemon>(
	pokemon: T,
	filterOutDisabled?: boolean
): T['firstMove'][] {
	const disabledMove = isBattlePokemon(pokemon)
		? pokemon.secondaryAilments.find((a) => a.type === 'disable')?.move
		: undefined;

	return [
		pokemon.firstMove,
		pokemon.secondMove,
		pokemon.thirdMove,
		pokemon.fourthMove,
	]
		.filter((m) => {
			if (filterOutDisabled && disabledMove === m?.name) {
				return false;
			}
			return true;
		})
		.filter((m) => m !== undefined);
}
