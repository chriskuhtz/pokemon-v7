export const campUpgradeNames = [
	'bulletin_board',
	'market_1',
	'market_2',
	'market_3',
	'battle_item_market',
	'berry_farm',
	'invite ghost expert morty',
	'invite professor rowan',
	'invite apricorn smith kurt',
	'access routeN1E1',
	'access routeE1',
	'access routeS1E1',
	'access routeS1',
	'access routeS1W1',
	'access routeW1',
	'access routeN1W1',
	'training field 1',
	'second slot for farm',
	'third slot for farm',
	'fourth slot for farm',
	'build combee hive',
	'build miltank farm',
] as const;
/**
 * ideas
 * drilbur item digger
 * outbreak radio
 * fossil maniac
 * more gym leaders
 * stronger training field
 */

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
	'training field 1': 50,
	berry_farm: 50,
	'second slot for farm': 10,
	'third slot for farm': 15,
	'fourth slot for farm': 20,
	'build combee hive': 20,
	'build miltank farm': 50,
	'access routeN1E1': 50,
	'access routeE1': -1, //75,
	'access routeS1E1': -1, //100,
	'access routeS1': -1, //125,
	'access routeS1W1': -1, //150,
	'access routeW1': -1, //175,
	'access routeN1W1': -1, //200,
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
	'access routeN1E1': ['bulletin_board'],
	'access routeE1': ['bulletin_board', 'access routeN1E1'],
	'access routeS1E1': ['bulletin_board', 'access routeE1'],
	'access routeS1': ['bulletin_board', 'access routeS1E1'],
	'access routeS1W1': ['bulletin_board', 'access routeS1'],
	'access routeW1': ['bulletin_board', 'access routeS1W1'],
	'access routeN1W1': ['bulletin_board', 'access routeW1'],
	'training field 1': ['bulletin_board'],
	berry_farm: ['bulletin_board'],
	'second slot for farm': ['berry_farm'],
	'third slot for farm': ['second slot for farm'],
	'fourth slot for farm': ['third slot for farm'],
	'build combee hive': ['bulletin_board'],
	'build miltank farm': ['bulletin_board', 'berry_farm'],
};
