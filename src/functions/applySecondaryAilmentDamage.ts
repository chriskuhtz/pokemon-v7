import { LEECH_DAMAGE_FACTOR, TRAP_DAMAGE_FACTOR } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { getMiddleOfThree } from './getMiddleOfThree';
import { isLeechSeeded, isTrapped, leechingOn } from './isTrapped';

export const applySecondaryAilmentDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	let updated = { ...pokemon };

	//apply ailment damage
	if (isTrapped(updated)) {
		addMessage(`${pokemon.data.name} is hurt by its trap`);
		const trapDamage = Math.round(TRAP_DAMAGE_FACTOR * updated.stats.hp);
		updated = {
			...updated,
			damage: updated.damage + trapDamage,
		};
	}
	if (isLeechSeeded(updated)) {
		addMessage(`${pokemon.data.name} had its energy drained`);
		const leechDamage = Math.round(LEECH_DAMAGE_FACTOR * updated.stats.hp);
		updated = {
			...updated,
			damage: updated.damage + leechDamage,
		};
	}

	const leechTargets = leechingOn(updated);

	leechTargets.forEach((l) => {
		addMessage(`${pokemon.data.name} leeched health`);
		updated = {
			...updated,
			damage: getMiddleOfThree([0, updated.damage - l, pokemon.stats.hp]),
		};
	});

	return updated;
};
