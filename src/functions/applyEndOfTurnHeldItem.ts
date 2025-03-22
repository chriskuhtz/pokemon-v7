import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	FlavourfullBerriesTable,
	hasEndOfTurnEffect,
	HPHealTable,
} from '../interfaces/Item';
import { applyItemToPokemon } from './applyItemToPokemon';
import { applySecondaryAilmentToPokemon } from './applySecondaryAilmentToPokemon';
import { getMovesArray } from './getMovesArray';

export const applyEndOfTurnHeldItem = (
	pokemon: BattlePokemon,
	addMessage: (x: string) => void,
	addMultipleMessages: (x: string[]) => void
): BattlePokemon => {
	if (!pokemon.heldItemName || !hasEndOfTurnEffect(pokemon.heldItemName)) {
		return pokemon;
	}

	if (
		FlavourfullBerriesTable[pokemon.heldItemName] &&
		pokemon.damage / pokemon.stats.hp > 0.5
	) {
		if (
			FlavourfullBerriesTable[pokemon.heldItemName]?.includes(pokemon.nature)
		) {
			addMultipleMessages([
				`${pokemon.data.name} healed itself with ${pokemon.heldItemName}`,
				'But did not like the flavor',
			]);
			return applySecondaryAilmentToPokemon({
				pokemon: {
					...applyItemToPokemon(pokemon, pokemon.heldItemName),
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
				...applyItemToPokemon(pokemon, pokemon.heldItemName),
				heldItemName: undefined,
			};
		}
	}
	if (
		HPHealTable[pokemon.heldItemName] &&
		pokemon.damage / pokemon.stats.hp > 0.5
	) {
		addMessage(
			`${pokemon.data.name} healed itself with ${pokemon.heldItemName}`
		);
		return {
			...applyItemToPokemon(pokemon, pokemon.heldItemName),
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

	//remember gluttony for 1/4 trigger berries
	return pokemon;
};
