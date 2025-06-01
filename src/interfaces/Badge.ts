export const badgeNames = [
	'Boulder_Badge',
	'Cascade_Badge',
	'Earth_Badge',
	'Fog_Badge',
	'Glacier_Badge',
	'Hive_Badge',
	'Marsh_Badge',
	'Mineral_Badge',
	'Plain_Badge',
	'Rainbow_Badge',
	'Rising_Badge',
	'Soul_Badge',
	'Storm_Badge',
	'Thunder_Badge',
	'Volcano_Badge',
	'Zephyr_Badge',
] as const;
export type BadgeName = (typeof badgeNames)[number];
