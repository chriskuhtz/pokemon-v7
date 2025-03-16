export const campUpgradeNames = [
	'bulletin_board',
	'market_1',
	'market_2',
	'market_3',
	'invite ghost expert morty',
	'invite professor rowan',
	'invite apricorn smith kurt',
] as const;

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const campUpgradePrices: Record<CampUpgrade, number> = {
	market_1: 10,
	market_2: 30,
	market_3: 90,
	bulletin_board: 0,
	'invite ghost expert morty': 100,
	'invite professor rowan': 100,
	'invite apricorn smith kurt': 50,
};
export const campUpgradeConditions: Record<CampUpgrade, CampUpgrade[]> = {
	market_1: [],
	market_2: ['market_1'],
	market_3: ['market_1', 'market_2'],
	bulletin_board: [],
	'invite ghost expert morty': ['bulletin_board'],
	'invite professor rowan': ['bulletin_board'],
	'invite apricorn smith kurt': ['bulletin_board'],
};
