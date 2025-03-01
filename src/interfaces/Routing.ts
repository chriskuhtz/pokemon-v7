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
	'MAP_MAKER',
] as const;
export type RoutesType = (typeof routes)[number];
