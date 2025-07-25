import { makeOverworldItem } from '../../../../functions/makeOverworldItem';
import { OverworldMap } from '../../../../interfaces/OverworldMap';

export const victoryRoadExitOccupants: OverworldMap['occupants'] = [
	//PORTALS
	{
		id: 'victory_road_to_exit',
		type: 'ON_STEP_PORTAL',
		x: 10,
		y: 28,
		portal: {
			mapId: 'victoryRoad',
			x: 13,
			y: 3,
			orientation: 'DOWN',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
	},
	{
		id: 'victory_road_to_pokemonLeague',
		type: 'ON_STEP_PORTAL',
		x: 10,
		y: 3,
		portal: {
			mapId: 'pokemonLeague',
			x: 5,
			y: 55,
			orientation: 'UP',
			forwardFoot: 'CENTER1',
		},
		conditionFunction: () => true,
	},
	//OBSTACLES
	//STATUES LEFT SIDE
	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 21,
		orientation: 'RIGHT',
		dexId: 44,
		dialogue: ['A statue of a Gloom.'],
		conditionFunction: () => true,
		id: 'victory-road_gloom_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 19,
		orientation: 'RIGHT',
		dexId: 24,
		dialogue: ['A statue of an Arbok.'],
		conditionFunction: () => true,
		id: 'victory-road_arbok_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 17,
		orientation: 'RIGHT',
		dexId: 59,
		dialogue: ['A statue of a Arcanine.'],
		conditionFunction: () => true,
		id: 'victory-road_arcanine_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 15,
		orientation: 'RIGHT',
		dexId: 121,
		dialogue: ['A statue of a Starmie.'],
		conditionFunction: () => true,
		id: 'victory-road_starmie_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 13,
		orientation: 'RIGHT',
		dexId: 26,
		dialogue: ['A statue of a Raichu.'],
		conditionFunction: () => true,
		id: 'victory-road_raichu_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 11,
		orientation: 'RIGHT',
		dexId: 282,
		dialogue: ['A statue of a gardevoir.'],
		conditionFunction: () => true,
		id: 'victory-road_gardevoir_statue',
	},

	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 9,
		orientation: 'RIGHT',
		dexId: 95,
		dialogue: ['A statue of a Onix.'],
		conditionFunction: () => true,
		id: 'victory-road_onix_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 8,
		y: 7,
		orientation: 'RIGHT',
		dexId: 9,
		dialogue: ['A statue of a Blastoise.'],
		conditionFunction: () => true,
		id: 'victory-road_blastoise_statue',
	},
	//STATUES RIGHT SIDE
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 21,
		orientation: 'LEFT',
		dexId: 164,
		dialogue: ['A statue of a Noctowl.'],
		conditionFunction: () => true,
		id: 'victory-road_noctowl_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 19,
		orientation: 'LEFT',
		dexId: 212,
		dialogue: ['A statue of a Scizor.'],
		conditionFunction: () => true,
		id: 'victory-road_scizor_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 17,
		orientation: 'LEFT',
		dexId: 241,
		dialogue: ['A statue of a Miltank.'],
		conditionFunction: () => true,
		id: 'victory-road_miltank_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 15,
		orientation: 'LEFT',
		dexId: 94,
		dialogue: ['A statue of a Gengar.'],
		conditionFunction: () => true,
		id: 'victory-road_gengar_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 13,
		orientation: 'LEFT',
		dexId: 68,
		dialogue: ['A statue of a Machamp.'],
		conditionFunction: () => true,
		id: 'victory-road_machamp_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 11,
		orientation: 'LEFT',
		dexId: 462,
		dialogue: ['A statue of a Magnezone.'],
		conditionFunction: () => true,
		id: 'victory-road_magnezone_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 9,
		orientation: 'LEFT',
		dexId: 473,
		dialogue: ['A statue of an Mamoswine.'],
		conditionFunction: () => true,
		id: 'victory-road_mamoswine_statue',
	},
	{
		type: 'POKEMONSTATUE',
		x: 12,
		y: 7,
		orientation: 'LEFT',
		dexId: 230,
		dialogue: ['A statue of a Kingdra.'],
		conditionFunction: () => true,
		id: 'victory-road_kingdra_statue',
	},
	//OVERWORLD_MONS
	//TRAINERS
	//ITEMS
	makeOverworldItem({
		mapId: 'victoryRoad',
		item: 'league-ticket',
		x: 6,
		y: 5,
		amount: 1,
	}),
];
