export const campUpgradeNames = [
	'bulletin_board',
	'berry_farm',
	'invite apricorn smith kurt',
	'create seed vault',
	'second slot for farm',
	'third slot for farm',
	'fourth slot for farm',
	'bag size upgrade 1',
	'bag size upgrade 2',
	'bag size upgrade 3',
	'invite ghost expert morty',
	'invite flying pokemon expert falkner',
	'invite professor rowan',
	'invite professor elm',
	'training field 1',
	'training field 2',
	'training field 3',
	'build combee hive',
	'build miltank farm',
	'machete certification',
	'invite zigzagoon foragers',
	'invite dugtrio explorers',
	'invite amoongus compost researcher',
	'invite vileplume scent researcher',
	'invite fossil expert',
	'invite chef grandma',
	'pokemon swarm radar',
	'sledge hammer certification',
	'shovel certification',
	'invite museum curator',
	'berry lure station routeN1',
	'berry lure station routeN1E1',
] as const;
/**
 * ideas:
 * more cookable items
 * way to cross the river
 * berry lures on other routes(E1,S1E1)
 * other gym leaders
 * fossil guy should be roark
 * shovel spots
 * 'Pokemon Surfer Certification'
 * 'Pokemon Flyer Certification' : requires new route first
 * 	Fishing?
 * more vileplume products
 * training field challenge mode
 * team rocket
 * blissey trainer
 */

export type CampUpgrade = (typeof campUpgradeNames)[number];

export const baseRequirements: CampUpgrade[] = [
	'bulletin_board',
	'berry_farm',
	'invite apricorn smith kurt',
];
export const campUpgradeConditions: Record<CampUpgrade, CampUpgrade[]> = {
	bulletin_board: [],
	berry_farm: ['bulletin_board'],
	'create seed vault': ['bulletin_board', 'berry_farm'],
	'invite apricorn smith kurt': ['bulletin_board', 'berry_farm'],
	'invite ghost expert morty': ['machete certification'],
	'invite flying pokemon expert falkner': ['machete certification'],
	'invite professor rowan': baseRequirements,
	'invite professor elm': baseRequirements,
	'machete certification': baseRequirements,
	'training field 1': baseRequirements,
	'training field 2': ['training field 1'],
	'training field 3': ['training field 2'],
	'build combee hive': baseRequirements,
	'build miltank farm': baseRequirements,
	'invite chef grandma': baseRequirements,
	'pokemon swarm radar': baseRequirements,
	'second slot for farm': baseRequirements,
	'third slot for farm': ['second slot for farm'],
	'fourth slot for farm': ['third slot for farm'],
	'invite zigzagoon foragers': baseRequirements,
	'invite dugtrio explorers': ['invite zigzagoon foragers'],
	'invite amoongus compost researcher': baseRequirements,
	'invite vileplume scent researcher': baseRequirements,
	'invite fossil expert': ['invite dugtrio explorers'],
	'sledge hammer certification': ['machete certification'],
	'shovel certification': ['sledge hammer certification'],
	'invite museum curator': ['invite dugtrio explorers'],
	'bag size upgrade 1': baseRequirements,
	'bag size upgrade 2': [...baseRequirements, 'bag size upgrade 1'],
	'bag size upgrade 3': [...baseRequirements, 'bag size upgrade 2'],
	'berry lure station routeN1': baseRequirements,
	'berry lure station routeN1E1': [
		...baseRequirements,
		'machete certification',
	],
};
export const campUpgradeExplanations: Record<CampUpgrade, string> = {
	bulletin_board: 'A place for people to post quests',
	berry_farm: 'Berries and Apricorns are our main resources',
	'invite apricorn smith kurt': 'Pokeballs can be made from apricorns',
	'invite ghost expert morty':
		'The Gym Leader from Ecruteak studies ghost pokemon',
	'invite flying pokemon expert falkner':
		'The Gym Leader from Violet city studies flying pokemon',
	'invite professor rowan':
		'professor rowan collects pokemon from all over the world',
	'invite professor elm': 'professor elm studies pokemon evolution',
	'machete certification': 'Safety Training for bush cutting',
	'training field 1': 'Train your Pokemon against other trainers',
	'training field 2': 'Invite Stronger Trainers (Lvl 15)',
	'training field 3': 'Invite Even Stronger Trainers (Lvl 25)',
	'build combee hive': 'Gathering our own honey would be useful',
	'build miltank farm': 'All Pokemon like to drink miltank milk',
	'invite chef grandma': 'Raw Ingredients can be improved through cooking',
	'pokemon swarm radar': 'Detects Pokemon that migrate in swarms',
	'second slot for farm': 'more space at the berry farm',
	'third slot for farm': 'more space at the berry farm',
	'fourth slot for farm': 'more space at the berry farm',
	'invite zigzagoon foragers': 'zigzagoon can find berries and other items',
	'invite dugtrio explorers': 'dugtrio can find rare items underground',
	'invite amoongus compost researcher': 'amoongus can produce mulch',
	'invite vileplume scent researcher':
		'vileplume can produce repel and other scent based items',
	'invite fossil expert': 'maybe we can revive fossilized pokemon',
	'sledge hammer certification': 'Safety Training for rock smashing',
	'shovel certification': 'Safety Training for digging into ledges',
	'invite museum curator': 'Some items we find might be valuable',
	'create seed vault': 'Safely stores seeds so we never run out',
	'bag size upgrade 1': 'More space in your field bag',
	'bag size upgrade 2': 'More space in your field bag',
	'bag size upgrade 3': 'More space in your field bag',
	'berry lure station routeN1': 'Place berries inside to attract pokemon',
	'berry lure station routeN1E1': 'Place berries inside to attract pokemon',
};
