import { OverworldMap } from '../../interfaces/OverworldMap';
import { camp } from './camp';
import { routeN1 } from './routeN1';

export type MapId = 'camp' | 'routeN1';

export const mapsRecord: Record<MapId, OverworldMap> = {
	camp: camp,
	routeN1: routeN1,
};
