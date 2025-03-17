export const campUpgradeNames = [
	'bulletin_board',
	'market_1',
	'market_2',
	'market_3',
	'battle_item_market',
	'invite ghost expert morty',
	'invite professor rowan',
	'invite apricorn smith kurt',
	'access routeS1',
	'training field 1',
] as const;

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const campUpgradePrices: Record<CampUpgrade, number> = {
	market_1: 10,
	market_2: 50,
	market_3: 100,
	battle_item_market: 100,
	bulletin_board: 10,
	'invite ghost expert morty': 50,
	'invite professor rowan': 50,
	'invite apricorn smith kurt': 50,
	'access routeS1': 50,
	'training field 1': 50,
};
export const campUpgradeConditions: Record<CampUpgrade, CampUpgrade[]> = {
	bulletin_board: [],
	market_1: ['bulletin_board'],
	market_2: ['market_1'],
	market_3: ['market_1', 'market_2'],
	battle_item_market: ['market_1'],
	'invite ghost expert morty': ['bulletin_board'],
	'invite professor rowan': ['bulletin_board'],
	'invite apricorn smith kurt': ['bulletin_board'],
	'access routeS1': ['bulletin_board'],
	'training field 1': ['bulletin_board'],
};
