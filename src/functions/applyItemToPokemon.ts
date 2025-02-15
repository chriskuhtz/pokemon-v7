import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import { HealingItemType, ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { removeHealableAilments } from './removeHealableAilments';

const HPHealTable: Partial<Record<ItemType, number>> = {
	potion: 20,
	'max-potion': 10000,
	'hyper-potion': 200,
	'super-potion': 50,
};
export function applyItemToPokemon<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: HealingItemType,
	addToast?: AddToastFunction
): T {
	if (item === 'full-restore') {
		if (addToast) {
			addToast(`fully healed`);
		}
		if (isBattlePokemon(pokemon)) {
			return {
				...pokemon,
				damage: 0,
				primaryAilment: undefined,
				secondaryAilments: removeHealableAilments(pokemon.secondaryAilments),
			};
		}

		return { ...pokemon, damage: 0, primaryAilment: undefined };
	}
	if (item === 'full-heal') {
		if (addToast) {
			addToast(`all ailments healed`);
		}
		if (isBattlePokemon(pokemon)) {
			return {
				...pokemon,
				primaryAilment: undefined,
				secondaryAilments: removeHealableAilments(pokemon.secondaryAilments),
			};
		}

		return { ...pokemon, primaryAilment: undefined };
	}

	if (HPHealTable[item]) {
		const updatedDamage = Math.max(pokemon.damage - HPHealTable[item], 0);
		if (addToast) {
			addToast(`healed ${pokemon.damage - updatedDamage} HP`);
		}

		return { ...pokemon, damage: updatedDamage };
	}
	if (
		item === 'antidote' &&
		(pokemon.primaryAilment?.type === 'poison' ||
			pokemon.primaryAilment?.type === 'toxic')
	) {
		if (addToast) {
			addToast(`Poisoning cured`);
		}
		return { ...pokemon, primaryAilment: undefined };
	}
	if (item === 'burn-heal' && pokemon.primaryAilment?.type === 'burn') {
		if (addToast) {
			addToast(`Burn cured`);
		}
		return { ...pokemon, primaryAilment: undefined };
	}
	if (item === 'ice-heal' && pokemon.primaryAilment?.type === 'freeze') {
		if (addToast) {
			addToast(`Defrosted`);
		}
		return { ...pokemon, primaryAilment: undefined };
	}
	if (item === 'awakening' && pokemon.primaryAilment?.type === 'sleep') {
		if (addToast) {
			addToast(`Woken Up`);
		}
		return { ...pokemon, primaryAilment: undefined };
	}
	if (
		item === 'paralyze-heal' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		if (addToast) {
			addToast(`Paralysis healed`);
		}
		return { ...pokemon, primaryAilment: undefined };
	}

	return pokemon;
}
