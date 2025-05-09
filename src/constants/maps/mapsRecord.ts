import { OverworldMap } from '../../interfaces/OverworldMap';
import { camp } from './camp';
import { caveW1 } from './caveW1';
import { challengeField } from './challengeField';
import { onixCave } from './onixCave';
import { routeE1 } from './routeE1';
import { routeN1 } from './routeN1';
import { routeN1E1 } from './routeN1E1';
import { routeN1W1 } from './routeN1W1';
import { routeS1 } from './routeS1';
import { routeS1E1 } from './routeS1E1';
import { routeS1W1 } from './routeS1W1';
import { routeW1 } from './routeW1';

export const mapIds = [
	'camp',
	'routeN1',
	'routeN1E1',
	'routeE1',
	'onixCave',
	'routeS1E1',
	'routeS1',
	'routeS1W1',
	'routeW1',
	'routeN1W1',
	'caveW1',
	'challengeField',
] as const;
export type MapId = (typeof mapIds)[number];

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
	onixCave: onixCave,
	caveW1: caveW1,
	challengeField: challengeField,
};

export const mapDisplayNames: Record<MapId, string> = {
	routeN1: 'akai meadow',
	routeN1E1: 'orenji forest',
	routeE1: 'kiiro highlands',
	routeS1E1: 'midori plains',
	routeS1: 'aoi lake',
	routeS1W1: 'kuro hills',
	routeW1: 'shiro cliffs',
	caveW1: 'shiro cave',
	routeN1W1: 'koniro plateau',
	camp: 'kuma camp',
	onixCave: 'onix cave',
	challengeField: 'challenge field',
};
