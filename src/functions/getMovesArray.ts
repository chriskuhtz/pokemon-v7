import { struggleMove } from '../constants/struggle';
import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { getCurrentPP } from './getCurrentPP';
import { hasAilment } from './hasAilment';

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
		isBattlePokemon(pokemon) && hasAilment(pokemon, 'torment')
			? pokemon.lastUsedMove?.name
			: undefined;

	const res = [
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

				return getCurrentPP(pokemon, battleMove) > 0;
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
				hasAilment(pokemon, 'taunt')
			) {
				const move = m as BattlePokemon['firstMove'];
				return (
					move.data.damage_class.name === 'physical' ||
					move.data.damage_class.name === 'special'
				);
			}

			return true;
		});

	console.log(res);

	if (res.length === 0) {
		return [struggleMove];
	}
	return res;
}
