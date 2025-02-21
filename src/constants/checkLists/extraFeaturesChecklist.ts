export const extraFeatureCheckList: {
	name: string;
	todos?: string[];
	handled?: boolean;
}[] = [
	{ name: 'PC storage system', handled: true },
	{
		name: 'PC access only from overworld',
		handled: true,
	},
	{
		name: 'Market access only from overworld',
		handled: true,
	},
	{
		name: 'defined encounters per route',
		handled: true,
	},
	{ name: 'extract battleStep hooks', handled: true },
	{ name: 'define nextSteps in battleStep type', handled: true },
	{ name: 'extract banners', handled: true },
	{ name: 'extract battleAction Sections', handled: true },
	{
		name: 'nurse',
		handled: true,
	},
	{ name: 'starter selection and name', handled: true },
	{
		name: 'randomized starter setting',
		handled: true,
	},
	{ name: 'badges', handled: true },
	{ name: '"catch these pokemon" quests', handled: true },
	{ name: 'hidden items', handled: true },
	{ name: 'team reordering', handled: true },
	{ name: 'grass on encounter tiles', handled: true },
	{ name: 'toast types', handled: true },
	{ name: 'pc storage filters', handled: true },
	{ name: 'full keyboard control', handled: true },
	{
		name: 'movement by tile click',
		handled: true,
	},
	{ name: 'approach directions (PC only from front', handled: true },
	{ name: 'disable weird scroll', handled: true },
	{ name: 'rotating npcs', handled: true },
	{ name: 'walking npcs on set paths', handled: true },
	{ name: 'pretty stat display', handled: true },
	{ name: 'battle platforms', handled: true },

	{ name: 'hpbar colors', handled: true },
	{ name: 'time of day icon in battle', handled: true },
	{ name: 'choose random moves for opponent', handled: true },

	{ name: 'different encounters for time of day', handled: true },
	{
		name: 'smooth transition with dialogue after Starter Selection',
		handled: true,
	},
	{ name: 'player sprite selection', handled: true },

	{ name: 'reset button', handled: true },
	{ name: 'setting: fainted pokemon are removed', handled: true },
	{ name: 'inventory and market filters' },
	{ name: 'only show three pokeballs that open onClick for starter selection' },
	{ name: 'play pokecenter sound on visit' },
	{ name: 'fix toast and Banner position' },
	{ name: 'Opponents can use items' },
	{ name: 'Properly determine held item from options' },
	{
		name: 'setting: randomize held items',
	},
	{
		name: 'fallback for backSprites',
	},
	{ name: 'Conditional npc if you dont have badge ' },
	{ name: 'take/give heldItem' },
	{ name: 'prettier team overview' },
	{ name: 'filter in battle items by if someone can benefit' },
	{ name: 'receive quests from npcs' },
	{ name: 'poison step damage' },
	{ name: 'fly outside of battle' },
	{
		name: 'dont have toasts and banners',
	},
	{ name: 'devtools inspector' },
	{ name: 'map maker' },
	{ name: 'trainer builder' },
	{ name: 'hidden items on obstacles' },
	{
		name: 'walk through grass animation',
	},
	{ name: 'break step between move execution' },
	{ name: 'nicknames for pokemon' },
	{ name: 'fix hidden item shader at night' },
	{ name: 'improved keyboard control, interpret direction buttons' },
	{ name: 'display charge up and secondary ailments in info box' },
	{
		name: 'fix: recoil is too high if the move does more damage than target has hp left ',
	},
	{
		name: 'auto heal on battle lost',
	},
	{ name: 'fix: metapod missed swords dance' },
	{ name: 'stop walking animations when encounter triggered' },
	{
		name: 'stop strange spinning of npcs when click navigating',
	},

	{
		name: 'show k/o pokemon as such in team overview',
	},
	{ name: 'setting: instant mode' },
	{ name: 'flex display on Line up Selection' },
	{ name: 'Team overview on overworld' },
	{ name: 'auto choose opponent moves' },
	{ name: 'go through functions, delete unused' },
	{ name: 'Uncollected Quests Badge on Menu Button' },
	{ name: 'preselect pokemon on line up' },
	{ name: 'level badges in storage' },
	{ name: 'only consider occupants in view (+2 or 3 fields) when redrawing' },
	{ name: 'walking npcs randomly' },
	{
		name: 'stop npcs from walking through player',
	},
	{ name: 'prevent npcs from changing their path after player interaction' },
	{ name: 'go to nurse after loss' },
	{ name: 'group selectable actions in battle' },
	{ name: 'extract battlesteps' },
	{ name: 'back button from target selection' },
	{ name: 'burn shader' },
	{ name: 'poison shader' },
	{ name: 'para shader' },
	{ name: 'frozen shader' },
	{ name: 'sleep shader' },
	{ name: 'switch button position in line up' },
	{ name: 'even prettier stat display' },
	{ name: 'assign random nature to encounters' },
	{ name: 'Collapsed/detailed Team View' },
	{ name: 'cant select fainted pokemon in line up' },
	{ name: 'keyboard control on refill screen' },
	{ name: 'prettier refill screen' },
	{ name: 'filter action by controlled' },
	{ name: 'extract battlefield state, selectors and reducers' },
	{ name: 'battle backgrounds' },
	{
		name: 'setting: randomized items',
	},
	{ name: 'setting: random quest rewards' },
	{ name: 'shaders in battle' },
	{
		name: 'Pokemon sprites in message display based on name search (if message includes(pokemon.name)=> sprite )',
	},
	{
		name: 'prettier weather display',
	},
	{ name: 'Battle Attack animation' },
	{ name: 'refactor primaryAilment healing table' },
	{ name: 'item descriptions somewhere' },
	{ name: 'move descriptions somewhere' },
	{ name: 'xtract subcomponents from healaction' },
	{ name: 'display usedPP on action selection' },
	{ name: 'disable moves with no pp left' },
	{ name: 'animation state for flying pokemon' },
	{ name: 'eggs?' },
	{
		name: 'only factor volt-absorb etc into recommendation after it has been revealed',
	},
	{ name: 'quest: catch a day pokemon' },
	{ name: 'quest: catch a night pokemon' },
	{ name: 'quest: catch a evening pokemon' },
	{ name: 'quest: catch a morning pokemon' },
	{ name: 'alternate forms (galar, alola)' },
	{ name: 'encounter rarity' },
	{ name: 'ivs' },
	{ name: 'check if pokemon can actually cut' },
	{ name: 'gain xp from battle' },
	{ name: 'chosen settings overview' },
	{ name: 'put caught pokemon on team if space' },
];
