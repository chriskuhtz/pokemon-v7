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
	{ name: 'fix: recoil is too high  ', handled: true },
	{ name: 'charge up and secondary ailments in info box', handled: true },
	{ name: 'show k/o pokemon as such in team overview', handled: true },
	{ name: 'flex display on Line up Selection', handled: true },
	{ name: 'Team overview on overworld', handled: true },
	{ name: 'Uncollected Quests Badge on Menu Button and ', handled: true },
	{ name: 'level badges in storage', handled: true },
	{ name: 'assign random nature to encounters', handled: true },
	{ name: 'setting: randomized items', handled: true },
	{ name: 'setting: random quest rewards', handled: true },
	{ name: 'shaders in battle', handled: true },
	{ name: 'quest: catch a day pokemon', handled: true },
	{ name: 'quest: catch a night pokemon', handled: true },
	{ name: 'quest: catch a evening pokemon', handled: true },
	{ name: 'quest: catch a morning pokemon', handled: true },
	{ name: 'alternate forms ', handled: true },
	{ name: 'encounter rarity', handled: true },
	{ name: 'gain xp from battle', handled: true },
	{ name: 'map portals', handled: true },
	{ name: 'time based occupants', handled: true },
	{ name: 'onstep events', handled: true },
	{ name: 'bulletin board', handled: true },
	{ name: 'map maker', handled: true },
	{ name: 'T, B, Q keys as quicklinks to menues', handled: true },
	{ name: 'no random obstacles next to bordergates', handled: true },
	{ name: 'berry planting', handled: true },
	{ name: 'browser tab name and icon', handled: true },
	{ name: 'fix draw order', handled: true },
	{ name: 'open team screen from overworld view', handled: true },
	{ name: 'faster days setting', handled: true },
	{ name: 'item icons in battle', handled: true },
	{ name: 'dismiss messages with enter', handled: true },
	{ name: 'message about xp gain', handled: true },
	{ name: 'assign actual ability if possible', handled: true },
	{ name: 'defeating trainers gives 1 research point', handled: true },
	{ name: 'increase encounter rate', handled: true },
	{ name: 'make fulfilled quests more recognizable', handled: true },
	{ name: 'limit amount of bulletin quests active', handled: true },
	{ name: 'battle tent', handled: true },
	{ name: 'weight modifier', handled: true },
	{ name: 'weight mod based quests', handled: true },
	{ name: 'Encounterlist for honey trees', handled: true },
	{ name: 'assign correct ability on load', handled: true },
	{ name: 'pick moves for starters', handled: true },
	{ name: 'stop walking animations when encounter triggered', handled: true },
	{ name: 'random encounters', handled: true },
	{ name: 'move hallowed tower', handled: true },
	{ name: 'ledges', handled: true },
	{ name: 'setting: faster days', handled: true },
	{ name: 'MakePokemon function', handled: true },
	{ name: 'display names for routes (Japanese colors)', handled: true },
	{ name: 'pokemonSprite component', handled: true },
	{ name: 'proper runaway calculation', handled: true },
	{ name: 'show evo readyness in overworld', handled: true },
	{ name: 'refactor all `routing` npcs into the same type', handled: true },
	{ name: 'fix loading after evo', handled: true },
	{ name: 'display level when applying rare candy from bag', handled: true },
	{ name: 'individual reset timers for npcs', handled: true },
	{ name: 'no running or catching in trainer battles', handled: true },
	{ name: 'prettier team overview', handled: true },
	{ name: 'show held item in storage', handled: true },
	{ name: 'refactor all `routing` npcs into the same type', handled: true },
	{ name: 'determine pokemon genders', handled: true },
	{ name: 'Banner Confirmation needs keyboard control', handled: true },
	{ name: 'ivs', handled: true },
	{ name: 'limit miltank,zigzagoon,dugtrio intervals', handled: true },
	{ name: 'setting: no items in battle', handled: true },
	{ name: 'Held Item & Pickup Bug', handled: true },
	{ name: 'apply migrations on localstorage load', handled: true },
	{ name: 'setting: randomized swarms', handled: true },
	{ name: 'setting: double xp rates', handled: true },
	{ name: 'trainers give rewards' },
	{ name: 'trainers spot you' },
	{ name: 'trainers can move and still spot you' },
	{ name: 'scripted npcs' },
	{ name: 'play pokecenter sound on visit' },
	{ name: 'shaders per map (no daytimes in caves, buildings)' },
	{ name: 'Opponents can use items' },
	{ name: 'consider rarity of held items' },
	{ name: 'algorithmic fences' },
	{ name: 'fence w/o background' },
	{ name: 'poison step damage' },
	{ name: 'fly outside of battle' },
	{ name: 'camp upgrade explanations' },
	{ name: 'higher level pokemon ignore repel' },
	{ name: 'trainer builder' },
	{ name: 'Edit and Collapse Buttons in pokemoncard need keyboard controls' },
	{ name: 'walk through grass animation' },
	{ name: 'improved keyboard control, interpret direction buttons' },
	{ name: 'actually apply ppboost in battle' },
	{ name: 'distinct double/single battle definition' },
	{ name: 'earthquake etc hit all participants' },
	{ name: 'use more typecolors' },
	{ name: 'escape rope only in cave' },
	{ name: 'berry bushes' },
	{ name: 'refactor quest limit' },
	{ name: 'Changing moves messes with pp' },
	{ name: 'icons for quests' },

	{ name: 'refactor primaryAilment healing table' },
	{ name: 'stop strange spinning of npcs when click navigating' },
	{ name: 'accurate house sizes' },
	{ name: 'standard isHandled conditionFunction' },
	{ name: 'github issue reporting' },
	{ name: 'use graphql to get pokemon mapped by type as json constants' },
	{ name: 'battlepokemon size?' },
	{ name: 'random location items that respawn' },
	{ name: 'quiz hut' },
	{ name: 'go through functions, delete unused' },
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
	{ name: 'Bag capacity' },
	{ name: 'extract battlefield state, selectors and reducers' },
	{ name: 'battle backgrounds' },
	{ name: 'pokedex' },
	{ name: 'prettier weather display' },
	{ name: 'Battle Attack animation' },
	{ name: 'item descriptions somewhere' },
	{ name: 'move descriptions somewhere' },
	{ name: 'xtract subcomponents from healaction' },
	{ name: 'animation state for flying pokemon' },
	{ name: 'eggs?' },
	{ name: 'opponent "learns" about volt-absorb etc ' },
	{ name: 'fallback sprites (offical artwork)' },
	{ name: 'switching (dont forget spider-web, magnet-pull etc)' },
	{ name: 'trade evos' },
	{ name: 'itemsprite component' },
	{ name: 'growth rates' },
	{ name: 'play button for pokemon lofi' },
	{ name: 'pokemon as quest rewards' },
	{ name: 'consider weightMod for low kick damage' },
	{
		name: 'swarms increase shiny chance',
	},
	{ name: 'moving background (water,flowers)' },

	{ name: 'data collection module (name, nCaught,nDefeated)' },
	{ name: 'award evs after battle' },
	{ name: 'evs should not just be random' },
	{
		name: 'filter bulletin quests by time of day',
	},
	{
		name: 'prettier mulch buttons',
	},
	{
		name: 'Info Pill Background color indicates primary ailment',
	},
];
