import { OverworldMap } from '../../interfaces/OverworldMap';
import { camp } from '../maps/camp/camp';
import { campMarket } from '../maps/camp/campMarket';
import { campPokecenter } from '../maps/camp/campPokecenter';
import { campTent } from '../maps/camp/campTent';
import { campUniversity } from '../maps/camp/campUniversity';
import { sector1x0 } from '../maps/sectors/sector1x0';

export type MapId =
	| 'camp'
	| 'camp_market'
	| 'camp_pokecenter'
	| 'camp_university'
	| 'camp_tent'
	| 'sector1x0';

export const mapsRecord: Record<MapId, OverworldMap> = {
	camp: camp,
	camp_market: campMarket,
	camp_pokecenter: campPokecenter,
	camp_university: campUniversity,
	camp_tent: campTent,
	sector1x0: sector1x0,
};
