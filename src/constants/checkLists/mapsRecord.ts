import { OverworldMap } from '../../interfaces/OverworldMap';
import { camp, sector1x0 } from '../maps/camp/camp';
import { marketMeadow } from '../maps/camp/marketMeadow';
import { pokecenterMeadow } from '../maps/camp/pokecenterMeadow';
import { trailerMeadow } from '../maps/camp/trailerMeadow';
import { universityMeadow } from '../maps/camp/universityMeadow';

export type MapId =
	| 'camp'
	| 'market_meadow'
	| 'pokecenter_meadow'
	| 'university_meadow'
	| 'trailer_meadow'
	| 'sector1x0';

export const mapsRecord: Record<MapId, OverworldMap> = {
	camp: camp,
	market_meadow: marketMeadow,
	pokecenter_meadow: pokecenterMeadow,
	university_meadow: universityMeadow,
	trailer_meadow: trailerMeadow,
	sector1x0: sector1x0,
};
