import { OverworldMap } from '../../interfaces/OverworldMap';
import { marketMeadow } from '../maps/meadow/marketMeadow';
import { meadow } from '../maps/meadow/meadow';
import { pokecenterMeadow } from '../maps/meadow/pokecenterMeadow';
import { universityMeadow } from '../maps/meadow/universityMeadow';

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
