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
] as const;
export type RoutesType = (typeof routes)[number];
