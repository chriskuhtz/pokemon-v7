import { OverworldMap } from '../../interfaces/OverworldMap';
import { marketMeadow } from '../maps/meadow/marketMeadow';
import { meadow } from '../maps/meadow/meadow';
import {
	pokecenterMeadow,
	universityMeadow,
} from '../maps/meadow/pokecenterMeadow';

export type MapId =
	| 'meadow'
	| 'market_meadow'
	| 'pokecenter_meadow'
	| 'university_meadow';

export const mapsRecord: Record<MapId, OverworldMap> = {
	meadow: meadow,
	market_meadow: marketMeadow,
	pokecenter_meadow: pokecenterMeadow,
	university_meadow: universityMeadow,
};
