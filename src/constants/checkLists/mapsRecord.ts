import { OverworldMap } from '../../interfaces/OverworldMap';
import { MapId } from '../../interfaces/SaveFile';
import { market } from '../maps/market';
import { meadow } from '../maps/meadow';

export const mapsRecord: Record<MapId, OverworldMap> = {
	meadow: meadow,
	market: market,
};
