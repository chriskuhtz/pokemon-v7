export const extraFeatureCheckList: {
	name: string;
	todos?: string[];
	handled?: boolean;
}[] = [
	{ name: 'PC storage system', handled: true },
	{ name: 'PC access only from overworld', handled: true },
	{ name: 'Market access only from overworld', handled: true },
	{ name: 'defined encounters per route', handled: true },
	{ name: 'extract battleStep hooks', handled: true },
	{ name: 'define nextSteps in battleStep type', handled: true },
	{ name: 'extract banners', handled: true },
	{ name: 'extract battleAction Sections', handled: true },
	{ name: 'nurse', handled: true },
	{ name: 'starter selection and name', handled: true },
	{ name: 'randomized starter setting', handled: true },
	{ name: 'badges', handled: true },
	{ name: '"catch these pokemon" quests', handled: true },
	{ name: 'hidden items', handled: true },
	{ name: 'team reordering', handled: true },
	{ name: 'grass on encounter tiles', handled: true },
	{ name: 'toast types', handled: true },
	{ name: 'pc storage filters', handled: true },
	{ name: 'full keyboard control', handled: true },
	{ name: 'movement by tile click', handled: true },
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
	{ name: 'smooth transition after Starter Selection', handled: true },
	{ name: 'player sprite selection', handled: true },
	{ name: 'reset button', handled: true },
	{ name: 'setting: fainted pokemon are removed', handled: true },
	{ name: 'inventory and market filters', handled: true },
	{ name: 'nicer loading screen', handled: true },
	{ name: 'only show three pokeballs for starter selection', handled: true },
	{ name: 'handled npcs list', handled: true },
	{ name: 'trainers', handled: true },
	{ name: 'fix toast and Banner position', handled: true },
	{ name: 'Properly determine held item from options', handled: true },
	{ name: 'setting: randomize held items', handled: true },
	{ name: 'Conditional npc if you dont have badge ', handled: true },
	{ name: 'take/give heldItem', handled: true },
	{ name: 'receive quests from npcs', handled: true },
	{ name: 'filter in battle items by if someone can benefit', handled: true },
	{ name: 'hidden items on obstacles', handled: true },
	{ name: 'nicknames for pokemon', handled: true },
	{ name: 'fix hidden item shader at night', handled: true },
	{ name: 'auto heal on battle lost', handled: true },
	{ name: 'fix: metapod missed swords dance', handled: true },
	{ name: 'auto choose opponent moves', handled: true },
	{ name: 'preselect pokemon on line up', handled: true },
	{ name: 'go to nurse after loss', handled: true },
	{ name: 'back button from target selection', handled: true },
	{ name: 'switch button position in line up', handled: true },
	{ name: 'Collapsed/detailed Team View', handled: true },
	{ name: 'cant select fainted pokemon in line up', handled: true },
	{ name: 'keyboard control on refill screen', handled: true },
	{ name: 'prettier refill screen', handled: true },
	{ name: 'filter action by controlled', handled: true },
	{ name: 'display usedPP on action selection', handled: true },
	{ name: 'disable moves with no pp left', handled: true },
	{ name: 'put caught pokemon on team if space', handled: true },
	{ name: 'create toggle component ', handled: true },
	{ name: 'anounce map on change', handled: true },
	{ name: 'Unify Toast, Message and MessageQueue', handled: true },
	{ name: 'queststatus conditional npcs', handled: true },
	{
		name: 'fix: recoil is too high if the move does more damage than target hp ',
		handled: true,
	},
	{ name: 'display charge up and secondary ailments in info box' },

	{ name: 'stop walking animations when encounter triggered' },
	{ name: 'stop strange spinning of npcs when click navigating' },
	{ name: 'show k/o pokemon as such in team overview' },
	{ name: 'setting: instant mode' },
	{ name: 'flex display on Line up Selection' },
	{ name: 'Team overview on overworld' },
	{ name: 'go through functions, delete unused' },
	{ name: 'Uncollected Quests Badge on Menu Button' },
	{ name: 'level badges in storage' },
	{ name: 'only consider occupants in view (+2 or 3 fields) when redrawing' },
	{ name: 'walking npcs randomly' },
	{ name: 'stop npcs from walking through player' },
	{ name: 'prevent npcs from changing their path after player interaction' },
	{ name: 'group selectable actions in battle' },
	{ name: 'burn shader' },
	{ name: 'poison shader' },
	{ name: 'para shader' },
	{ name: 'frozen shader' },
	{ name: 'sleep shader' },
	{ name: 'even prettier stat display' },
	{ name: 'assign random nature to encounters' },
	{ name: 'extract battlefield state, selectors and reducers' },
	{ name: 'battle backgrounds' },
	{ name: 'setting: randomized items' },
	{ name: 'setting: random quest rewards' },
	{ name: 'shaders in battle' },
	{ name: 'prettier weather display' },
	{ name: 'Battle Attack animation' },
	{ name: 'refactor primaryAilment healing table' },
	{ name: 'item descriptions somewhere' },
	{ name: 'move descriptions somewhere' },
	{ name: 'xtract subcomponents from healaction' },
	{ name: 'animation state for flying pokemon' },
	{ name: 'eggs?' },
	{ name: 'opponent "learns" about volt-absorb etc ' },
	{ name: 'quest: catch a day pokemon' },
	{ name: 'quest: catch a night pokemon' },
	{ name: 'quest: catch a evening pokemon' },
	{ name: 'quest: catch a morning pokemon' },
	{
		name: 'alternate forms (galar, alola), also consider evo methods (e.g. ratatta)',
	},
	{ name: 'encounter rarity' },
	{ name: 'ivs' },
	{ name: 'check if pokemon can actually cut' },
	{ name: 'gain xp from battle' },
	{ name: 'separate name selection and starter selection' },
	{ name: 'map portals' },
	{ name: 'display level when applying rare candy from bag' },
	{ name: 'individual reset timers for npcs' },
	{ name: 'time based occupants' },
	{ name: 'trainers give rewards' },
	{ name: 'trainers spot you' },
	{ name: 'trainers can move and still spot you' },
	{ name: 'scripted npcs' },
	{ name: 'no running or catching in trainer battles' },
	{ name: 'surf outside of battle' },
	{ name: 'play pokecenter sound on visit' },
	{ name: 'onstep events' },
	{ name: 'shaders per map (no daytimes in caves, buildings)' },
	{ name: 'Opponents can use items' },
	{ name: 'consider rarity of held items' },
	{ name: 'show held item in storage' },
	{ name: 'random quest' },
	{ name: 'bulletin board' },
	{ name: 'algorithmic fences' },
	{ name: 'fence w/o background' },
	{ name: 'prettier team overview' },
	{ name: 'poison step damage' },
	{ name: 'fly outside of battle' },
	{ name: 'allow save snapshots' },
	{ name: 'higher level pokemon ignore repel' },
	{ name: 'T, B, Q keys as quicklinks to menues' },
	{ name: 'map maker' },
	{ name: 'trainer builder' },
	{ name: 'Edit and Collapse Buttons in pokemoncard need keyboard controls' },
	{ name: 'walk through grass animation' },
	{ name: 'break step between move execution' },
	{ name: 'browser tab name and icon' },
	{ name: 'improved keyboard control, interpret direction buttons' },
	{ name: 'fix loading after evo' },
	{
		name: 'use more typecolors',
	},
	{ name: " be careful with state updates for 'focused' in team" },
];
