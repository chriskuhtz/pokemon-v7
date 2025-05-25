import { useCallback, useContext, useMemo } from 'react';
import { ONE_HOUR } from '../constants/gameData';
import {
	mapDisplayNames,
	MapId,
	mapsRecord,
} from '../constants/maps/mapsRecord';
import { pokemonNames } from '../constants/pokemonNames';
import {
	futureDistortionMons,
	pastDistortionMons,
	rampageOptions,
	spaceDistortionMons,
	strongerSwarmMons,
	swarmMons,
} from '../constants/swarmOptions';
import { getRandomEntry } from '../functions/filterTargets';
import { getRandomAvailableRoute } from '../functions/getRandomAvailableRoute';
import { getRandomPosition } from '../functions/getRandomPosition';
import { PokemonSwarm } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export type ScanMode = 'WEAK' | 'STRONG' | 'DISTORTION' | 'RAMPAGE';
export const useSwarmRadar = (): {
	activeSwarms: PokemonSwarm[];
	scan: (mode: ScanMode) => void;
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

	const handleRampage = useCallback(
		(route: MapId) => {
			if (saveFile.currentRampagingPokemon) {
				return;
			}
			const pokemon = getRandomEntry(rampageOptions);

			addMessage({ message: `rampaging ${pokemon} detected at ${route}` });
			const { x, y } = getRandomPosition(mapsRecord[route]);
			patchSaveFileReducer({
				currentRampagingPokemon: {
					x,
					y,
					id: `${pokemon}-${route}-rampager`,
					name: pokemon,
					route,
				},
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.currentRampagingPokemon]
	);

	const scan = useCallback(
		(mode: ScanMode) => {
			const route = getRandomAvailableRoute(
				saveFile,
				activeSwarms.map((a) => a.route)
			);

			if (!route) {
				addMessage({ message: `The radar did not detect anything` });
				return;
			}

			if (mode === 'RAMPAGE') {
				handleRampage(route);
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
		[
			activeSwarms,
			addMessage,
			addSwarmMessage,
			handleRampage,
			patchSaveFileReducer,
			saveFile,
		]
	);

	return { activeSwarms, scan };
};
