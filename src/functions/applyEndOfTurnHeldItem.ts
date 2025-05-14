import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	emergencyBoostBerriesTable,
	FlavourfullBerriesTable,
	hasEndOfTurnEffect,
	HPHealTable,
	isBerry,
} from '../interfaces/Item';
import { getRandomBoostableStat, Stat } from '../interfaces/StatObject';
import { BattleFieldEffect } from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { applyItemToPokemon } from './applyItemToPokemon';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getHeldItem } from './getHeldItem';
import { getMovesArray } from './getMovesArray';
import { getTypeNames } from './getTypeNames';

export const applyEndOfTurnHeldItem = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void,
	addMultipleMessages: (x: string[]) => void,
	battleFieldEffects: BattleFieldEffect[],
	terrain: BattleTerrain | undefined
): BattlePokemon => {
	const unnerved = battleFieldEffects.some(
		(b) => b.type === 'unnerve' && b.ownerId !== pokemon.ownerId
	);

	if (unnerved && isBerry(getHeldItem(pokemon))) {
		return pokemon;
	}
	const heldItem = getHeldItem(pokemon);
	if (!heldItem || !hasEndOfTurnEffect(heldItem)) {
		return pokemon;
	}
	if (heldItem === 'leftovers' && pokemon.damage > 0) {
		addMultipleMessages([`${pokemon.data.name} recovered hp with ${heldItem}`]);
		return {
			...pokemon,
			damage: Math.floor(Math.max(0, pokemon.damage - pokemon.stats.hp / 16)),
		};
	}
	if (heldItem === 'black-sludge') {
		if (getTypeNames(pokemon).includes('poison') && pokemon.damage > 0) {
			addMultipleMessages([
				`${pokemon.data.name} recovered hp with ${heldItem}`,
			]);
			return {
				...pokemon,
				damage: Math.floor(Math.max(0, pokemon.damage - pokemon.stats.hp / 16)),
			};
		} else if (!getTypeNames(pokemon).includes('poison')) {
			addMultipleMessages([`${pokemon.data.name} is damaged by ${heldItem}`]);
			return {
				...pokemon,
				damage: Math.floor(pokemon.damage + pokemon.stats.hp / 16),
			};
		}
	}
	if (heldItem === 'mental-herb') {
		const filteredAilments = pokemon.secondaryAilments.filter((s) => {
			//Held: Consumed to cure infatuation. Gen V: Also removes Taunt, Encore, Torment, Disable, and Cursed Body.
			return !(
				s.type === 'cursed' ||
				s.type === 'infatuation' ||
				s.type === 'disable'
			);
		});

		if (filteredAilments.length < pokemon.secondaryAilments.length) {
			addMessage(`${pokemon.name} cured its ailments with mental herb`);
			return {
				...pokemon,
				heldItemName: undefined,
				secondaryAilments: filteredAilments,
			};
		}
	}

	if (heldItem === 'white-herb') {
		const reducedStat = Object.entries(pokemon.statBoosts).find(
			([, value]) => value < 0
		) as [Stat, number] | undefined;

		if (reducedStat) {
			addMessage(
				`${pokemon.name} cured its ${[reducedStat[0]]} with white herb`
			);
			return {
				...pokemon,
				heldItemName: undefined,
				statBoosts: { ...pokemon.statBoosts, [reducedStat[0]]: 0 },
			};
		}
	}

	if (
		isBerry(heldItem) &&
		FlavourfullBerriesTable[heldItem] &&
		pokemon.damage / pokemon.stats.hp > 0.5
	) {
		if (FlavourfullBerriesTable[heldItem]?.includes(pokemon.nature)) {
			addMultipleMessages([
				`${pokemon.data.name} healed itself with ${heldItem}`,
				'But did not like the flavor',
			]);
			return applySecondaryAilmentToPokemon({
				pokemon: {
					...applyItemToPokemon(pokemon, heldItem),
					heldItemName: undefined,
					consumedBerry: heldItem,
				},
				ailment: 'confusion',
				addMessage: (message) => addMessage(message.message),
				applicator: pokemon,
			});
		} else {
			addMessage(`${pokemon.data.name} healed itself with ${heldItem}`);
			return {
				...applyItemToPokemon(pokemon, heldItem),
				heldItemName: undefined,
				consumedBerry: heldItem,
			};
		}
	}

	const booster = emergencyBoostBerriesTable[heldItem];
	if (
		isBerry(heldItem) &&
		booster &&
		pokemon.damage / pokemon.stats.hp >= 0.75
	) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${heldItem}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined, consumedBerry: heldItem },
			booster,
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (heldItem === 'starf-berry' && pokemon.damage / pokemon.stats.hp >= 0.75) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${heldItem}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined, consumedBerry: heldItem },
			getRandomBoostableStat(),
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (
		heldItem === 'lansat-berry' &&
		pokemon.damage / pokemon.stats.hp >= 0.75
	) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${heldItem}`,
		]);
		return applySecondaryAilmentToPokemon({
			pokemon: { ...pokemon, heldItemName: undefined, consumedBerry: heldItem },
			ailment: 'focused',
			addMessage: (x) => addMessage(x.message),
			applicator: pokemon,
		});
	}

	if (
		heldItem === 'enigma-berry' &&
		pokemon.lastReceivedDamage?.wasSuperEffective
	) {
		addMultipleMessages([`${pokemon.data.name} recovered hp with ${heldItem}`]);
		return {
			...pokemon,
			heldItemName: undefined,
			consumedBerry: heldItem,
			damage: Math.floor(Math.max(0, pokemon.damage - pokemon.stats.hp / 4)),
		};
	}
	if (heldItem === 'kee-berry' && pokemon.lastReceivedDamage?.wasPhysical) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${heldItem}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined, consumedBerry: heldItem },
			'defense',
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (heldItem === 'maranga-berry' && pokemon.lastReceivedDamage?.wasSpecial) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${heldItem}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined, consumedBerry: heldItem },
			'special-defense',
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (HPHealTable[heldItem] && pokemon.damage / pokemon.stats.hp > 0.5) {
		addMessage(`${pokemon.data.name} healed itself with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: isBerry(heldItem) ? heldItem : undefined,
		};
	}
	if (
		heldItem === 'cheri-berry' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		addMessage(`${pokemon.data.name} cured its paralysis with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: heldItem,
		};
	}
	if (heldItem === 'chesto-berry' && pokemon.primaryAilment?.type === 'sleep') {
		addMessage(`${pokemon.data.name} cured its sleep with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: heldItem,
		};
	}
	if (
		heldItem === 'pecha-berry' &&
		(pokemon.primaryAilment?.type === 'poison' ||
			pokemon.primaryAilment?.type === 'toxic')
	) {
		addMessage(`${pokemon.data.name} cured its poison with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: heldItem,
		};
	}
	if (heldItem === 'rawst-berry' && pokemon.primaryAilment?.type === 'burn') {
		addMessage(`${pokemon.data.name} cured its burn with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: heldItem,
		};
	}
	if (
		heldItem === 'aspear-berry' &&
		pokemon.primaryAilment?.type === 'freeze'
	) {
		addMessage(`${pokemon.data.name} cured its freeze with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: heldItem,
		};
	}
	if (
		heldItem === 'persim-berry' &&
		pokemon.secondaryAilments.some((ail) => ail.type === 'confusion')
	) {
		addMessage(`${pokemon.data.name} cured its confusion with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: heldItem,
		};
	}
	if (
		heldItem === 'lum-berry' &&
		(pokemon.secondaryAilments.some((ail) => ail.type === 'confusion') ||
			pokemon.primaryAilment)
	) {
		addMessage(`${pokemon.data.name} cured itself with ${heldItem}`);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
			consumedBerry: heldItem,
		};
	}
	if (heldItem === 'leppa-berry') {
		const depletedMove = getMovesArray(pokemon).find(
			(m) => m.data.pp - m.usedPP <= 0
		);
		if (depletedMove) {
			addMessage(`${pokemon.data.name} used its ${heldItem}`);
			return {
				...applyItemToPokemon(pokemon, heldItem, undefined, depletedMove.name),
				heldItemName: undefined,
				consumedBerry: heldItem,
			};
		}
	}
	if (heldItem === 'toxic-orb' && !pokemon.primaryAilment) {
		addMessage(`${pokemon.name} badly poisoned itself with toxic orb`);
		return { ...pokemon, primaryAilment: { type: 'toxic' } };
	}
	if (heldItem === 'flame-orb' && !pokemon.primaryAilment) {
		addMessage(`${pokemon.name} burned itself with toxic orb`);
		return { ...pokemon, primaryAilment: { type: 'burn' } };
	}
	if (heldItem === 'electric-seed' && terrain === 'electric') {
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			'defense',
			1,
			true,
			battleFieldEffects,
			(x) => addMessage(x.message),
			'electric seed'
		);
	}
	if (heldItem === 'psychic-seed' && terrain === 'psychic') {
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			'special-defense',
			1,
			true,
			battleFieldEffects,
			(x) => addMessage(x.message),
			'psychic seed'
		);
	}
	if (heldItem === 'grassy-seed' && terrain === 'grassy') {
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			'defense',
			1,
			true,
			battleFieldEffects,
			(x) => addMessage(x.message),
			'grassy seed'
		);
	}
	if (heldItem === 'misty-seed' && terrain === 'misty') {
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			'special-defense',
			1,
			true,
			battleFieldEffects,
			(x) => addMessage(x.message),
			'misty seed'
		);
	}

	return pokemon;
};
