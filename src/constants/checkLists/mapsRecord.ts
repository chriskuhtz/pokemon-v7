import { OverworldMap } from '../../shared/OverworldMap';
import { testMap } from '../maps/test/testMap';

export type MapId = 'testMap';

export const mapsRecord: Record<MapId, OverworldMap> = {
	testMap: testMap,
};
