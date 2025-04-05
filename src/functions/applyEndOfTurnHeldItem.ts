import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	emergencyBoostBerriesTable,
	FlavourfullBerriesTable,
	hasEndOfTurnEffect,
	HPHealTable,
} from '../interfaces/Item';
import { getRandomBoostableStat, Stat } from '../interfaces/StatObject';
import { applyItemToPokemon } from './applyItemToPokemon';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';
import { applyStatChangeToPokemon } from './applyStatChangeToPokemon';
import { getHeldItemInBattle } from './getHeldItem';
import { getMovesArray } from './getMovesArray';

export const applyEndOfTurnHeldItem = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void,
	addMultipleMessages: (x: string[]) => void
): BattlePokemon => {
	const heldItem = getHeldItemInBattle(pokemon);
	if (!heldItem || !hasEndOfTurnEffect(heldItem)) {
		return pokemon;
	}
	if (pokemon.heldItemName === 'leftovers' && pokemon.damage > 0) {
		addMultipleMessages([
			`${pokemon.data.name} recovered hp with ${pokemon.heldItemName}`,
		]);
		return {
			...pokemon,
			damage: Math.floor(Math.max(0, pokemon.damage - pokemon.stats.hp / 16)),
		};
	}
	if (pokemon.heldItemName === 'mental-herb') {
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

	if (pokemon.heldItemName === 'white-herb') {
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
		FlavourfullBerriesTable[heldItem] &&
		pokemon.damage / pokemon.stats.hp > 0.5
	) {
		if (FlavourfullBerriesTable[heldItem]?.includes(pokemon.nature)) {
			addMultipleMessages([
				`${pokemon.data.name} healed itself with ${pokemon.heldItemName}`,
				'But did not like the flavor',
			]);
			return applySecondaryAilmentToPokemon({
				pokemon: {
					...applyItemToPokemon(pokemon, heldItem),
					heldItemName: undefined,
				},
				ailment: 'confusion',
				addMessage: (message) => addMessage(message.message),
			});
		} else {
			addMessage(
				`${pokemon.data.name} healed itself with ${pokemon.heldItemName}`
			);
			return {
				...applyItemToPokemon(pokemon, heldItem),
				heldItemName: undefined,
			};
		}
	}

	const booster = emergencyBoostBerriesTable[heldItem];
	if (booster && pokemon.damage / pokemon.stats.hp >= 0.75) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${pokemon.heldItemName}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			booster,
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (
		pokemon.heldItemName === 'starf-berry' &&
		pokemon.damage / pokemon.stats.hp >= 0.75
	) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${pokemon.heldItemName}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			getRandomBoostableStat(),
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (
		pokemon.heldItemName === 'lansat-berry' &&
		pokemon.damage / pokemon.stats.hp >= 0.75
	) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${pokemon.heldItemName}`,
		]);
		return applySecondaryAilmentToPokemon({
			pokemon: { ...pokemon, heldItemName: undefined },
			ailment: 'focused',
			addMessage: (x) => addMessage(x.message),
		});
	}

	if (
		pokemon.heldItemName === 'enigma-berry' &&
		pokemon.lastReceivedDamage?.wasSuperEffective
	) {
		addMultipleMessages([
			`${pokemon.data.name} recovered hp with ${pokemon.heldItemName}`,
		]);
		return {
			...pokemon,
			heldItemName: undefined,
			damage: Math.floor(Math.max(0, pokemon.damage - pokemon.stats.hp / 4)),
		};
	}
	if (
		pokemon.heldItemName === 'kee-berry' &&
		pokemon.lastReceivedDamage?.wasPhysical
	) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${pokemon.heldItemName}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			'defense',
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (
		pokemon.heldItemName === 'maranga-berry' &&
		pokemon.lastReceivedDamage?.wasSpecial
	) {
		addMultipleMessages([
			`${pokemon.data.name} gave itself a boost with ${pokemon.heldItemName}`,
		]);
		return applyStatChangeToPokemon(
			{ ...pokemon, heldItemName: undefined },
			'special-defense',
			1,
			true,
			[],
			(x) => addMessage(x.message)
		);
	}
	if (HPHealTable[heldItem] && pokemon.damage / pokemon.stats.hp > 0.5) {
		addMessage(
			`${pokemon.data.name} healed itself with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, heldItem),
			heldItemName: undefined,
		};
	}
	if (
		pokemon.heldItemName === 'cheri-berry' &&
		pokemon.primaryAilment?.type === 'paralysis'
	) {
		addMessage(
			`${pokemon.data.name} cured its paralysis with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	if (
		pokemon.heldItemName === 'chesto-berry' &&
		pokemon.primaryAilment?.type === 'sleep'
	) {
		addMessage(
			`${pokemon.data.name} cured its sleep with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	if (
		pokemon.heldItemName === 'pecha-berry' &&
		(pokemon.primaryAilment?.type === 'poison' ||
			pokemon.primaryAilment?.type === 'toxic')
	) {
		addMessage(
			`${pokemon.data.name} cured its poison with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	if (
		pokemon.heldItemName === 'rawst-berry' &&
		pokemon.primaryAilment?.type === 'burn'
	) {
		addMessage(
			`${pokemon.data.name} cured its burn with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	if (
		pokemon.heldItemName === 'aspear-berry' &&
		pokemon.primaryAilment?.type === 'freeze'
	) {
		addMessage(
			`${pokemon.data.name} cured its freeze with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	if (
		pokemon.heldItemName === 'persim-berry' &&
		pokemon.secondaryAilments.some((ail) => ail.type === 'confusion')
	) {
		addMessage(
			`${pokemon.data.name} cured its confusion with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	if (
		pokemon.heldItemName === 'lum-berry' &&
		(pokemon.secondaryAilments.some((ail) => ail.type === 'confusion') ||
			pokemon.primaryAilment)
	) {
		addMessage(
			`${pokemon.data.name} cured itself with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
			heldItemName: undefined,
		};
	}
	if (pokemon.heldItemName === 'leppa-berry') {
		const depletedMove = getMovesArray(pokemon).find(
			(m) => m.data.pp - m.usedPP <= 0
		);
		if (depletedMove) {
			addMessage(`${pokemon.data.name} used its ${pokemon.heldItemName}`);
			return {
				...applyItemToPokemon(
					pokemon,
					pokemon.heldItemName,
					undefined,
					depletedMove.name
				),
				heldItemName: undefined,
			};
		}
	}

	return pokemon;
};
