export const campUpgradeNames = [
	'bulletin_board',
	'invite ghost expert morty',
	'invite professor rowan',
	'invite professor elm',
	'invite apricorn smith kurt',
	'training field 1',
	'berry_farm',
	'second slot for farm',
	'third slot for farm',
	'fourth slot for farm',
	'build combee hive',
	'build miltank farm',
	'machete certification',
	'invite zigzagoon foragers',
	'invite dugtrio explorers',
	'invite fossil expert',
	'invite chef grandma',
	'pokemon swarm radar',
] as const;
/**
 * ideas:
 * more gym leaders
 * stronger training field
 * berry lure stations
 * 'Sledge hammer certification'
 * 'Shovel certification'
 * "Pokeflute certification"
 * 'Pokemon Surfer Certification'
 * 'Pokemon Flyer Certification'
 * 	Fishing?
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
	bulletin_board: 10,
	'invite ghost expert morty': 50,
	'invite professor rowan': 50,
	'invite professor elm': 50,
	'invite apricorn smith kurt': 50,
	'training field 1': 50,
	berry_farm: 50,
	'second slot for farm': 10,
	'third slot for farm': 15,
	'fourth slot for farm': 20,
	'build combee hive': 20,
	'build miltank farm': 50,
	'invite zigzagoon foragers': 50,
	'invite dugtrio explorers': 50,
	'machete certification': 50,
	'invite fossil expert': 50,
	'invite chef grandma': 50,
	'pokemon swarm radar': 50,
};
export const campUpgradeConditions: Record<CampUpgrade, CampUpgrade[]> = {
	bulletin_board: [],
	'invite ghost expert morty': ['bulletin_board'],
	'invite professor rowan': ['bulletin_board'],
	'invite professor elm': ['bulletin_board'],
	'invite apricorn smith kurt': ['bulletin_board'],
	'machete certification': ['bulletin_board'],
	'training field 1': ['bulletin_board'],
	berry_farm: ['bulletin_board'],
	'second slot for farm': ['berry_farm'],
	'third slot for farm': ['second slot for farm'],
	'fourth slot for farm': ['third slot for farm'],
	'build combee hive': ['bulletin_board'],
	'build miltank farm': ['bulletin_board', 'berry_farm'],
	'invite zigzagoon foragers': ['build miltank farm'],
	'invite dugtrio explorers': [
		'build miltank farm',
		'invite zigzagoon foragers',
	],
	'invite fossil expert': ['invite dugtrio explorers'],
	'invite chef grandma': ['berry_farm'],
	'pokemon swarm radar': ['bulletin_board'],
};
