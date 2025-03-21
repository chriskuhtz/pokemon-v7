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
	const deets = evo.evolution_details[evo.evolution_details.length - 1];
	const { min_happiness, item, min_level, time_of_day, held_item, trigger } =
		deets;
	const itemName = item?.name as ItemType | undefined;
	const { level } = calculateLevelData(ownedPokemon.xp);

	const minLevelIncludingTrade =
		min_level ?? trigger.name === 'trade' ? 30 : null;
	function checks() {
		const res = [];

		if (minLevelIncludingTrade && minLevelIncludingTrade > level) {
			res.push(`Level ${minLevelIncludingTrade}`);
		}
		if (itemName && !inventory[itemName]) {
			res.push(itemName);
		}
		if (min_happiness && ownedPokemon.happiness <= min_happiness) {
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

	return { checks: checks(), itemName, held_item };
};
