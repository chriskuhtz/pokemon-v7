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
		options.push('routeS1E1', 'routeS1W1', 'routeW1', 'caveW1');
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

export const useSwarmRadar = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const availableSwarms: PokemonSwarm[] = useMemo(() => {
		const res = swarmMons.map((p) => ({
			pokemon: p,
			route: mapIds[0],
			leavesAt: 0,
			xpMax: 1000,
			xpMin: 125,
		}));
		if (saveFile.campUpgrades['upgraded swarm radar']) {
			return res.concat(
				...strongerSwarmMons.map((p) => ({
					pokemon: p,
					route: mapIds[0],
					leavesAt: 0,
					xpMax: 64000,
					xpMin: 8000,
				}))
			);
		}
		return res;
	}, [saveFile.campUpgrades]);

	return useCallback(() => {
		const now = new Date().getTime();
		if (saveFile.currentSwarm) {
			addMessage({
				message: `The radar detects swarms of ${
					saveFile.currentSwarm.pokemon
				} at ${mapDisplayNames[saveFile.currentSwarm.route]}`,
				needsNoConfirmation: true,
			});
		} else if (!saveFile.nextSwarmReadyAt || now > saveFile.nextSwarmReadyAt) {
			let swarm = {
				...getRandomEntry(availableSwarms),
				route: getRouteforSwarm(saveFile),
			};

			if (saveFile.settings?.randomSwarms) {
				swarm = { ...swarm, pokemon: getRandomEntry([...pokemonNames]) };
			}
			addMessage({
				message: `The radar detects swarms of ${swarm.pokemon} at ${
					mapDisplayNames[swarm.route]
				}`,
				needsNoConfirmation: true,
			});

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
	}, [addMessage, availableSwarms, patchSaveFileReducer, saveFile]);
};
