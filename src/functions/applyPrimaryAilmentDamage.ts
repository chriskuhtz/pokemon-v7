import { AddToastFunction } from '../hooks/useToasts';
import { BURN_DAMAGE_FACTOR } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const applyPrimaryAilmentDamage = (
	pokemon: BattlePokemon,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	if (pokemon.primaryAilment?.type === 'burn') {
		dispatchToast(`${pokemon.data.name} is hurt by burn`);

		const burnDamage = Math.floor(BURN_DAMAGE_FACTOR * pokemon.stats.hp);
		return {
			...pokemon,
			damage: pokemon.damage + burnDamage,
		};
	}
	return pokemon;
};
