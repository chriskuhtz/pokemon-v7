import { defaultShaderMap } from '../../functions/getTimeOfDay';
import { OverworldMap } from '../../interfaces/OverworldMap';
import { challengeFieldId, randomFieldId } from '../gameData';
import { camp } from './camp';
import { campCave } from './campCave';
import { campLaboratory } from './campLaboratory';
import { caveW1 } from './caveW1';
import { caveW1F1 } from './caveW1F1';
import { caveW1F2 } from './caveW1F2';
import { challengeField } from './challengeField';
import { onixCave } from './onixCave';
import { pokemonLeague } from './pokemonLeague';
import { randomChallengeField } from './randomChallengeField';
import { rocketCamp } from './rocketCamp';
import { routeE1 } from './routeE1';
import { routeN1 } from './routeN1';
import { routeN1E1 } from './routeN1E1';
import { routeN1W1 } from './routeN1W1';
import { routeS1 } from './routeS1';
import { routeS1E1 } from './routeS1E1';
import { routeS1W1 } from './routeS1W1';
import { routeW1 } from './routeW1';
import { victoryRoad } from './victoryRoad';

export const mapIds = [
	'camp',
	'campCave',
	'campLaboratory',
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
	'caveW1F1',
	'caveW1F2',
	challengeFieldId,
	randomFieldId,
	'rocketCamp',
	'victoryRoad',
	'pokemonLeague',
] as const;
export type MapId = (typeof mapIds)[number];

export const mapsRecord: Record<MapId, OverworldMap> = {
	camp: camp,
	campCave: campCave,
	campLaboratory: campLaboratory,
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
	caveW1F1: caveW1F1,
	caveW1F2: caveW1F2,
	challengeField: challengeField,
	rocketCamp: rocketCamp,
	randomField: randomChallengeField,
	victoryRoad: victoryRoad,
	pokemonLeague: pokemonLeague,
};

export const mapDisplayNames: Record<MapId, string> = {
	routeN1: 'akai meadow',
	routeN1E1: 'orenji forest',
	routeE1: 'kiiro highlands',
	routeS1E1: 'midori plains',
	routeS1: 'aoi lake',
	routeS1W1: 'kuro hills',
	routeW1: 'shiro cliffs',
	caveW1: 'shiro cave G',
	caveW1F1: 'shiro cave F1',
	caveW1F2: 'shiro cave F2',
	routeN1W1: 'koniro plateau',
	camp: 'kuma camp',
	campCave: 'kuma cave',
	campLaboratory: 'kuma laboratory',
	onixCave: 'onix cave',
	challengeField: 'challenge field',
	randomField: 'challenge field',
	rocketCamp: 'Rocket Camp',
	victoryRoad: 'Victory Road',
	pokemonLeague: 'Pokemon League',
};

export const Emptymap: OverworldMap = {
	area: 'OPEN',
	id: 'camp',
	occupants: [],
	timeOfDayShadersMap: defaultShaderMap,
	tilesetUrl: '/tilesets/palletTown.png',
	tileMap: {
		baseLayer: [[]],
		waterLayer: [[]],
		foregroundLayer: [[]],
		encounterLayer: [[]],
		obstacleLayer: [[]],
		decorationLayer: [[]],
	},
};
