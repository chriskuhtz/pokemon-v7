import { Inventory } from '../interfaces/Inventory';
import { valuables } from '../interfaces/Item';

export const STANDARD_BUY_MARKET: Partial<Inventory> = {
	'poke-ball': 1,
	'nest-ball': 1,
	potion: 1,
	antidote: 1,
	'berry-juice': 1,
	'escape-rope': 1,
};

export const VALUABLES_BUY_MARKET: Partial<Inventory> = Object.fromEntries(
	valuables.map((v) => [v, 1])
);

console.log(VALUABLES_BUY_MARKET);
