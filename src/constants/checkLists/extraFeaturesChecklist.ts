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
	{ name: 'full keyboard control' },
	{ name: 'movement by tile click' },
	{ name: 'movement buttons' },
	{ name: 'approach directions (PC only from front' },
	{ name: 'overworld background/border of map' },
	{ name: 'disable weird scroll', handled: true },
	{ name: 'rotating npcs' },
	{ name: 'walking npcs' },
	{ name: 'pretty stat display' },
	{ name: 'prettier weather display' },
	{ name: 'Battle Attack animation' },
	{ name: 'battle backgrounds' },
	{ name: 'hpbar colors' },
	{ name: 'remove duplications in battleStep functions' },
	{ name: 'Banner slant either left or right' },
	{ name: 'choose random moves for opponent' },
	{
		name: 'only factor volt-absorb etc into recommendation after it has been revealed',
	},
	{ name: 'different encounters for time of day' },
	{ name: 'smooth transition with dialogue after Starter Selection' },
	{ name: 'player sprite selection' },
	{ name: 'check if pokemon can actually cut' },
	{ name: 'reset button' },
	{ name: 'setting `reset on faint`' },
	{ name: 'setting: fainted pokemon are removed' },
	{ name: 'inventory and market filters' },
	{ name: "put randomized starters into localstorage to 'prevent' reloading" },
	{ name: 'only show three pokeballs that open onClick for starter selection' },
	{ name: 'play pokecenter sound on visit' },
	{ name: 'fix toast and Banner position' },
	{ name: 'Opponents can use items' },
	{ name: "fix 'what is this' error for status moves" },
	{
		name: 'dont give Battle the whole saveFile (n pokemon) and only patch on return',
	},
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
	{ name: 'only pokemon that havent moved can flinch' },
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
];
