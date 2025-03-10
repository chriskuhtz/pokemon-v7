import { OverworldMap } from '../../interfaces/OverworldMap';
import { testMap } from '../maps/test/testMap';

export type MapId = 'testMap';

export const mapsRecord: Record<MapId, OverworldMap> = {
	testMap: testMap,
};
