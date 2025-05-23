import { useCallback, useContext, useMemo } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import { mapDisplayNames, MapId } from '../constants/maps/mapsRecord';
import { pokemonNames } from '../constants/pokemonNames';
import {
	futureDistortionMons,
	pastDistortionMons,
	spaceDistortionMons,
	strongerSwarmMons,
	swarmMons,
} from '../constants/swarmOptions';
import { getRandomEntry } from '../functions/filterTargets';
import { PokemonSwarm, SaveFile } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const getRouteforSwarm = (
	s: SaveFile,
	activeSwarms: PokemonSwarm[]
): MapId | undefined => {
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

	const filteredOptions = options.filter((o) =>
		activeSwarms.every((a) => a.route !== o)
	);

	if (filteredOptions.length === 0) {
		return;
	}
	return getRandomEntry(filteredOptions);
};

export const useSwarmRadar = (): {
	activeSwarms: PokemonSwarm[];
	scan: (mode: 'WEAK' | 'STRONG' | 'DISTORTION') => void;
} => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const addSwarmMessage = useCallback(
		(s: PokemonSwarm) => {
			if (s.type === 'SPACE') {
				addMessage({
					message: `The radar detects a space distortion at ${
						mapDisplayNames[s.route]
					}`,
					needsNoConfirmation: true,
				});
			} else if (s.type === 'FUTURE' || s.type === 'PAST') {
				addMessage({
					message: `The radar detects a time distortion at ${
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

	const activeSwarms: PokemonSwarm[] = useMemo(
		() =>
			[
				saveFile.currentSwarm,
				saveFile.currentStrongSwarm,
				saveFile.currentDistortionSwarm,
			].filter((s) => s !== undefined),
		[
			saveFile.currentDistortionSwarm,
			saveFile.currentStrongSwarm,
			saveFile.currentSwarm,
		]
	);

	const scan = useCallback(
		(mode: 'WEAK' | 'STRONG' | 'DISTORTION') => {
			const route = getRouteforSwarm(saveFile, activeSwarms);

			if (!route) {
				addMessage({ message: `The radar did not detect anything` });
				return;
			}

			const makeSwarm = (): PokemonSwarm => {
				const now = new Date().getTime();

				if (mode === 'STRONG') {
					return {
						pokemon: getRandomEntry(strongerSwarmMons),
						xpMin: 20 ^ 3,
						xpMax: 40 ^ 3,
						leavesAt: now + ONE_HOUR,
						route,
					};
				}
				if (mode === 'DISTORTION') {
					const options = [...futureDistortionMons, ...pastDistortionMons];

					if (saveFile.campUpgrades['space distortion radar']) {
						options.push(...spaceDistortionMons);
					}
					const mon = getRandomEntry(options);
					const type = futureDistortionMons.includes(mon)
						? 'FUTURE'
						: pastDistortionMons.includes(mon)
						? 'PAST'
						: 'SPACE';
					return {
						pokemon: mon,
						type,
						xpMin: 40 ^ 3,
						xpMax: 60 ^ 3,
						leavesAt: now + ONE_HOUR,
						route,
					};
				}
				return {
					pokemon: getRandomEntry(swarmMons),
					xpMin: 125,
					xpMax: 1000,
					leavesAt: now + ONE_HOUR,
					route,
				};
			};

			let newSwarm = makeSwarm();
			if (saveFile.settings?.randomSwarms) {
				newSwarm = { ...newSwarm, pokemon: getRandomEntry([...pokemonNames]) };
			}
			addSwarmMessage(newSwarm);

			if (mode === 'WEAK') {
				patchSaveFileReducer({
					currentSwarm: newSwarm,
				});
			}
			if (mode === 'STRONG') {
				patchSaveFileReducer({
					currentStrongSwarm: newSwarm,
				});
			}
			if (mode === 'DISTORTION') {
				patchSaveFileReducer({
					currentDistortionSwarm: newSwarm,
				});
			}
		},
		[activeSwarms, addMessage, addSwarmMessage, patchSaveFileReducer, saveFile]
	);

	return { activeSwarms, scan };
};
