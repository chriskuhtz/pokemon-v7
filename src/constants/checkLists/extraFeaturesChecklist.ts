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
		todos: ['heals team', 'you get teleported back to nurse on loss'],
	},
	{ name: 'starter selection' },
	{ name: 'settings' },
	{ name: 'badges' },
	{ name: 'quests' },
	{ name: 'hidden items' },
	{ name: 'team reordering' },
	{ name: 'grass on encounter tiles' },
	{ name: 'toast types' },
	{ name: 'pc storage filters' },
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
];
