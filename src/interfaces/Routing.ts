export const mapMakerRoutes = [
	'MAP_MAKER_camp',
	'MAP_MAKER_routeN1',
	'MAP_MAKER_routeN1E1',
	'MAP_MAKER_routeE1',
	'MAP_MAKER_routeS1E1',
	'MAP_MAKER_routeS1',
	'MAP_MAKER_routeS1W1',
	'MAP_MAKER_routeW1',
	'MAP_MAKER_routeN1W1',
];

export const routes = [
	'OVERWORLD',
	'MAIN',
	'BAG',
	'TEAM',
	'BATTLE',
	'MARKET',
	'BUY_MARKET',
	'SELL_MARKET',
	'STORAGE',
	'STARTER_SELECTION',
	'SPRITE_SELECTION',
	'SETTINGS',
	'QUESTS',
	'FARM',
	'FOSSIL_REVIVER',
	'CAMP_UPGRADES',
	'BULLETIN_BOARD',
	'APRICORN_SMITHY',
	'TRAINING_FIELD',
	'MILTANK_FARM',
	'CHEF_GRANDMA',
	'CURATOR',
	...mapMakerRoutes,
] as const;
export type RoutesType = (typeof routes)[number];
