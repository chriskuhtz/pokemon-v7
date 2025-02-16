import { AddToastFunction } from '../hooks/useToasts';
import { TRAP_DAMAGE_FACTOR } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isTrapped } from './isTrapped';

export const applySecondaryAilmentDamage = (
	pokemon: BattlePokemon,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	let updated = { ...pokemon };

	//apply ailment damage
	if (isTrapped(updated)) {
		dispatchToast(`${pokemon.data.name} is hurt by its trap`);
		const trapDamage = Math.floor(TRAP_DAMAGE_FACTOR * updated.stats.hp);
		updated = {
			...updated,
			damage: updated.damage + trapDamage,
		};
	}
	return updated;
};
