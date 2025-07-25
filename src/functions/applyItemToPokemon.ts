import { MoveName } from '../constants/movesCheckList';
import { Message } from '../hooks/useMessageQueue';
import { BattlePokemon, isBattlePokemon } from '../interfaces/BattlePokemon';
import {
	expCandyTable,
	happinessBerries,
	HappinessChangeTable,
	HPHealTable,
	isBerry,
	isEvBoostItem,
	isPPBoostItem,
	isXItem,
	ItemType,
	XItemTable,
} from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { EmptyStatObject } from '../interfaces/StatObject';
import { applyEVBoostItem } from './applyEVGain';
import { applyHappinessChange } from './applyHappinessChange';
import { applyPPMoveBooster } from './applyPPBooster';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { calculateLevelData } from './calculateLevelData';
import { changeMovePP } from './changeMovePP';
import { getMiddleOfThree } from './getMiddleOfThree';
import { hasAilment } from './hasAilment';
import { removeHealableAilments } from './removeHealableAilments';

export function applyItemToPokemon<T extends OwnedPokemon | BattlePokemon>(
	pokemon: T,
	item: ItemType,
	addMessage?: (x: Message) => void,
	move?: MoveName
): T {
	if (
		(item === 'ether' || item === 'max-ether' || item === 'leppa-berry') &&
		move
	) {
		return changeMovePP(pokemon, move, item === 'max-ether' ? 1000 : 10);
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
		(item === 'revive' ||
			item === 'max-revive' ||
			item === 'revival-herb' ||
			item === 'max-honey') &&
		pokemon.damage >= pokemon.maxHp
	) {
		if (addMessage) {
			addMessage({
				message: `regained ${item === 'revive' ? '50%' : 'full'} HP`,
			});
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
	if (isEvBoostItem(item)) {
		return applyEVBoostItem(pokemon, item);
	}
	if (item === 'fresh-start-mochi') {
		return { ...pokemon, effortValues: EmptyStatObject };
	}
	if (item === 'rare-candy') {
		const { xpAtNextLevel, level } = calculateLevelData(
			pokemon.xp,
			pokemon.growthRate
		);

		if (level === 100) {
			return pokemon;
		}

		if (addMessage) {
			addMessage({ message: `reached level ${level + 1}` });
		}
		return {
			...applyHappinessChange(pokemon, HappinessChangeTable[item] ?? 0),
			xp: xpAtNextLevel,
		};
	}
	if (expCandyTable[item]) {
		const { level } = calculateLevelData(pokemon.xp, pokemon.growthRate);

		if (level === 100) {
			return pokemon;
		}

		if (addMessage) {
			addMessage({ message: `gained ${expCandyTable[item]} xp` });
		}
		return {
			...pokemon,
			xp: pokemon.xp + expCandyTable[item],
		};
	}
	if (isPPBoostItem(item) && move) {
		return applyPPMoveBooster(pokemon, move, item);
	}
	if (happinessBerries[item]) {
		const stat = happinessBerries[item];
		if (addMessage) {
			addMessage({
				message: `Happiness raised, ${stat} Effort value lowered`,
			});
		}
		return applyHappinessChange(
			{
				...pokemon,
				effortValues: {
					...pokemon.effortValues,
					[stat]: getMiddleOfThree([
						0,
						pokemon.effortValues[stat],
						pokemon.effortValues[stat] - 10,
					]),
				},
			},
			10
		);
	}

	//CANT BE USED IF K.O.
	if (pokemon.damage >= pokemon.maxHp) {
		return pokemon;
	}
	if (item === 'full-restore') {
		if (addMessage) {
			addMessage({ message: `fully healed` });
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
		item === 'old-gateau' ||
		item === 'big-malasada' ||
		item === 'max-mushroom' ||
		item === 'lum-berry'
	) {
		if (addMessage) {
			addMessage({ message: `all ailments healed` });
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
		const healAmount =
			isBerry(item) && pokemon.ability === 'ripen'
				? HPHealTable[item] * 2
				: HPHealTable[item];
		const updatedDamage = Math.max(pokemon.damage - healAmount, 0);
		if (addMessage) {
			addMessage({ message: `healed ${pokemon.damage - updatedDamage} HP` });
		}

		return { ...pokemon, damage: updatedDamage };
	}
	if (
		(item === 'antidote' || item === 'pecha-berry') &&
		(pokemon.primaryAilment?.type === 'poison' ||
			pokemon.primaryAilment?.type === 'toxic')
	) {
		if (addMessage) {
			addMessage({ message: `Poisoning cured` });
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (
		(item === 'burn-heal' || item === 'rawst-berry') &&
		pokemon.primaryAilment?.type === 'burn'
	) {
		if (addMessage) {
			addMessage({ message: `Burn cured` });
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (
		(item === 'ice-heal' || item === 'aspear-berry') &&
		pokemon.primaryAilment?.type === 'freeze'
	) {
		if (addMessage) {
			addMessage({ message: `Defrosted` });
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (
		(item === 'awakening' ||
			item === 'blue-flute' ||
			item === 'chesto-berry') &&
		pokemon.primaryAilment?.type === 'sleep'
	) {
		if (addMessage) {
			addMessage({ message: `Woken Up` });
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (
		(item === 'paralyze-heal' || item === 'cheri-berry') &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		if (addMessage) {
			addMessage({ message: `Paralysis healed` });
		}
		return {
			...pokemon,
			primaryAilment: undefined,
			happiness: pokemon.happiness + (HappinessChangeTable[item] ?? 0),
		};
	}
	if (
		(item === 'yellow-flute' || item === 'persim-berry') &&
		isBattlePokemon(pokemon) &&
		hasAilment(pokemon, 'confusion')
	) {
		if (addMessage) {
			addMessage({ message: `confusion healed` });
		}

		return {
			...pokemon,
			secondaryAilments: pokemon.secondaryAilments.filter(
				(ailment) => !['confusion'].includes(ailment.type)
			),
		};
	}
	if (item === 'red-flute') {
		if (addMessage) {
			addMessage({ message: `infatuation healed` });
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

	if (isXItem(item) && isBattlePokemon(pokemon)) {
		const stat = XItemTable[item];
		if (stat) {
			return applyStatChangeToPokemon(
				pokemon,
				stat,
				1,
				true,
				[],
				addMessage
			) as T;
		}
		if (item === 'guard-spec') {
			return applySecondaryAilmentToPokemon({
				pokemon: pokemon,
				ailment: 'guard-spec',
				addMessage: addMessage ? addMessage : () => {},
				applicator: pokemon,
			}) as T;
		}
		if (item === 'dire-hit') {
			return applySecondaryAilmentToPokemon({
				pokemon: pokemon,
				ailment: 'dire-hit',
				addMessage: addMessage ? addMessage : () => {},
				applicator: pokemon,
			}) as T;
		}
	}

	return pokemon;
}
