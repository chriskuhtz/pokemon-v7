export const campUpgradeNames = [
	'bulletin_board',
	'berry_farm',
	'invite apricorn smith kurt',
	'create seed vault',
	'second slot for farm',
	'third slot for farm',
	'fourth slot for farm',
	'fifth slot for farm',
	'sixth slot for farm',
	'seventh slot for farm',
	'bag size upgrade 1',
	'bag size upgrade 2',
	'bag size upgrade 3',
	'invite move tutor',
	'invite ghost expert morty',
	'invite fighting expert chuck',
	'invite flying pokemon expert falkner',
	'invite professor rowan',
	'invite professor elm',
	'invite pikachu fan',
	'training field 1',
	'training field 2',
	'training field 3',
	'training field 4',
	'training field 5',
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
	'swimming certification',
	'invite museum curator',
	'berry lure station routeN1',
	'berry lure station routeN1E1',
	'berry lure station routeE1',
	'berry lure station routeS1E1',
	'berry lure station routeS1W1',
	'buy skiing equipment',
	'invite historian',
	'ranger certification',
	'dragonite taxi',
] as const;

export type CampUpgrade = (typeof campUpgradeNames)[number];

export type CampUpgradeCategory =
	| 'Sustainability'
	| 'Exploration'
	| 'Research'
	| 'Training';

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
	'invite move tutor': baseRequirements,
	'invite ghost expert morty': ['machete certification'],
	'invite fighting expert chuck': ['machete certification'],
	'invite flying pokemon expert falkner': ['machete certification'],
	'invite professor rowan': baseRequirements,
	'invite professor elm': baseRequirements,
	'invite pikachu fan': baseRequirements,
	'machete certification': baseRequirements,
	'training field 1': baseRequirements,
	'training field 2': ['training field 1'],
	'training field 3': ['training field 2'],
	'training field 4': ['training field 3'],
	'training field 5': ['training field 4'],
	'build combee hive': baseRequirements,
	'build miltank farm': baseRequirements,
	'invite chef grandma': baseRequirements,
	'pokemon swarm radar': baseRequirements,
	'second slot for farm': baseRequirements,
	'third slot for farm': ['second slot for farm'],
	'fourth slot for farm': ['third slot for farm'],
	'fifth slot for farm': ['fourth slot for farm'],
	'sixth slot for farm': ['sixth slot for farm'],
	'seventh slot for farm': ['seventh slot for farm'],
	'invite zigzagoon foragers': baseRequirements,
	'invite dugtrio explorers': ['build combee hive'],
	'invite amoongus compost researcher': baseRequirements,
	'invite vileplume scent researcher': baseRequirements,
	'invite fossil expert': ['invite dugtrio explorers'],
	'sledge hammer certification': ['machete certification'],
	'ranger certification': ['machete certification', 'training field 1'],
	'shovel certification': ['sledge hammer certification'],
	'swimming certification': ['shovel certification'],
	'buy skiing equipment': ['swimming certification'],
	'invite museum curator': ['invite dugtrio explorers'],
	'invite historian': ['invite dugtrio explorers'],
	'bag size upgrade 1': baseRequirements,
	'bag size upgrade 2': [...baseRequirements, 'bag size upgrade 1'],
	'bag size upgrade 3': [...baseRequirements, 'bag size upgrade 2'],
	'berry lure station routeN1': baseRequirements,
	'berry lure station routeN1E1': ['machete certification'],
	'berry lure station routeE1': ['shovel certification'],
	'berry lure station routeS1E1': ['swimming certification'],
	'berry lure station routeS1W1': ['swimming certification'],
	//the last upgrade
	'dragonite taxi': campUpgradeNames.filter(
		(name) => name !== 'dragonite taxi'
	),
};
export const campUpgradeCategories: Record<CampUpgrade, CampUpgradeCategory> = {
	bulletin_board: 'Research',
	berry_farm: 'Sustainability',
	'create seed vault': 'Sustainability',
	'invite apricorn smith kurt': 'Sustainability',
	'build combee hive': 'Sustainability',
	'build miltank farm': 'Sustainability',
	'invite chef grandma': 'Sustainability',
	'second slot for farm': 'Sustainability',
	'third slot for farm': 'Sustainability',
	'fourth slot for farm': 'Sustainability',
	'fifth slot for farm': 'Sustainability',
	'sixth slot for farm': 'Sustainability',
	'seventh slot for farm': 'Sustainability',
	'invite zigzagoon foragers': 'Sustainability',
	'invite dugtrio explorers': 'Sustainability',
	'invite amoongus compost researcher': 'Sustainability',
	'invite vileplume scent researcher': 'Sustainability',
	'invite museum curator': 'Sustainability',
	'invite ghost expert morty': 'Research',
	'invite fighting expert chuck': 'Research',
	'invite flying pokemon expert falkner': 'Research',
	'invite professor rowan': 'Research',
	'invite professor elm': 'Research',
	'invite pikachu fan': 'Research',
	'pokemon swarm radar': 'Research',
	'invite fossil expert': 'Research',
	'berry lure station routeN1': 'Research',
	'berry lure station routeN1E1': 'Research',
	'berry lure station routeE1': 'Research',
	'berry lure station routeS1E1': 'Research',
	'berry lure station routeS1W1': 'Research',
	'invite historian': 'Research',
	'invite move tutor': 'Training',
	'training field 1': 'Training',
	'training field 2': 'Training',
	'training field 3': 'Training',
	'training field 4': 'Training',
	'training field 5': 'Training',
	'ranger certification': 'Training',
	'machete certification': 'Exploration',
	'sledge hammer certification': 'Exploration',
	'shovel certification': 'Exploration',
	'swimming certification': 'Exploration',
	'buy skiing equipment': 'Exploration',
	'bag size upgrade 1': 'Exploration',
	'bag size upgrade 2': 'Exploration',
	'bag size upgrade 3': 'Exploration',
	'dragonite taxi': 'Exploration',
};

export const campUpgradeExplanations: Record<CampUpgrade, string> = {
	bulletin_board: 'A place for people to post quests',
	berry_farm: 'Berries and Apricorns are our main resources',
	'invite apricorn smith kurt': 'Pokeballs can be made from apricorns',
	'invite move tutor': 'Teaches your Pokemon new moves',
	'invite ghost expert morty':
		'The Gym Leader from Ecruteak studies ghost pokemon',
	'invite fighting expert chuck':
		'The Gym Leader from Cianwood loves to battle',
	'invite flying pokemon expert falkner':
		'The Gym Leader from Violet city studies flying pokemon',
	'invite professor rowan':
		'professor rowan collects pokemon from all over the world',
	'invite professor elm': 'professor elm studies pokemon evolution',
	'invite pikachu fan': 'Tell me, are you a fan of the pikachu',
	'machete certification': 'Safety Training for bush cutting',
	'ranger certification':
		'Pokemon Rangers keep the land safe from poachers like team rocket',
	'training field 1': 'Train your Pokemon against other trainers',
	'training field 2': 'Invite Stronger Trainers (Lvl 20)',
	'training field 3': 'Invite Even Stronger Trainers (Lvl 30)',
	'training field 4': 'Invite Even Stronger Trainers (Lvl 40)',
	'training field 5': 'Invite Even Stronger Trainers (Lvl 50)',
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
	'swimming certification':
		'The Research center is not responsible if you drown',
	'buy skiing equipment':
		'Unfortunately, all research assistants must provide their own skiing equipment',
	'invite museum curator': 'Some items we find might be valuable',
	'create seed vault': 'Safely stores seeds so we never run out',
	'bag size upgrade 1': 'More space in your field bag',
	'bag size upgrade 2': 'More space in your field bag',
	'bag size upgrade 3': 'More space in your field bag',
	'berry lure station routeN1': 'Place berries inside to attract pokemon',
	'berry lure station routeN1E1': 'Place berries inside to attract pokemon',
	'berry lure station routeE1': 'Place berries inside to attract pokemon',
	'berry lure station routeS1E1': 'Place berries inside to attract pokemon',
	'berry lure station routeS1W1': 'Place berries inside to attract pokemon',
	'fifth slot for farm': 'more space at the berry farm',
	'sixth slot for farm': 'more space at the berry farm',
	'seventh slot for farm': 'more space at the berry farm',
	'invite historian': 'It might not all be true, but it sounds interesting',
	'dragonite taxi': 'dragonite can fly you to remote places',
};

export const campUpgradeCostScale = 5;
