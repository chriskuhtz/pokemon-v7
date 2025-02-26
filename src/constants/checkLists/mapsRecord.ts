import { OverworldMap } from '../../interfaces/OverworldMap';
import { camp } from '../maps/camp/camp';
import { campMarket } from '../maps/camp/campMarket';
import { campPokecenter } from '../maps/camp/campPokecenter';
import { campTent } from '../maps/camp/campTent';
import { campUniversity } from '../maps/camp/campUniversity';
import { sectorE1 } from '../maps/sectors/sectorE1';
import { sectorN1 } from '../maps/sectors/sectorN1';
import { sectorN1E1 } from '../maps/sectors/sectorN1E1';

export type MapId =
	| 'camp'
	| 'camp_market'
	| 'camp_pokecenter'
	| 'camp_university'
	| 'camp_tent'
	| 'sectorE1'
	| 'sectorN1'
	| 'sectorN1E1';

export const mapsRecord: Record<MapId, OverworldMap> = {
	camp: camp,
	camp_market: campMarket,
	camp_pokecenter: campPokecenter,
	camp_university: campUniversity,
	camp_tent: campTent,
	sectorE1: sectorE1,
	sectorN1: sectorN1,
	sectorN1E1: sectorN1E1,
};
