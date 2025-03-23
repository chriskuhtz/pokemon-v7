export const campUpgradeNames = [
	'bulletin_board',
	'berry_farm',
	'invite apricorn smith kurt',
	'invite ghost expert morty',
	'invite professor rowan',
	'invite professor elm',
	'training field 1',
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
	'sledge hammer certification',
	'invite museum curator',
] as const;
/**
 * ideas:
 * berries visible in overworld
 * more gym leaders
 * stronger training field
 * berry lure stations
 * mulch production
 * repel production
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

 * Prevent Softlock: get more balls from oak
 */

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const campUpgradePrices: Record<CampUpgrade, number> = {
	bulletin_board: 10,
	berry_farm: 25,
	'invite apricorn smith kurt': 25,
	'invite ghost expert morty': 50,
	'invite professor rowan': 50,
	'invite professor elm': 50,
	'training field 1': 50,
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
	'sledge hammer certification': 50,
	'invite museum curator': 50,
};

export const baseRequirements: CampUpgrade[] = [
	'bulletin_board',
	'berry_farm',
	'invite apricorn smith kurt',
];
export const campUpgradeConditions: Record<CampUpgrade, CampUpgrade[]> = {
	bulletin_board: [],
	berry_farm: ['bulletin_board'],
	'invite apricorn smith kurt': ['bulletin_board', 'berry_farm'],
	'invite ghost expert morty': baseRequirements,
	'invite professor rowan': baseRequirements,
	'invite professor elm': baseRequirements,
	'machete certification': baseRequirements,
	'training field 1': baseRequirements,
	'build combee hive': baseRequirements,
	'build miltank farm': baseRequirements,
	'invite chef grandma': baseRequirements,
	'pokemon swarm radar': baseRequirements,
	'second slot for farm': [...baseRequirements, 'berry_farm'],
	'third slot for farm': [...baseRequirements, 'second slot for farm'],
	'fourth slot for farm': [...baseRequirements, 'third slot for farm'],
	'invite zigzagoon foragers': ['build miltank farm'],
	'invite dugtrio explorers': [
		'build miltank farm',
		'invite zigzagoon foragers',
	],
	'invite fossil expert': ['invite dugtrio explorers'],
	'sledge hammer certification': ['machete certification'],
	'invite museum curator': ['invite dugtrio explorers'],
};
