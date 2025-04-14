import {
	CURSE_DAMAGE_FACTOR,
	LEECH_DAMAGE_FACTOR,
	NIGHTMARE_DAMAGE_FACTOR,
	TRAP_DAMAGE_FACTOR,
} from '../interfaces/Ailment';
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
		if (pokemon.ability === 'magic-guard') {
			addMessage(`${pokemon.name} prevents damage with magic-guard`);
			return pokemon;
		}
		addMessage(`${pokemon.data.name} is hurt by its trap`);
		const trapDamage = Math.round(TRAP_DAMAGE_FACTOR * updated.stats.hp);
		updated = {
			...updated,
			damage: updated.damage + trapDamage,
		};
	}
	if (isLeechSeeded(updated)) {
		if (pokemon.ability === 'magic-guard') {
			addMessage(`${pokemon.name} prevents damage with magic-guard`);
			return pokemon;
		}
		addMessage(`${pokemon.data.name} had its energy drained`);
		const leechDamage = Math.round(LEECH_DAMAGE_FACTOR * updated.stats.hp);
		updated = {
			...updated,
			damage: updated.damage + leechDamage,
		};
	}
	if (updated.secondaryAilments.some((ail) => ail.type === 'nightmare')) {
		if (pokemon.ability === 'magic-guard') {
			addMessage(`${pokemon.name} prevents damage with magic-guard`);
			return pokemon;
		}
		addMessage(`${pokemon.data.name} is damaged by nightmares`);
		const nightmareDamage = Math.round(
			NIGHTMARE_DAMAGE_FACTOR * updated.stats.hp
		);
		updated = {
			...updated,
			damage: updated.damage + nightmareDamage,
		};
	}
	if (updated.secondaryAilments.some((ail) => ail.type === 'cursed')) {
		if (pokemon.ability === 'magic-guard') {
			addMessage(`${pokemon.name} prevents damage with magic-guard`);
			return pokemon;
		}
		addMessage(`${pokemon.data.name} is damaged by curse`);
		const nightmareDamage = Math.round(CURSE_DAMAGE_FACTOR * updated.stats.hp);
		updated = {
			...updated,
			damage: updated.damage + nightmareDamage,
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
