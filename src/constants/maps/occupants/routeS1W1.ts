import { OverworldMap } from '../../../interfaces/OverworldMap';
import { travellingMerchantRouteS1W1 } from '../../../modules/TravellingMerchant/TravellingMerchant';
import { barryS1W1 } from './barry';
import { sabrina } from './sabrina';

export const routeS1W1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 0,
		portal: {
			mapId: 'routeW1',
			x: 25,
			y: 49,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1W1_to_routeW1',
	},
	{
		type: 'ON_STEP_PORTAL',
		x: 50,
		y: 25,
		portal: {
			mapId: 'routeS1',
			y: 25,
			x: 1,
			orientation: 'RIGHT',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeS1W1_to_routeS1',
	},
	{
		x: 2,
		y: 49,
		type: 'ITEM',
		item: 'armor-fossil',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_armor_fossil'),
		id: 'routeS1W1_armor_fossil',
	},
	{
		x: 1,
		y: 49,
		type: 'ITEM',
		item: 'skull-fossil',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_skull_fossil'),
		id: 'routeS1W1_skull_fossil',
	},
	{
		x: 49,
		y: 30,
		type: 'ITEM',
		item: 'belue-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_belue_berry'),
		id: 'routeS1W1_belue_berry',
	},
	{
		x: 49,
		y: 1,
		type: 'ITEM',
		item: 'razz-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_razz_berry'),
		id: 'routeS1W1_razz_berry',
	},
	{
		x: 6,
		y: 7,
		type: 'ITEM',
		item: 'rindo-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_rindo_berry'),
		id: 'routeS1W1_rindo_berry',
	},
	{
		x: 2,
		y: 39,
		type: 'ITEM',
		item: 'grepa-berry',
		amount: 5,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id == 'routeS1W1_grepa_berry'),
		id: 'routeS1W1_grepa_berry',
	},
	...sabrina,
	...travellingMerchantRouteS1W1,
	barryS1W1,
];
