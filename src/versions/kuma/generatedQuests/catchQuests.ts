import { CampUpgrade } from '../../../constants/gameData/campUpgrades';
import { MapId } from '../../../constants/gameData/maps/mapsRecord';
import { routeE1 } from '../../../constants/gameData/maps/routeE1';
import { routeN1 } from '../../../constants/gameData/maps/routeN1';
import { routeN1E1 } from '../../../constants/gameData/maps/routeN1E1';
import { routeN1W1 } from '../../../constants/gameData/maps/routeN1W1';
import { routeS1 } from '../../../constants/gameData/maps/routeS1';
import { routeS1E1 } from '../../../constants/gameData/maps/routeS1E1';
import { routeS1W1 } from '../../../constants/gameData/maps/routeS1W1';
import { routeW1 } from '../../../constants/gameData/maps/routeW1';
import { timesOfDay } from '../../../functions/getTimeOfDay';
import {
	getAllBerryLureMonForRoute,
	getAllEncountersFor,
} from '../../../functions/internalDex';
import {
	ItemType,
	PokeballType,
	smallExpCandyPackage,
} from '../../../interfaces/Item';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { Quest } from '../../../interfaces/Quest';
import { SaveFile } from '../../../interfaces/SaveFile';
import { kumaDex } from '../kumaDex';
import { KumaQuestName } from '../questsRecord';

const ballForRoute: Record<MapId, PokeballType> = {
	//actual rewards
	routeN1: 'poke-ball',
	routeN1E1: 'net-ball',
	routeE1: 'nest-ball',
	routeS1E1: 'quick-ball',
	routeS1: 'net-ball',
	routeS1W1: 'dusk-ball',
	routeW1: 'heavy-ball',
	routeN1W1: 'quick-ball',
	//completing the type
	camp: 'poke-ball',
	campCave: 'poke-ball',
	campLaboratory: 'poke-ball',
	challengeField: 'poke-ball',
	randomField: 'poke-ball',
	caveW1: 'poke-ball',
	caveW1F1: 'poke-ball',
	caveW1F2: 'poke-ball',
	caveN1W1: 'poke-ball',
	victoryRoad: 'poke-ball',
	victoryRoadExit: 'poke-ball',
	victoryRoadExtra: 'poke-ball',
	victoryRoadU1: 'poke-ball',
	onixCave: 'poke-ball',
	rocketCamp: 'poke-ball',
	pokemonLeague: 'poke-ball',
	labyrinth_level_1: 'poke-ball',
	labyrinth_level_2: 'poke-ball',
};
const snackForRoute: Record<MapId, ItemType> = {
	//actual rewards
	routeN1: 'old-gateau',
	routeN1E1: 'big-malasada',
	routeE1: 'moomoo-cheese',
	routeS1E1: 'casteliacone',
	routeS1: 'pewter-crunchies',
	routeS1W1: 'lumiose-galette',
	routeW1: 'rage-candy-bar',
	routeN1W1: 'lava-cookie',
	//completing the type
	camp: 'poke-ball',
	campCave: 'poke-ball',
	campLaboratory: 'poke-ball',
	challengeField: 'poke-ball',
	randomField: 'poke-ball',
	caveW1: 'poke-ball',
	caveW1F1: 'poke-ball',
	caveW1F2: 'poke-ball',
	caveN1W1: 'poke-ball',
	victoryRoad: 'poke-ball',
	victoryRoadExit: 'poke-ball',
	victoryRoadExtra: 'poke-ball',
	victoryRoadU1: 'poke-ball',
	onixCave: 'poke-ball',
	rocketCamp: 'poke-ball',
	pokemonLeague: 'poke-ball',
	labyrinth_level_1: 'poke-ball',
	labyrinth_level_2: 'poke-ball',
};
const ticketForRoute: Record<MapId, ItemType> = {
	//actual tickets
	routeN1E1: 'forest-ticket',
	routeS1E1: 'plains-ticket',
	routeS1W1: 'hills-ticket',
	routeN1W1: 'peak-ticket',
	//other reward
	routeN1: 'rare-candy',
	routeE1: 'rare-candy',
	routeS1: 'rare-candy',
	routeW1: 'rare-candy',
	//completing the type

	camp: 'poke-ball',
	campCave: 'poke-ball',
	campLaboratory: 'poke-ball',
	challengeField: 'poke-ball',
	randomField: 'poke-ball',
	caveW1: 'poke-ball',
	caveW1F1: 'poke-ball',
	caveW1F2: 'poke-ball',
	caveN1W1: 'poke-ball',
	victoryRoad: 'poke-ball',
	victoryRoadExit: 'poke-ball',
	victoryRoadExtra: 'poke-ball',
	victoryRoadU1: 'poke-ball',
	onixCave: 'poke-ball',
	rocketCamp: 'poke-ball',
	pokemonLeague: 'poke-ball',
	labyrinth_level_1: 'poke-ball',
	labyrinth_level_2: 'poke-ball',
};

const catchQuestsForRoute = (
	route: OverworldMap,
	includeWater: boolean,
	requiredUpgrade?: CampUpgrade
): Partial<Record<KumaQuestName, Quest>> => {
	const ultraRares = getAllEncountersFor(
		route.id,
		{
			rarity: 'ultra-rare',
			area: includeWater ? undefined : 'LAND',
		},
		kumaDex
	);
	const berryLures = getAllBerryLureMonForRoute(route.id, kumaDex);
	const res = {
		...Object.fromEntries(
			timesOfDay.map((time) => {
				const id =
					`catch a ${time}-time exclusive pokemon from ${route.id}` as KumaQuestName;

				const options = getAllEncountersFor(
					route.id,
					{
						timeOfDay: time,
						area: includeWater ? undefined : 'LAND',
					},
					kumaDex
				);
				return [
					id,
					{
						category: 'EXPLORATION',
						rewardItems: {
							[`${ballForRoute[route.id]}`]: 3,
						},

						researchPoints: 10,
						conditionFunction: (s) => {
							return options.some((e) =>
								s.pokedex[e.name].caughtOnRoutes.includes(route.id)
							);
						},
						targetPokemon: [...new Set(options.map((p) => p.name))],
						targetRoute: route.id,
						kind: 'BULLETIN',
						requiredUpgrade: requiredUpgrade,
					},
				] as [KumaQuestName, Quest];
			})
		),
		...Object.fromEntries(
			timesOfDay.map((time) => {
				const id = `catch all ${time}-time pokemon from ${route.id}`;
				const options = getAllEncountersFor(
					route.id,
					{
						timeOfDay: time,
						includeAllDay: true,
						area: includeWater ? undefined : 'LAND',
					},
					kumaDex
				);

				return [
					id,
					{
						category: 'EXPLORATION',
						rewardItems: {
							[`${ballForRoute[route.id]}`]: 5,
							[`${snackForRoute[route.id]}`]: 1,
						},
						availableAfter: `catch a ${time}-time exclusive pokemon from ${route.id}`,
						researchPoints: 20,
						conditionFunction: (s) => {
							return options.every((e) =>
								s.pokedex[e.name].caughtOnRoutes.includes(route.id)
							);
						},
						targetPokemon: [...new Set(options.map((p) => p.name))],
						targetRoute: route.id,
						kind: 'BULLETIN',
						requiredUpgrade: requiredUpgrade,
					},
				] as [KumaQuestName, Quest];
			})
		),
		[`catch a ultra-rare pokemon from ${route.id}`]: {
			category: 'EXPLORATION',
			rewardItems: {
				[`${ballForRoute[route.id]}`]: 5,
				[`${snackForRoute[route.id]}`]: 1,
				[`${ticketForRoute[route.id]}`]: 1,
			},
			campUpgrade:
				berryLures.length > 0
					? (`berry lure station ${route.id}` as CampUpgrade)
					: undefined,
			researchPoints: 20,
			conditionFunction: (s: SaveFile) => {
				return ultraRares.some(
					(e) =>
						e.rarity === 'ultra-rare' &&
						s.pokedex[e.name].caughtOnRoutes.includes(route.id)
				);
			},
			targetPokemon: [
				...new Set(
					ultraRares.filter((p) => p.rarity === 'ultra-rare').map((p) => p.name)
				),
			],
			targetRoute: route.id,
			kind: 'BULLETIN',
			requiredUpgrade: requiredUpgrade,
		},
	};

	if (berryLures.length > 0) {
		const berryLureQuest = {
			kind: 'BULLETIN',
			availableAfter:
				`catch a ultra-rare pokemon from ${route.id}` as KumaQuestName,
			rewardItems: smallExpCandyPackage,
			targetPokemon: berryLures,
			researchPoints: 30,
			category: 'RESEARCH',
			conditionFunction: (s: SaveFile) =>
				berryLures.every((b) => s.pokedex[b].caughtOnRoutes.includes(route.id)),
		};
		const berryLureQuestName =
			`berry-lure all different pokemon from ${route.id}` as KumaQuestName;
		//@ts-expect-error trust me
		res[berryLureQuestName] = berryLureQuest;
	}

	return res as Partial<Record<KumaQuestName, Quest>>;
};

//log the keys and add them to the type def if you add new maps
//console.log(Object.keys(catchQuests).filter((c) => c.includes(Your Route Name)));

export const catchQuests: Partial<Record<KumaQuestName, Quest>> = {
	...catchQuestsForRoute(routeN1, false),
	...catchQuestsForRoute(routeN1E1, false, 'machete certification'),
	...catchQuestsForRoute(routeE1, false, 'sledge hammer certification'),
	...catchQuestsForRoute(routeS1E1, true, 'swimming certification'),
	...catchQuestsForRoute(routeS1, true, 'swimming certification'),
	...catchQuestsForRoute(routeS1W1, true, 'swimming certification'),
	...catchQuestsForRoute(routeW1, true, 'swimming certification'),
	...catchQuestsForRoute(routeN1W1, true, 'buy skiing equipment'),
};
