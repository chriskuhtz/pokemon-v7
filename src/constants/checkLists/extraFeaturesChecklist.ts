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
	{ name: 'trainers can give rewards', handled: true },
	{ name: 'shaders per map (no daytimes in caves, buildings)', handled: true },
	{ name: 'consider rarity of held items', handled: true },
	{ name: 'swarms increase shiny chance', handled: true },
	{ name: 'setting: defeated pokemon get released', handled: true },
	{ name: 'camp upgrade explanations', handled: true },
	{ name: 'higher level pokemon ignore repel', handled: true },
	{
		name: 'Edit and Collapse Buttons in pokemoncard need keyboard controls',
		handled: true,
	},
	{ name: 'github issue reporting', handled: true },
	{ name: 'battlepokemon size?', handled: true },
	{ name: 'actually apply ppboost in battle', handled: true },
	{ name: 'add scyther encounter', handled: true },
	{ name: 'add oddish encounter', handled: true },
	{ name: 'adjust route N1 encounters', handled: true },
	{ name: 'conditionally unlock route E1', handled: true },
	{ name: 'adjust route N1E1 encounters', handled: true },
	{ name: 'make alola quests possible', handled: true },
	{ name: 'design route E1', handled: true },
	{ name: 'make galar quests possible', handled: true },
	{ name: 'make hisui quests possible', handled: true },
	{ name: 'make paldea quest possible', handled: true },
	{ name: 'shortcut to route E1', handled: true },
	{ name: 'mini cave', handled: true },
	{ name: 'find fossil in cave', handled: true },
	{ name: 'larger cave', handled: true },
	{ name: 'cave teaser on meadow, behind ledges', handled: true },
	{ name: 'cave as tunnel to route S1E1', handled: true },
	{ name: 'river in midori plains', handled: true },
	{ name: 'Bag capacity', handled: true },
	{ name: 'pokemon as quest rewards', handled: true },
	{
		name: 'prettier mulch buttons',
		handled: true,
	},
	{
		name: 'xp all and xp share as options, otherwise only battle participants get exp',
		handled: true,
	},
	{ name: 'investigate encounter rate function', handled: true },
	{ name: 'sort completed quests to the top', handled: true },
	{ name: 'item storage chest', handled: true },
	{ name: 'move tutor', handled: true },
	{ name: 'more farm slots', handled: true },
	{ name: 'pokedex', handled: true },
	{ name: 'fallback sprites (offical artwork)', handled: true },
	{
		name: 'switching (dont forget spider-web, magnet-pull etc)',
		handled: true,
	},
	{ name: 'put growth rates on pokemon', handled: true },
	{ name: 'swarms increase shiny chance', handled: true },
	{ name: 'award evs after battle', handled: true },
	{ name: 'evs should not just be random', handled: true },
	{
		name: 'Info Pill Background color indicates primary ailment',
		handled: true,
	},
	{
		name: 'proper solution: somehow indicate if a pokemon is required for a quest',
		handled: true,
	},
	{ name: 'improve encounters for rowan quest', handled: true },
	{ name: 'make actual gold/silver berry sprites', handled: true },
	{
		name: 'make pokemon less tiny, experiment with relative size',
		handled: true,
	},
	{
		name: 'quick solution: make pokemon route/method exclusive',
		handled: true,
	},
	{ name: 'Catch x different species needs to listen to dex', handled: true },
	{
		name: "'caught before' indicators need to be determined by pokedex",
		handled: true,
	},
	{ name: 'sort unlocked upgrades to bottom', handled: true },
	{ name: 'move selection for opponents', handled: true },
	{
		name: 'infatuation needs to be removed if target leaves field',
		handled: true,
	},
	{ name: 'restructure encounters to make rowan quest better', handled: true },
	{ name: 'more cookable items', handled: true },
	{ name: 'fossil guy should be roark', handled: true },
	{ name: 'inform about quest rewards', handled: true },
	{ name: 'peat block needs sprite', handled: true },
	{ name: 'elm: gender based evo', handled: true },
	{ name: 'achieve cooking level x quest', handled: true },
	{ name: 'quest: nidoking and nidoqueen', handled: true },
	{ name: 'tileset per map', handled: true },
	{ name: 'fix camp map', handled: true },
	{ name: 'trade evos', handled: true },
	{ name: 'move routeN1 to custom sheet', handled: true },
	{ name: 'cant throw away key items like exp share', handled: true },
	{ name: 'improve performance of mapmaker', handled: true },
	{ name: 'water as distinct from obstacles', handled: true },
	{ name: 'extract category:unique moves', handled: true },
	{
		name: '3 column layout for map editor (Tool Selection, current Layer, CombinedCanvas)',
		handled: true,
	},
	{ name: 'way to cross the river', handled: true },
	{ name: 'berry lures on other routes(E1,S1E1)', handled: true },
	{ name: "'Pokemon Surfer Certification'", handled: true },
	{ name: 'move routeS1E1 to custom sheet', handled: true },
	{ name: 'encounters for midori plains', handled: true },
	{
		name: 'pokeflute for waking up snorlax can be found in midori plains',
		handled: true,
	},
	{ name: 'item ability move wiki', handled: true },
	{ name: 'more overworld items', handled: true },
	{ name: 'x of n quests completed bar', handled: true },
	{ name: 'morty needs to be way stronger', handled: true },
	{
		name: 'trainers should increase by 10 levels between tiers',
		handled: true,
	},
	{ name: 'defeated before should be green', handled: true },
	{
		name: 'use Move.meta.category as a switch case for attack handling',
		handled: true,
	},
	{ name: 'refactor quest limit', handled: true },
	{
		name: 'attack handler should not get setter function, just return BattlePokemon[]',
		handled: true,
	},
	{ name: 'show physical special attack type somewhere', handled: true },
	{ name: 'refactor cooking', handled: true },
	{ name: 'improve held-item+trade evo condition', handled: true },
	{ name: 'shortcut ledge in orenji forest maze', handled: true },
	{ name: 'item descriptions somewhere', handled: true },
	{ name: 'move descriptions somewhere', handled: true },
	{ name: 'extract handleAttack start and end', handled: true },
	{ name: 'battleinfo stack for switch in screen', handled: true },
	{
		name: 'use Move.target as a switch case for attack handling',
		handled: true,
	},
	{ name: 'itemsprite component', handled: true },
	{ name: 'pikachu fan questline', handled: true },
	{ name: 'quest: light ball pikachu', handled: true },
	{ name: 'quest: different pikachus', handled: true },
	{ name: 'quest: pikachu clones', handled: true },
	{ name: 'make card responsive to portrait mode', handled: true },
	{ name: 'make battle responsive to portrait mode', handled: true },
	{ name: 'training field: random from tier x', handled: true },
	{ name: 'defeat x trainer should give malasada as reward', handled: true },
	{ name: 'training field 4', handled: true },
	{
		name: 'devmode gives complete inventory and unlocks, lvl 100',
		handled: true,
	},
	{ name: 'more defeat x trainers quests', handled: true },
	{ name: 'show move power', handled: true },
	{ name: 'fix pathing algorithm for walking around obstacles' },
	{ name: 'consider weather/effects etc for opponent decisions' },
	{ name: 'poison step damage' },
	{ name: 'nicer ladder up sprite' },
	{ name: 'other gym leaders' },
	{ name: 'shovel spots' },
	{ name: "'Pokemon Flyer Certification' : requires new route first" },
	{ name: 'Fishing?' },
	{ name: 'more vileplume products' },
	{ name: 'training field challenge mode' },
	{ name: 'team rocket' },
	{ name: 'blissey trainer' },
	{ name: 'wild apricorn trees' },
	{ name: 'training field route' },
	{ name: 'retrieve item from wild pokemon quest (special encounter)' },
	{ name: 'lure x pokemon quest' },
	{ name: 'actually use growth rates' },
	{ name: 'trainer builder' },
	{ name: 'walk through grass animation' },
	{ name: 'improved keyboard control, interpret direction buttons' },
	{ name: 'distinct double/single battle definition' },
	{ name: 'earthquake etc hit all participants' },
	{ name: 'use more typecolors' },
	{ name: 'escape rope only in cave' },
	{ name: 'berry bushes' },
	{ name: 'icons for quests' },
	{ name: 'stop strange spinning of npcs when click navigating' },
	{ name: 'use graphql to get pokemon mapped by type as json constants' },
	{ name: 'random location items that respawn' },
	{ name: 'group selectable actions in battle' },
	{ name: 'even prettier stat display' },
	{ name: 'battle backgrounds' },
	{ name: 'prettier weather display' },
	{ name: 'Battle Attack animation' },
	{ name: 'animation state for flying pokemon' },
	{ name: 'eggs?' },
	{ name: 'opponent "learns" about volt-absorb etc ' },
	{ name: 'play button for pokemon lofi' },
	{ name: 'moving background (water,flowers)' },
	{ name: 'non regional to regional evos, pikachu => alola raichu' },
	{ name: 'battleweather duration' },
	{ name: 'show battle effects somewhere' },
	{ name: 'battlepoint shop' },
	{ name: 'make game playable in portrait mode' },
	{
		name: 'quest: catch a pokemon of each type',
	},
	{ name: 'trainers need cooldown timers' },
	{ name: 'gender needs to be visible in battle' },
	{ name: 'Movement buttons' },
	{ name: 'gen 8 fossils' },
	{ name: 'all fossils need to be findable' },
	{ name: 'dugtrio should not deliver fossils' },
	{ name: 'randomized-moves' },
	{ name: 'team screen portrait mode' },
	{ name: 'battle screen portrait mode' },
	{ name: 'take all (berries/balls/etc) button' },
	{ name: 'catch n swarm pokemon quests' },
	{ name: 'improve the release pokemon button, it is accident prone' },
];
