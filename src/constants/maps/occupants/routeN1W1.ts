import { OverworldMap } from '../../../interfaces/OverworldMap';
import { travellingMerchantRouteN1W1 } from '../../../modules/TravellingMerchant/TravellingMerchant';
import { barryN1W1 } from './barry';
import { champChris } from './champChris';
import { cynthiaN1W1 } from './cynthia';
import { nN1W1 } from './n';
import { silverN1W1 } from './silver';

export const routeN1W1Occupants: OverworldMap['occupants'] = [
	{
		type: 'ON_STEP_PORTAL',
		x: 25,
		y: 50,
		portal: {
			mapId: 'routeW1',
			x: 25,
			y: 1,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
		id: 'routeN1W1_to_routeW1',
	},
	{
		type: 'ITEM',
		x: 17,
		y: 47,
		item: 'old-amber',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'old-amber-routeN1W1'),
		id: 'old-amber',
	},
	{
		type: 'ITEM',
		x: 43,
		y: 30,
		item: 'never-melt-ice',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'nevermeltice-routeN1W1'),
		id: 'nevermeltice-routeN1W1',
	},
	{
		type: 'ITEM',
		x: 28,
		y: 46,
		item: 'damp-rock',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'damp-rock-routeN1W1'),
		id: 'damp-rock-routeN1W1',
	},
	{
		type: 'ITEM',
		x: 10,
		y: 10,
		item: 'ice-stone',
		amount: 1,
		conditionFunction: (s) =>
			!s.handledOccupants.some((h) => h.id === 'ice-stone-routeN1W1'),
		id: 'ice-stone-routeN1W1',
	},
	champChris,
	...travellingMerchantRouteN1W1,
	barryN1W1,
	silverN1W1,
	cynthiaN1W1,
	nN1W1,
];
