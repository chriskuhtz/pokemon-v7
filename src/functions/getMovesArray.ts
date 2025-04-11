import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function getMovesArray<T extends BattlePokemon | OwnedPokemon>(
	pokemon: T,
	config?: {
		filterOutDisabled?: boolean;
		considerEncore?: boolean;
		filterOutEmpty?: boolean;
	}
): T['firstMove'][] {
	const disabledMove = isBattlePokemon(pokemon)
		? pokemon.secondaryAilments.find((a) => a.type === 'disable')?.move
		: undefined;
	const encoredMove = isBattlePokemon(pokemon)
		? pokemon.secondaryAilments.find((a) => a.type === 'encore')?.move
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
			if (encoredMove && config?.considerEncore) {
				return m.name === encoredMove;
			}
			if (isBattlePokemon(pokemon) && config?.filterOutEmpty) {
				const battleMove = m as BattlePokemon['firstMove'];

				return battleMove.usedPP < battleMove.data.pp;
			}
			if (isBattlePokemon(pokemon) && pokemon.choiceBandedMove) {
				const battleMove = m as BattlePokemon['firstMove'];

				return battleMove.name === pokemon.choiceBandedMove;
			}
			return true;
		});
}
