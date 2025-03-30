import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function getMovesArray<T extends BattlePokemon | OwnedPokemon>(
	pokemon: T,
	config?: {
		filterOutDisabled?: boolean;
		filterOutEmpty?: boolean;
	}
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
		.filter((m) => m !== undefined)
		.filter((m) => {
			if (config?.filterOutDisabled && disabledMove === m?.name) {
				return false;
			}
			if (isBattlePokemon(pokemon) && config?.filterOutEmpty) {
				const battleMove = m as BattlePokemon['firstMove'];

				return battleMove.usedPP < battleMove.data.pp;
			}
			return true;
		});
}
