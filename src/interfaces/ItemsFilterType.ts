export const itemfilterNames = [
	'poke-balls',
	'repel+escape',
	'healing',
	'berries',
	'apricorns',
	'mulch',
	'ingredient',
	'cooked',
	'evolution',
	'fossil',
	'exp',
	'held item',
	'key',
	'other',
] as const;
export type ItemsFilterType = (typeof itemfilterNames)[number];
