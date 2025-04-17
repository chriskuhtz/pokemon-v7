import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function getMovesArray<T extends BattlePokemon | OwnedPokemon>(
	pokemon: T,
	config?: {
		filterOutDisabled?: boolean;
		considerTorment?: boolean;
		considerEncore?: boolean;
		considerTaunt?: boolean;
		filterOutEmpty?: boolean;
	}
): T['firstMove'][] {
	const disabledMove = isBattlePokemon(pokemon)
		? pokemon.secondaryAilments.find((a) => a.type === 'disable')?.move
		: undefined;
	const encoredMove = isBattlePokemon(pokemon)
		? pokemon.secondaryAilments.find((a) => a.type === 'encore')?.move
		: undefined;
	const tormentedMove =
		isBattlePokemon(pokemon) &&
		pokemon.secondaryAilments.some((a) => a.type === 'torment')
			? pokemon.lastUsedMove?.name
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
			if (tormentedMove && config?.considerTorment) {
				return m.name === tormentedMove;
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
		})
		.filter((m) => {
			if (
				config?.considerTaunt &&
				isBattlePokemon(pokemon) &&
				pokemon.secondaryAilments.some((s) => s.type === 'taunt')
			) {
				const move = m as BattlePokemon['firstMove'];
				return (
					move.data.damage_class.name === 'physical' ||
					move.data.damage_class.name === 'special'
				);
			}

			return true;
		});
}
