import { OverworldMap } from '../../../interfaces/OverworldMap';

export const campMarket: OverworldMap = {
	id: 'camp_market',
	backgroundTile: '/tiles/blueTiles.png',
	possibleEncounters: { MORNING: [], DAY: [], EVENING: [], NIGHT: [] },
	width: 5,
	height: 4,
	tileMap: [
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	],
	occupants: [
		//merchants
		'merchant_Market_Camp',
		//portals
		'market_to_camp',
	],
};
