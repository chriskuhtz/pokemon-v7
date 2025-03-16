export const campUpgradeNames = [
	'bulletin_board',
	'market_1',
	'market_2',
	'market_3',
	'morty',
	'rowan',
	'kurt',
] as const;

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const campUpgradePrices: Record<CampUpgrade, number> = {
	market_1: 10,
	market_2: 30,
	market_3: 90,
	bulletin_board: 0,
	morty: 100,
	rowan: 100,
	kurt: 50,
};
export const campUpgradeConditions: Record<CampUpgrade, CampUpgrade[]> = {
	market_1: [],
	market_2: ['market_1'],
	market_3: ['market_1', 'market_2'],
	bulletin_board: [],
	morty: ['bulletin_board'],
	rowan: ['bulletin_board'],
	kurt: ['bulletin_board'],
};
