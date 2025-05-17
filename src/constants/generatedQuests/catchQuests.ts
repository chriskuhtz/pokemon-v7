import { timesOfDay } from '../../functions/getTimeOfDay';
import { Inventory } from '../../interfaces/Inventory';
import { OverworldMap } from '../../interfaces/OverworldMap';
import { Quest } from '../../interfaces/Quest';
import { CampUpgrade } from '../checkLists/campUpgrades';
import { QuestName } from '../checkLists/questsRecord';
import { routeE1 } from '../maps/routeE1';
import { routeN1 } from '../maps/routeN1';
import { routeN1E1 } from '../maps/routeN1E1';
import { routeN1W1 } from '../maps/routeN1W1';
import { routeS1E1 } from '../maps/routeS1E1';
import { routeS1W1 } from '../maps/routeS1W1';
import { routeW1 } from '../maps/routeW1';

const rewardsMap: Record<string, Partial<Inventory>> = {
	//routeN1
	'catch a MORNING-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'sitrus-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'cheri-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'chesto-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1': {
		'poke-ball': 5,
		'pecha-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeN1': {
		'poke-ball': 5,
		'rawst-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeN1': {
		'poke-ball': 5,
		'aspear-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeN1': {
		'poke-ball': 5,
		'leppa-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeN1': {
		'poke-ball': 5,
		'oran-berry': 2,
		'berry-juice': 1,
	},
	//routeN1E1
	'catch a MORNING-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'persim-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'lum-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'figy-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1E1': {
		'net-ball': 5,
		'mago-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeN1E1': {
		'net-ball': 5,
		'iapapa-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeN1E1': {
		'net-ball': 5,
		'bluk-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeN1E1': {
		'net-ball': 5,
		'nanab-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeN1E1': {
		'net-ball': 5,
		'pinap-berry': 2,
		'berry-juice': 1,
	},
	//routeE1
	'catch a MORNING-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'aguav-berry': 2,
		'berry-juice': 1,
	},
	'catch a DAY-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'wiki-berry': 2,
		'berry-juice': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'razz-berry': 2,
		'berry-juice': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeE1': {
		'quick-ball': 5,
		'wepear-berry': 2,
		'berry-juice': 1,
	},
	'catch all MORNING-time pokemon from routeE1': {
		'quick-ball': 5,
		'pinap-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeE1': {
		'quick-ball': 5,
		'pomeg-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeE1': {
		'quick-ball': 5,
		'kelpsy-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeE1': {
		'quick-ball': 5,
		'qualot-berry': 1,
		'berry-juice': 1,
	},
	//routeS1E1
	'catch a MORNING-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'kee-berry': 2,
	},
	'catch a DAY-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'belue-berry': 2,
	},
	'catch a EVENING-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'rabuta-berry': 2,
	},
	'catch a NIGHT-time exclusive pokemon from routeS1E1': {
		'great-ball': 5,
		'pinap-berry': 2,
	},
	'catch all MORNING-time pokemon from routeS1E1': {
		'great-ball': 5,
		'qualot-berry': 2,
		'berry-juice': 1,
	},
	'catch all DAY-time pokemon from routeS1E1': {
		'great-ball': 5,
		'payapa-berry': 2,
		'berry-juice': 1,
	},
	'catch all EVENING-time pokemon from routeS1E1': {
		'great-ball': 5,
		'magost-berry': 2,
		'berry-juice': 1,
	},
	'catch all NIGHT-time pokemon from routeS1E1': {
		'great-ball': 5,
		'tamato-berry': 1,
		'berry-juice': 1,
	},
	//routeS1W1
	'catch a MORNING-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeS1W1': {
		'great-ball': 5,
		'rage-candy-bar': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeS1W1': {
		'great-ball': 5,
		'rare-candy': 1,
	},
	//routeW1
	'catch a MORNING-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeW1': {
		'quick-ball': 5,
		'lumiose-galette': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeW1': {
		'quick-ball': 5,
		'rare-candy': 1,
	},
	//routeN1W1
	'catch a MORNING-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a DAY-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a EVENING-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch a NIGHT-time exclusive pokemon from routeN1W1': {
		'dusk-ball': 5,
		'pewter-crunchies': 1,
		'escape-rope': 1,
	},
	'catch all MORNING-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
	'catch all DAY-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
	'catch all EVENING-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
	'catch all NIGHT-time pokemon from routeN1W1': {
		'dusk-ball': 5,
		'rare-candy': 1,
	},
};

const catchQuestsForRoute = (
	route: OverworldMap,
	includeWater: boolean,
	requiredUpgrade?: CampUpgrade
): Record<string, Quest> => {
	return {
		...Object.fromEntries(
			timesOfDay.map((time) => {
				const id =
					`catch a ${time}-time exclusive pokemon from ${route.id}` as QuestName;
				return [
					id,
					{
						rewardItems: rewardsMap[id] ?? { 'poke-ball': 10 },
						researchPoints: 10,
						conditionFunction: (s) => {
							return route.possibleEncounters[time].some((e) =>
								s.pokedex[e.name].caughtOnRoutes.includes(route.id)
							);
						},
						targetPokemon: [
							...new Set(route.possibleEncounters[time].map((p) => p.name)),
						],
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
				return [
					id,
					{
						rewardItems: rewardsMap[id] ?? { 'poke-ball': 10 },
						availableAfter: `catch a ${time}-time exclusive pokemon from ${route.id}`,
						researchPoints: 20,
						conditionFunction: (s) => {
							return [
								...route.possibleEncounters.BASE,
								...(includeWater ? route.possibleEncounters.WATER : []),
								...route.possibleEncounters[time],
							].every((e) =>
								s.pokedex[e.name].caughtOnRoutes.includes(route.id)
							);
						},
						targetPokemon: [
							...new Set(
								[
									...route.possibleEncounters.BASE,
									...(includeWater ? route.possibleEncounters.WATER : []),
									...route.possibleEncounters[time],
								].map((p) => p.name)
							),
						],
						targetRoute: route.id,
						kind: 'BULLETIN',
						requiredUpgrade: requiredUpgrade,
					},
				] as [QuestName, Quest];
			})
		),
		[`catch a ultra-rare pokemon from ${route.id}`]: {
			rewardItems: { 'rare-candy': 1 },
			researchPoints: 20,
			conditionFunction: (s) => {
				return [
					...route.possibleEncounters.BASE,
					...route.possibleEncounters.WATER,
					...route.possibleEncounters.NIGHT,
					...route.possibleEncounters.MORNING,
					...route.possibleEncounters.DAY,
					...route.possibleEncounters.EVENING,
				].some(
					(e) =>
						e.rarity === 'ultra-rare' &&
						s.pokedex[e.name].caughtOnRoutes.includes(route.id)
				);
			},
			targetPokemon: [
				...new Set(
					[
						...route.possibleEncounters.BASE,
						...route.possibleEncounters.WATER,
						...route.possibleEncounters.NIGHT,
						...route.possibleEncounters.MORNING,
						...route.possibleEncounters.DAY,
						...route.possibleEncounters.EVENING,
					]
						.filter((p) => p.rarity === 'ultra-rare')
						.map((p) => p.name)
				),
			],
			targetRoute: route.id,
			kind: 'BULLETIN',
			requiredUpgrade: requiredUpgrade,
		},
	};
};

//log the keys and add them to the type def if you add new maps
//console.log( Object.keys(catchQuests));
export const catchQuests: Partial<Record<QuestName, Quest>> = {
	...catchQuestsForRoute(routeN1, false),
	...catchQuestsForRoute(routeN1E1, false, 'machete certification'),
	...catchQuestsForRoute(routeE1, false, 'sledge hammer certification'),
	...catchQuestsForRoute(routeS1E1, true, 'swimming certification'),
	...catchQuestsForRoute(routeS1W1, true, 'swimming certification'),
	...catchQuestsForRoute(routeW1, true, 'swimming certification'),
	...catchQuestsForRoute(routeN1W1, true, 'buy skiing equipment'),
};
