import {
	barryE1,
	barryN1,
	barryN1E1,
	barryS1,
	barryS1E1,
	barryS1W1,
	barryW1,
} from '../constants/gameData/maps/occupants/barry';
import {
	cynthiaE1,
	cynthiaN1,
	cynthiaN1E1,
	cynthiaS1,
	cynthiaS1E1,
	cynthiaS1W1,
	cynthiaW1,
} from '../constants/gameData/maps/occupants/cynthia';
import {
	hughE1,
	hughN1,
	hughN1E1,
	hughS1,
	hughS1E1,
	hughS1W1,
	hughW1,
} from '../constants/gameData/maps/occupants/hugh';
import {
	nE1,
	nN1,
	nN1E1,
	nS1,
	nS1E1,
	nS1W1,
	nW1,
} from '../constants/gameData/maps/occupants/n';
import {
	redE1,
	redN1,
	redN1E1,
	redS1,
	redS1E1,
	redS1W1,
	redW1,
} from '../constants/gameData/maps/occupants/red';
import {
	silverE1,
	silverN1,
	silverN1E1,
	silverS1,
	silverS1E1,
	silverS1W1,
	silverW1,
} from '../constants/gameData/maps/occupants/silver';
import { Occupant } from '../interfaces/OverworldMap';
import {
	travellingMerchantRouteE1,
	travellingMerchantRouteN1,
	travellingMerchantRouteN1E1,
	travellingMerchantRouteS1,
	travellingMerchantRouteS1E1,
	travellingMerchantRouteS1W1,
	travellingMerchantRouteW1,
} from '../modules/TravellingMerchant/TravellingMerchant';
import { getEntryWithOverflow } from './filterTargets';

/**
 *
 * barry
 * red
 * cynthia
 * silver
 * n
 * hugh
 * merchant
 */

const mapIndexes = {
	routeN1: 0,
	routeN1E1: 1,
	routeE1: 2,
	routeS1E1: 3,
	routeS1: 4,
	routeS1W1: 5,
	routeW1: 6,
};

export const getTraveller = (
	mapId:
		| 'routeN1'
		| 'routeN1E1'
		| 'routeE1'
		| 'routeS1E1'
		| 'routeS1'
		| 'routeS1W1'
		| 'routeW1'
): Occupant[] => {
	const dayIndex = new Date().getDay();

	const mapIndex = mapIndexes[mapId];

	const options = [
		//routeN1
		[
			[barryN1],
			[redN1],
			[cynthiaN1],
			[silverN1],
			[nN1],
			[hughN1],
			travellingMerchantRouteN1,
		],
		//routeN1E1
		[
			[barryN1E1],
			[redN1E1],
			[cynthiaN1E1],
			[silverN1E1],
			[nN1E1],
			[hughN1E1],
			travellingMerchantRouteN1E1,
		],
		//routeE1
		[
			[barryE1],
			[redE1],
			[cynthiaE1],
			[silverE1],
			[nE1],
			[hughE1],
			travellingMerchantRouteE1,
		],
		//routeS1E1
		[
			[barryS1E1],
			[redS1E1],
			[cynthiaS1E1],
			[silverS1E1],
			[nS1E1],
			[hughS1E1],
			travellingMerchantRouteS1E1,
		],
		//routeS1
		[
			[barryS1],
			[redS1],
			[cynthiaS1],
			[silverS1],
			[nS1],
			[hughS1],
			travellingMerchantRouteS1,
		],
		//routeS1W1
		[
			[barryS1W1],
			[redS1W1],
			[cynthiaS1W1],
			[silverS1W1],
			[nS1W1],
			[hughS1W1],
			travellingMerchantRouteS1W1,
		],
		//routeW1
		[
			[barryW1],
			[redW1],
			[cynthiaW1],
			[silverW1],
			[nW1],
			[hughW1],
			travellingMerchantRouteW1,
		],
	];

	const devmode = !!window.localStorage.getItem('devmode');
	if (devmode) {
		return options[mapIndex].flat();
	}

	return getEntryWithOverflow<Occupant[]>(
		options[mapIndex],
		dayIndex + mapIndex
	);
};
