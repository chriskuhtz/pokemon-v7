import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { getMiddleOfThree } from '../getMiddleOfThree';
import { hasAilment } from '../hasAilment';
import { isLeechSeeded, isTrapped, leechingOn } from '../isTrapped';
import { applyAquaRingHeal } from './applyAquaRingHeal';
import { applyCurseDamage } from './applyCurseDamage';
import { applyIngrainHeal } from './applyIngrainHeal';
import { applyLeechSeedDamage } from './applyLeechSeedDamage';
import { applyNightMareDamage } from './applyNightmareDamage';
import { applyOctoLock } from './applyOctoLock';
import { applyTrapDamage } from './applyTrapDamage';

export const applySecondaryAilmentDamage = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void
): BattlePokemon => {
	let updated = { ...pokemon };

	//apply ailment damage
	if (isTrapped(updated)) {
		updated = applyTrapDamage(updated, addMessage);
	}
	if (isLeechSeeded(updated)) {
		updated = applyLeechSeedDamage(updated, addMessage);
	}
	if (hasAilment(updated, 'nightmare')) {
		applyNightMareDamage(updated, addMessage);
	}
	if (hasAilment(updated, 'cursed')) {
		applyCurseDamage(updated, addMessage);
	}
	if (hasAilment(updated, 'octolocked')) {
		applyOctoLock(updated, addMessage);
	}

	if (hasAilment(updated, 'ingrained')) {
		applyIngrainHeal(updated, addMessage);
	}
	if (hasAilment(updated, 'aqua-ringed')) {
		applyAquaRingHeal(updated, addMessage);
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
