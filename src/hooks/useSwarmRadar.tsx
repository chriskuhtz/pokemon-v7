import { useCallback, useContext, useMemo } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { mapDisplayNames, MapId, mapIds } from '../constants/maps/mapsRecord';
import { PokemonName, pokemonNames } from '../constants/pokemonNames';
import { getRandomEntry } from '../functions/filterTargets';
import { PokemonSwarm, SaveFile } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const getRouteforSwarm = (s: SaveFile): MapId => {
	const options: MapId[] = ['routeN1'];

	if (s.campUpgrades['machete certification']) {
		options.push('routeN1E1');
	}
	if (s.campUpgrades['sledge hammer certification']) {
		options.push('routeE1');
	}
	if (s.campUpgrades['shovel certification']) {
		options.push('onixCave');
	}
	if (s.campUpgrades['swimming certification']) {
		options.push('routeS1E1', 'routeS1W1', 'routeW1', 'caveW1', 'routeS1');
	}
	if (s.campUpgrades['buy skiing equipment']) {
		options.push('routeN1W1');
	}
	return getRandomEntry(options);
};
const swarmMons: PokemonName[] = [
	'cyndaquil',
	'chikorita',
	'totodile',
	'mudkip',
	'treecko',
	'torchic',
	'chimchar',
	'piplup',
	'turtwig',
	'snivy',
	'tepig',
	'oshawott',
	'chespin',
	'fennekin',
	'froakie',
	'popplio',
	'rowlet',
	'litten',
	'grookey',
	'scorbunny',
	'sobble',
	'fuecoco',
	'quaxly',
	'sprigatito',
];
const strongerSwarmMons: PokemonName[] = [
	'donphan',
	'wigglytuff',
	'amoonguss',
	'misdreavus',
	'volcarona',
	'magneton',
	'shelgon',
	'cyclizar',
	'delibird',
	'hariyama',
	'zweilous',
	'pupitar',
	'kirlia',
];
const pastDistortionMons: PokemonName[] = [
	'great-tusk',
	'scream-tail',
	'flutter-mane',
	'brute-bonnet',
	'slither-wing',
	'sandy-shocks',
	'roaring-moon',
];
const futureDistortionMons: PokemonName[] = [
	'iron-treads',
	'iron-bundle',
	'iron-hands',
	'iron-jugulis',
	'iron-moth',
	'iron-thorns',
	'iron-valiant',
];
const spaceDistortionMons: PokemonName[] = [
	'nihilego',
	'buzzwole',
	'pheromosa',
	'xurkitree',
	'celesteela',
	'kartana',
	'guzzlord',
	'poipole',
	'stakataka',
	'blacephalon',
];

export const useSwarmRadar = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const availableSwarms: PokemonSwarm[] = useMemo(() => {
		const weakSwarms = swarmMons.map((p) => ({
			pokemon: p,
			route: mapIds[0],
			leavesAt: 0,
			xpMax: 1000,
			xpMin: 125,
		}));

		const options = [weakSwarms];

		const strongerSwarms = strongerSwarmMons.map((p) => ({
			pokemon: p,
			route: mapIds[0],
			leavesAt: 0,
			xpMax: 64000,
			xpMin: 8000,
		}));
		if (saveFile.campUpgrades['upgraded swarm radar']) {
			options.push(strongerSwarms);
		}
		const pastSwarms = pastDistortionMons.map((p) => ({
			pokemon: p,
			route: mapIds[0],
			leavesAt: 0,
			xpMax: 60 * 60 * 60,
			xpMin: 40 * 40 * 40,
		}));
		const futureSwarms = futureDistortionMons.map((p) => ({
			pokemon: p,
			route: mapIds[0],
			leavesAt: 0,
			xpMax: 60 * 60 * 60,
			xpMin: 40 * 40 * 40,
		}));
		if (saveFile.campUpgrades['time distortion radar']) {
			options.push(pastSwarms, futureSwarms);
		}
		const ultrabeastSwarms = spaceDistortionMons.map((p) => ({
			pokemon: p,
			route: mapIds[0],
			leavesAt: 0,
			xpMax: 60 * 60 * 60,
			xpMin: 50 * 50 * 50,
		}));
		if (saveFile.campUpgrades['space distortion radar']) {
			options.push(ultrabeastSwarms);
		}
		return getRandomEntry(options);
	}, [saveFile.campUpgrades]);

	const addSwarmMessage = useCallback(
		(s: PokemonSwarm) => {
			if (s.type) {
				addMessage({
					message: `The radar detects a ${s.type} distortion at ${
						mapDisplayNames[s.route]
					}`,
					needsNoConfirmation: true,
				});
			} else
				addMessage({
					message: `The radar detects swarms of ${s.pokemon} at ${
						mapDisplayNames[s.route]
					}`,
					needsNoConfirmation: true,
				});
		},
		[addMessage]
	);

	return useCallback(() => {
		const now = new Date().getTime();
		//inform about current swarm
		if (saveFile.currentSwarm) {
			addSwarmMessage(saveFile.currentSwarm);
		}
		//create new swarm
		else if (!saveFile.nextSwarmReadyAt || now > saveFile.nextSwarmReadyAt) {
			let swarm = {
				...getRandomEntry(availableSwarms),
				route: getRouteforSwarm(saveFile),
			};

			if (saveFile.settings?.randomSwarms) {
				swarm = { ...swarm, pokemon: getRandomEntry([...pokemonNames]) };
			}
			addSwarmMessage(swarm);

			patchSaveFileReducer({
				currentSwarm: { ...swarm, leavesAt: now + ONE_HOUR },
				nextSwarmReadyAt: now + ONE_HOUR,
			});
		} else {
			addMessage({
				message: 'No Swarms detected, check back later',
				needsNoConfirmation: true,
			});
		}
	}, [
		addMessage,
		addSwarmMessage,
		availableSwarms,
		patchSaveFileReducer,
		saveFile,
	]);
};
