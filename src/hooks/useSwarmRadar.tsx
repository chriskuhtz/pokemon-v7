import { useCallback, useContext } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { mapDisplayNames } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { getRandomEntry } from '../functions/filterTargets';
import { PokemonSwarm } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const swarmMons: PokemonName[] = [
	'mudkip',
	'treecko',
	'torchic',
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
	route: 'routeN1',
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
				} on ${mapDisplayNames[saveFile.currentSwarm.route]}`,
				needsNoConfirmation: true,
			});
		} else if (!saveFile.nextSwarmReadyAt || now > saveFile.nextSwarmReadyAt) {
			const randomSwarm = getRandomEntry(swarms);
			addMessage({
				message: `The radar detects swarms of ${randomSwarm.pokemon} on ${
					mapDisplayNames[randomSwarm.route]
				}`,
				needsNoConfirmation: true,
			});

			patchSaveFileReducer({
				currentSwarm: { ...randomSwarm, leavesAt: now + ONE_HOUR },
				nextSwarmReadyAt: now + ONE_HOUR * 6,
			});
		} else {
			addMessage({
				message: 'No Swarms detected, check back later',
				needsNoConfirmation: true,
			});
		}
	}, [addMessage, patchSaveFileReducer, saveFile]);
};
