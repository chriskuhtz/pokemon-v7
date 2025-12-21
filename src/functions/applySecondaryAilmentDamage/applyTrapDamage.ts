import { TRAP_DAMAGE_FACTOR } from '../../interfaces/Ailment';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { isBindingBanded } from '../isTrapped';

export const applyTrapDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	if (pokemon.ability === 'magic-guard') {
		addMessage(`${pokemon.name} prevents damage with magic-guard`);
		return pokemon;
	}
	addMessage(`${pokemon.data.name} is hurt by its trap`);
	const bindingBandFactor = isBindingBanded(pokemon) ? 2 : 1;
	const trapDamage =
		Math.round(TRAP_DAMAGE_FACTOR * pokemon.stats.hp) * bindingBandFactor;
	return {
		...pokemon,
		damage: pokemon.damage + trapDamage,
	};
};
