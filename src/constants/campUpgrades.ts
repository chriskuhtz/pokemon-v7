export const campUpgradeNames = ['basic_market'] as const;

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const campUpgradePrices: Record<CampUpgrade, number> = {
	basic_market: 10,
};
