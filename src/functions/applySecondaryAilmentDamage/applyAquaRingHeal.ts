import { INGRAIN_FACTOR } from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { getHeldItem } from '../getHeldItem';

export const applyAquaRingHeal = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	addMessage(`${pokemon.data.name} absorbs nutrients from the water`);
	const bigRootFactor = getHeldItem(pokemon) === 'big-root' ? 1.3 : 1;

	const ingrainHeal = Math.floor(
		Math.round(INGRAIN_FACTOR * bigRootFactor * pokemon.stats.hp)
	);

	return {
		...pokemon,
		damage: Math.max(0, pokemon.damage - ingrainHeal),
	};
};
