import { OverworldMap } from '../../interfaces/OverworldMap';
import { camp } from './camp';
import { routeE1 } from './routeE1';
import { routeN1 } from './routeN1';
import { routeN1E1 } from './routeN1E1';
import { routeN1W1 } from './routeN1W1';
import { routeS1 } from './routeS1';
import { routeS1E1 } from './routeS1E1';
import { routeS1W1 } from './routeS1W1';
import { routeW1 } from './routeW1';

export type MapId =
	| 'camp'
	| 'routeN1'
	| 'routeN1E1'
	| 'routeE1'
	| 'routeS1E1'
	| 'routeS1'
	| 'routeS1W1'
	| 'routeW1'
	| 'routeN1W1';

export const mapsRecord: Record<MapId, OverworldMap> = {
	camp: camp,
	routeN1: routeN1,
	routeN1E1: routeN1E1,
	routeE1: routeE1,
	routeS1E1: routeS1E1,
	routeS1: routeS1,
	routeS1W1: routeS1W1,
	routeW1: routeW1,
	routeN1W1: routeN1W1,
};
