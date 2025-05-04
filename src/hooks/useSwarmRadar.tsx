import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { mapDisplayNames, MapId } from '../constants/maps/mapsRecord';
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

export const swarms: PokemonSwarm[] = swarmMons.map((p) => ({
	pokemon: p,
	route: 'camp',
	leavesAt: 0,
	xpMax: 1000,
	xpMin: 125,
}));
export const useSwarmRadar = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

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
				...getRandomEntry(swarms),
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
	}, [addMessage, patchSaveFileReducer, saveFile]);
};
