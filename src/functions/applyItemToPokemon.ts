import { MoveName } from '../constants/checkLists/movesCheckList';
import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import {
	HappinessChangeTable,
	HPHealTable,
	isEvBoostItem,
	isPPBoostItem,
	isXItem,
	ItemType,
	XItemTable,
} from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { applyEVBoostItem } from './applyEVGain';
import { applyHappinessChange } from './applyHappinessChange';
import { applyPPMoveBooster } from './applyPPBooster';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { calculateLevelData } from './calculateLevelData';
import { changeMovePP } from './changeMovePP';
import { removeHealableAilments } from './removeHealableAilments';

export function applyItemToPokemon<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: ItemType,
	addToast?: (x: string) => void,
	move?: MoveName
): T {
	if ((item === 'ether' || item === 'max-ether') && move) {
		return changeMovePP(pokemon, move, item === 'ether' ? 10 : 1000);
	}
	if (item === 'elixir' || item === 'max-elixir') {
		const amount = item === 'elixir' ? 10 : 1000;

		let res = { ...pokemon } as T;

		[
			pokemon.firstMove,
			pokemon.secondMove,
			pokemon.thirdMove,
			pokemon.fourthMove,
		].forEach((nextMove) => {
			if (!nextMove) {
				return;
			}
			res = changeMovePP(res, nextMove.name, amount);
		});

		return res;
	}
	if (
		(item === 'revive' || item === 'max-revive' || item === 'revival-herb') &&
		pokemon.damage >= pokemon.maxHp
	) {
		if (addToast) {
			addToast(`regained ${item === 'revive' ? '50%' : 'full'} HP`);
		}
		if (isBattlePokemon(pokemon)) {
			return {
				...pokemon,
				damage: item === 'revive' ? Math.round(pokemon.stats.hp / 2) : 0,
				primaryAilment: undefined,
				secondaryAilments: [],
				flashFired: false,
				moveQueue: [],
				roundsInBattle: 0,
				status: 'BENCH',
				happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
			};
		}
		return {
			...pokemon,
			damage: Math.round(pokemon.maxHp / 2),
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
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
				happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
			};
		}

		return { ...pokemon, damage: 0, primaryAilment: undefined };
	}
	if (
		item === 'full-heal' ||
		item === 'heal-powder' ||
		item === 'lava-cookie' ||
		item === 'old-gateau'
	) {
		if (addToast) {
			addToast(`all ailments healed`);
		}
		if (isBattlePokemon(pokemon)) {
			return {
				...pokemon,
				primaryAilment: undefined,
				secondaryAilments: removeHealableAilments(pokemon.secondaryAilments),
				happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
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
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (item === 'burn-heal' && pokemon.primaryAilment?.type === 'burn') {
		if (addToast) {
			addToast(`Burn cured`);
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (item === 'ice-heal' && pokemon.primaryAilment?.type === 'freeze') {
		if (addToast) {
			addToast(`Defrosted`);
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (
		(item === 'awakening' || item === 'blue-flute') &&
		pokemon.primaryAilment?.type === 'sleep'
	) {
		if (addToast) {
			addToast(`Woken Up`);
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (
		item === 'paralyze-heal' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		if (addToast) {
			addToast(`Paralysis healed`);
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (item === 'yellow-flute') {
		if (addToast) {
			addToast(`confusion healed`);
		}
		if (isBattlePokemon(pokemon)) {
			return {
				...pokemon,
				primaryAilment: undefined,
				secondaryAilments: pokemon.secondaryAilments.filter(
					(ailment) => !['confusion'].includes(ailment.type)
				),
			};
		}

		return { ...pokemon, primaryAilment: undefined };
	}
	if (item === 'red-flute') {
		if (addToast) {
			addToast(`infatuation healed`);
		}
		if (isBattlePokemon(pokemon)) {
			return {
				...pokemon,
				primaryAilment: undefined,
				secondaryAilments: pokemon.secondaryAilments.filter(
					(ailment) => !['infatuation'].includes(ailment.type)
				),
			};
		}

		return { ...pokemon, primaryAilment: undefined };
	}
	if (isEvBoostItem(item)) {
		return applyEVBoostItem(pokemon, item);
	}
	if (item === 'rare-candy') {
		const { xpAtNextLevel, level } = calculateLevelData(pokemon.xp);

		if (level === 100) {
			return pokemon;
		}

		if (addToast) {
			addToast(`reached level ${level + 1}`);
		}
		return {
			...applyHappinessChange(pokemon, HappinessChangeTable[item] ?? 0),
			xp: xpAtNextLevel,
		};
	}
	if (isPPBoostItem(item) && move) {
		return applyPPMoveBooster(pokemon, move, item);
	}
	if (isXItem(item) && isBattlePokemon(pokemon)) {
		const stat = XItemTable[item];
		if (stat) {
			return applyStatChangeToPokemon(
				pokemon,
				stat,
				1,
				true,
				[],
				addToast
			) as T;
		}
		if (item === 'guard-spec') {
			return applySecondaryAilmentToPokemon(
				pokemon,
				'guard-spec',
				addToast ? addToast : () => {}
			) as T;
		}
		if (item === 'dire-hit') {
			return applySecondaryAilmentToPokemon(
				pokemon,
				'dire-hit',
				addToast ? addToast : () => {}
			) as T;
		}
	}

	return pokemon;
}
