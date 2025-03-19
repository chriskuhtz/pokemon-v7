import { OverworldMap } from '../../interfaces/OverworldMap';
import { camp } from './camp';
import { routeN1 } from './routeN1';
import { routeN1E1 } from './routeN1E1';
import { routeS1 } from './routeS1';

export type MapId = 'camp' | 'routeN1' | 'routeS1' | 'routeN1E1';

export const mapsRecord: Record<MapId, OverworldMap> = {
	camp: camp,
	routeN1: routeN1,
	routeS1: routeS1,
	routeN1E1: routeN1E1,
};
