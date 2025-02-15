import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { HealingItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export function applyItemToPokemon<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: HealingItemType,
	addToast?: AddToastFunction
): T {
	if (item === 'potion') {
		const updatedDamage = Math.max(pokemon.damage - 20, 0);
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

	return pokemon;
}
