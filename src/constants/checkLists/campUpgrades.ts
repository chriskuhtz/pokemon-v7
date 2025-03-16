export const campUpgradeNames = [
	'bulletin_board',
	'market_1',
	'market_2',
	'market_3',
] as const;

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const campUpgradePrices: Record<CampUpgrade, number> = {
	market_1: 10,
	market_2: 30,
	market_3: 90,
	bulletin_board: 0,
};
export const campUpgradeConditions: Record<CampUpgrade, CampUpgrade[]> = {
	market_1: [],
	market_2: ['market_1'],
	market_3: ['market_1', 'market_2'],
	bulletin_board: [],
};
