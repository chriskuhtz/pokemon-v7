export const campUpgradeNames = ['bulletin_board', 'basic_market'] as const;

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const campUpgradePrices: Record<CampUpgrade, number> = {
	basic_market: 10,
	bulletin_board: 0,
};
