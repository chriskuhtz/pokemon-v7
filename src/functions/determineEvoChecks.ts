import { pokemonNames } from '../constants/pokemonNames';
import { EvolutionChainLink } from '../interfaces/EvolutionChainData';
import { Inventory } from '../interfaces/Inventory';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { calculateLevelData } from './calculateLevelData';
import { getTimeOfDay } from './getTimeOfDay';

export const determineEvoChecks = (
	ownedPokemon: OwnedPokemon,
	inventory: Inventory,
	evo: EvolutionChainLink
) => {
	const alternateFormOffset = () => {
		if (pokemonNames.some((pn) => pn === ownedPokemon.name + '-alola')) {
			return 2;
		}
		return 1;
	};
	const deets =
		evo.evolution_details[evo.evolution_details.length - alternateFormOffset()];
	const {
		min_happiness,
		min_affection,
		min_beauty,
		item,
		min_level,
		time_of_day,
		held_item,
		trigger,
	} = deets;
	const itemName = item?.name as ItemType | undefined;
	const { level } = calculateLevelData(ownedPokemon.xp);

	const minLevelIncludingTrade = () => {
		if (trigger.name === 'trade') {
			return 30;
		}
		return min_level;
	};
	const minLevel = minLevelIncludingTrade();

	function checks() {
		const res = [];

		if (minLevel && minLevel > level) {
			res.push(`Level ${minLevel}`);
		}
		if (itemName && !inventory[itemName]) {
			res.push(itemName);
		}

		const happiness = min_happiness ?? min_affection ?? min_beauty ?? 0;
		if (ownedPokemon.happiness <= happiness) {
			res.push(`${min_happiness} Happiness`);
		}
		if (time_of_day && getTimeOfDay().toLowerCase() !== time_of_day) {
			res.push(`${time_of_day}-time`);
		}
		if (held_item && ownedPokemon.heldItemName !== held_item.name) {
			res.push(`held item ${held_item.name}`);
		}

		return res;
	}

	return { checks: checks(), itemName, held_item, deets };
};
