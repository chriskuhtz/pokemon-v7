import { useCallback, useContext, useMemo } from 'react';
import { ONE_HOUR } from '../constants/gameData/gameData';
import {
	mapDisplayNames,
	MapId,
	mapsRecord,
} from '../constants/gameData/maps/mapsRecord';
import { pokemonNames } from '../constants/pokemonNames';
import { ArrayHelpers } from '../functions/ArrayHelpers';
import { getRandomAvailableRoute } from '../functions/getRandomAvailableRoute';
import { getRandomPosition } from '../functions/getRandomPosition';
import { getRampagers, getRandomSwarmMon } from '../functions/internalDex';
import { SwarmType } from '../interfaces/Pokedex';
import { PokemonSwarm } from '../interfaces/SaveFile';
import { GameDataContext } from './useGameData';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export type ScanMode = 'WEAK' | 'STRONG' | 'DISTORTION' | 'RAMPAGE';
export const useSwarmRadar = (): {
	activeSwarms: PokemonSwarm[];
	scan: (mode: ScanMode) => void;
} => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);
	const { internalDex } = useContext(GameDataContext);

	const addSwarmMessage = useCallback(
		(s: PokemonSwarm) => {
			if (s.type === 'SPACE_DISTORTION') {
				addMessage({
					message: `The radar detects a space distortion at ${
						mapDisplayNames[s.route]
					}`,
					needsNoConfirmation: true,
				});
			} else if (
				s.type === 'FUTURE_DISTORTION' ||
				s.type === 'PAST_DISTORTION'
			) {
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
			const pokemon = ArrayHelpers.getRandomEntry(getRampagers(internalDex));

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
		[
			addMessage,
			internalDex,
			patchSaveFileReducer,
			saveFile.currentRampagingPokemon,
		]
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
						type: 'STRONG',
						pokemon: getRandomSwarmMon('STRONG', internalDex),
						xpMin: 20 * 20 * 20,
						xpMax: 40 * 40 * 40,
						leavesAt: now + ONE_HOUR,
						route,
					};
				}
				if (mode === 'DISTORTION') {
					const options: SwarmType[] = ['FUTURE_DISTORTION', 'PAST_DISTORTION'];

					if (saveFile.campUpgrades['space distortion radar']) {
						options.push('SPACE_DISTORTION');
					}
					const randomOption = ArrayHelpers.getRandomEntry(options);
					const mon = getRandomSwarmMon(randomOption, internalDex);

					return {
						pokemon: mon,
						type: randomOption,
						xpMin: 40 * 40 * 40,
						xpMax: 60 * 60 * 60,
						leavesAt: now + ONE_HOUR,
						route,
					};
				}
				return {
					pokemon: getRandomSwarmMon('WEAK', internalDex),
					type: 'WEAK',
					xpMin: 125,
					xpMax: 1000,
					leavesAt: now + ONE_HOUR,
					route,
				};
			};

			let newSwarm = makeSwarm();
			if (saveFile.settings?.randomSwarms) {
				newSwarm = {
					...newSwarm,
					pokemon: ArrayHelpers.getRandomEntry([...pokemonNames]),
				};
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
			internalDex,
			patchSaveFileReducer,
			saveFile,
		]
	);

	return { activeSwarms, scan };
};
