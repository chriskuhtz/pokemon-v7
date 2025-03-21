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
	'training field 1',
	'second slot for farm',
	'third slot for farm',
	'fourth slot for farm',
	'build combee hive',
	'build miltank farm',
	'machete certification',
] as const;
/**
 * ideas
 * drilbur item digger
 * outbreak radio
 * fossil maniac
 * more gym leaders
 * stronger training field
 */

/**
 * Camp Economy:
 * Outside inputs: through quest Rewards, found items
 * Infinite: Produce Honey from Combee Hive
 * Infinite: Produce Repel from Oddish,Gloom,VilePlume repel manufacture
 * Infinite: Produce Mulch from Amoongus Composter
 *
 * Trade Honey for Random foraged items with zigzagoon forager
 * Plant Berries and Apricorns at Farm
 * Trade Berries for Moomoo Milk
 * Craft Balls from Apricorns
 * Trade Moomoo Milk for underground items from Dugtrio explorer
 *
 * Prevent Softlock: get more balls from oak
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
	'machete certification': 50,
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
	'machete certification': ['bulletin_board'],
	'training field 1': ['bulletin_board'],
	berry_farm: ['bulletin_board'],
	'second slot for farm': ['berry_farm'],
	'third slot for farm': ['second slot for farm'],
	'fourth slot for farm': ['third slot for farm'],
	'build combee hive': ['bulletin_board'],
	'build miltank farm': ['bulletin_board', 'berry_farm'],
};
