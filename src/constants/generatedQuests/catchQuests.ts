import { timesOfDay } from '../../functions/getTimeOfDay';
import { Inventory } from '../../interfaces/Inventory';
import { smallExpCandyPackage } from '../../interfaces/Item';
import { OverworldMap } from '../../interfaces/OverworldMap';
import { Quest } from '../../interfaces/Quest';
import { SaveFile } from '../../interfaces/SaveFile';
import { CampUpgrade } from '../campUpgrades';
import {
	getAllBerryLureMonForRoute,
	getAllEncountersFor,
} from '../internalDex';
import { routeE1 } from '../maps/routeE1';
import { routeN1 } from '../maps/routeN1';
import { routeN1E1 } from '../maps/routeN1E1';
import { routeN1W1 } from '../maps/routeN1W1';
import { routeS1 } from '../maps/routeS1';
import { routeS1E1 } from '../maps/routeS1E1';
import { routeS1W1 } from '../maps/routeS1W1';
import { routeW1 } from '../maps/routeW1';
import { QuestName } from '../questsRecord';

const rewardsMap: Record<string, Partial<Inventory>> = {
	//routeN1
	'catch a MORNING-time exclusive pokemon from routeN1': {
		'poke-ball': 3,
		'sitrus-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1': {
		'poke-ball': 3,
		'cheri-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1': {
		'poke-ball': 3,
		'chesto-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1': {
		'poke-ball': 3,
		'pecha-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeN1': {
		'poke-ball': 3,
		'rawst-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeN1': {
		'poke-ball': 3,
		'aspear-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeN1': {
		'poke-ball': 3,
		'leppa-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeN1': {
		'poke-ball': 3,
		'oran-berry': 2,
		'berry-juice': 1,
	},
	//routeN1E1
	'catch a MORNING-time exclusive pokemon from routeN1E1': {
		'net-ball': 3,
		'persim-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1E1': {
		'net-ball': 3,
		'lum-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1E1': {
		'net-ball': 3,
		'figy-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1E1': {
		'net-ball': 3,
		'mago-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeN1E1': {
		'net-ball': 3,
		'iapapa-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeN1E1': {
		'net-ball': 3,
		'bluk-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeN1E1': {
		'net-ball': 3,
		'nanab-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeN1E1': {
		'net-ball': 3,
		'pinap-berry': 2,
		'berry-juice': 1,
	},
	//routeE1
	'catch a MORNING-time exclusive pokemon from routeE1': {
		'quick-ball': 3,
		'aguav-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeE1': {
		'quick-ball': 3,
		'wiki-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeE1': {
		'quick-ball': 3,
		'razz-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeE1': {
		'quick-ball': 3,
		'wepear-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeE1': {
		'quick-ball': 3,
		'pinap-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeE1': {
		'quick-ball': 3,
		'pomeg-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeE1': {
		'quick-ball': 3,
		'kelpsy-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeE1': {
		'quick-ball': 3,
		'qualot-berry': 1,
		'berry-juice': 1,
	},
	//routeS1E1
	'catch a MORNING-time exclusive pokemon from routeS1E1': {
		'great-ball': 3,
		'kee-berry': 2,
	},
	'catch a DAY-time exclusive pokemon from routeS1E1': {
		'great-ball': 3,
		'belue-berry': 2,
	},
	'catch a EVENING-time exclusive pokemon from routeS1E1': {
		'great-ball': 3,
		'rabuta-berry': 2,
	},
	'catch a NIGHT-time exclusive pokemon from routeS1E1': {
		'great-ball': 3,
		'pinap-berry': 2,
	},
	'catch all MORNING-time pokemon from routeS1E1': {
		'great-ball': 3,
		'qualot-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeS1E1': {
		'great-ball': 3,
		'payapa-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeS1E1': {
		'great-ball': 3,
		'magost-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeS1E1': {
		'great-ball': 3,
		'tamato-berry': 1,
		'berry-juice': 1,
	},
	//routeS1W1
	'catch a MORNING-time exclusive pokemon from routeS1W1': {
		'great-ball': 3,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeS1W1': {
		'great-ball': 3,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeS1W1': {
		'great-ball': 3,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeS1W1': {
		'great-ball': 3,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeS1W1': {
		'great-ball': 3,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeS1W1': {
		'great-ball': 3,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeS1W1': {
		'great-ball': 3,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeS1W1': {
		'great-ball': 3,
		'rare-candy': 1,
	},
	//routeW1
	'catch a MORNING-time exclusive pokemon from routeW1': {
		'quick-ball': 3,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeW1': {
		'quick-ball': 3,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeW1': {
		'quick-ball': 3,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeW1': {
		'quick-ball': 3,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeW1': {
		'quick-ball': 3,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeW1': {
		'quick-ball': 3,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeW1': {
		'quick-ball': 3,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeW1': {
		'quick-ball': 3,
		'rare-candy': 1,
	},
	//routeN1W1
	'catch a MORNING-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 3,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 3,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 3,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 3,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeN1W1': {
		'dusk-ball': 3,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeN1W1': {
		'dusk-ball': 3,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeN1W1': {
		'dusk-ball': 3,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeN1W1': {
		'dusk-ball': 3,
		'rare-candy': 1,
	},
};

const catchQuestsForRoute = (
	route: OverworldMap,
	includeWater: boolean,
	requiredUpgrade?: CampUpgrade
): Partial<Record<QuestName, Quest>> => {
	const ultraRares = getAllEncountersFor(route.id, {
		rarity: 'ultra-rare',
		area: includeWater ? undefined : 'LAND',
	});
	const berryLures = getAllBerryLureMonForRoute(route.id);
	const res = {
		...Object.fromEntries(
			timesOfDay.map((time) => {
				const id =
					`catch a ${time}-time exclusive pokemon from ${route.id}` as QuestName;

				const options = getAllEncountersFor(route.id, {
					timeOfDay: time,
					area: includeWater ? undefined : 'LAND',
				});
				return [
					id,
					{
						category: 'EXPLORATION',
						rewardItems: rewardsMap[id] ?? { 'poke-ball': 10 },
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
				] as [QuestName, Quest];
			})
		),
		...Object.fromEntries(
			timesOfDay.map((time) => {
				const id = `catch all ${time}-time pokemon from ${route.id}`;
				const options = getAllEncountersFor(route.id, {
					timeOfDay: time,
					includeAllDay: true,
					area: includeWater ? undefined : 'LAND',
				});

				return [
					id,
					{
						category: 'EXPLORATION',
						rewardItems: rewardsMap[id] ?? { 'poke-ball': 10 },
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
				] as [QuestName, Quest];
			})
		),
		[`catch a ultra-rare pokemon from ${route.id}`]: {
			category: 'EXPLORATION',
			rewardItems: { 'rare-candy': 1 },
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
				`catch a ultra-rare pokemon from ${route.id}` as QuestName,
			rewardItems: smallExpCandyPackage,
			targetPokemon: berryLures,
			researchPoints: 30,
			category: 'RESEARCH',
			conditionFunction: (s: SaveFile) =>
				berryLures.every((b) => s.pokedex[b].caughtOnRoutes.includes(route.id)),
		};
		const berryLureQuestName =
			`berry-lure all different pokemon from ${route.id}` as QuestName;
		//@ts-expect-error trust me
		res[berryLureQuestName] = berryLureQuest;
	}

	return res as Partial<Record<QuestName, Quest>>;
};

//log the keys and add them to the type def if you add new maps
//console.log(Object.keys(catchQuests).filter((c) => c.includes(Your Route Name)));

export const catchQuests: Partial<Record<QuestName, Quest>> = {
	...catchQuestsForRoute(routeN1, false),
	...catchQuestsForRoute(routeN1E1, false, 'machete certification'),
	...catchQuestsForRoute(routeE1, false, 'sledge hammer certification'),
	...catchQuestsForRoute(routeS1E1, true, 'swimming certification'),
	...catchQuestsForRoute(routeS1, true, 'swimming certification'),
	...catchQuestsForRoute(routeS1W1, true, 'swimming certification'),
	...catchQuestsForRoute(routeW1, true, 'swimming certification'),
	...catchQuestsForRoute(routeN1W1, true, 'buy skiing equipment'),
};
