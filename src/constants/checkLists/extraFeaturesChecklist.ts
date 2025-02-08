export const extraFeatureCheckList: {
	name: string;
	todos?: string[];
	handled?: boolean;
}[] = [
	{ name: 'PC storage system', handled: true },
	{
		name: 'PC access only from overworld',
		todos: ['interact with pc', 'remove storage from main menu'],
	},
	{ name: 'Market access only from overworld' },
	{ name: 'defined encounters per route' },
	{ name: 'extract battleStep hooks' },
	{ name: 'extract banners' },
	{ name: 'extract battleAction Sections' },
	{ name: 'Poke Center' },
	{ name: 'starter selection' },
	{ name: 'settings' },
	{ name: 'badges' },
	{ name: 'quests' },
	{ name: 'hidden items' },
	{ name: 'team reordering' },
	{ name: 'grass on encounter tiles' },
	{ name: 'toast types' },
	{ name: 'pc storage filters' },
];
