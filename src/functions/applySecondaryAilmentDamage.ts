import { AddToastFunction } from '../hooks/useToasts';
import { TRAP_DAMAGE_FACTOR } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isTrapped } from './isTrapped';

export const applySecondaryAilmentDamage = (
	pokemon: BattlePokemon,
	dispatchToast: AddToastFunction
): BattlePokemon => {
	let updated = { ...pokemon };
	//reduce ailment duration
	updated.secondaryAilments = updated.secondaryAilments
		.map((a) => {
			if (a.type === 'trap') {
				if (a.duration === 0) {
					dispatchToast(`${pokemon.data.name} is no longer trapped`);
					return undefined;
				} else {
					return { ...a, duration: a.duration - 1 };
				}
			}
			return a;
		})
		.filter((a) => a !== undefined);

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
