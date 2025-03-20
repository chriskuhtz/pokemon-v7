import { useCallback, useContext } from 'react';
import { PokemonName } from '../constants/pokemonNames';
import { getRandomIndex } from '../functions/filterTargets';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../functions/makeChallengerPokemon';
import { EmptyInventory, joinInventories } from '../interfaces/Inventory';
import { getRandomNature } from '../interfaces/Natures';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const honeyPokemon: PokemonName[] = [
	'burmy',
	'mankey',
	'heracross',
	'pinsir',
	'oddish',
	'weedle',
	'munchlax',
	'petilil',
	'combee',
	'aipom',
];

const HONEY_ENCOUNTER_OPTIONS: OwnedPokemon[] = honeyPokemon.map((h) =>
	makeChallengerPokemon({
		nature: getRandomNature(),
		name: h,
		xp: 200,
		caughtOnMap: 'routeN1',
	})
);

export const useHoneyTree = () => {
	const { putSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages, addMessage } = useContext(MessageQueueContext);

	return useCallback(() => {
		if (saveFile.inventory.honey < 1) {
			addMessage({ message: 'You can see some leftover honey on this tree' });
			return;
		}
		const honeySuccess = Math.random() > 0.5;
		if (honeySuccess) {
			addMultipleMessages([
				{ message: 'You rub some honey on the bark of the tree...' },
				{ message: '... and hide nearby', needsNoConfirmation: true },
				{ message: '...waiting', needsNoConfirmation: true },
				{ message: '..waiting.', needsNoConfirmation: true },
				{ message: '.waiting..', needsNoConfirmation: true },
				{
					message: 'A wild Pokemon is lured in by the honey!',
					needsNoConfirmation: true,
					onRemoval: () => {
						//Start encounter
						putSaveFileReducer({
							...saveFile,
							inventory: joinInventories(
								saveFile.inventory,
								{ honey: 1 },
								true
							),
							meta: {
								activeTab: 'BATTLE',
								currentChallenger: {
									type: 'WILD',
									id: OPPO_ID,
									inventory: EmptyInventory,
									team: [
										{
											...HONEY_ENCOUNTER_OPTIONS[
												getRandomIndex(HONEY_ENCOUNTER_OPTIONS.length)
											],
											caughtOnMap: saveFile.location.mapId,
										},
									],
								},
							},
							mileStones: {
								...saveFile.mileStones,
								hasCaughtAPokemonWithHoney: true,
							},
						});
					},
				},
			]);
		} else {
			addMultipleMessages([
				{ message: 'You rub some honey on the bark of the tree...' },
				{ message: '... and hide nearby', needsNoConfirmation: true },
				{ message: '...waiting', needsNoConfirmation: true },
				{ message: '..waiting.', needsNoConfirmation: true },
				{
					message: 'No Pokemon seem interested in the honey',
					onRemoval: () => {
						putSaveFileReducer({
							...saveFile,
							inventory: joinInventories(
								saveFile.inventory,
								{ honey: 1 },
								true
							),
						});
					},
				},
			]);
		}
	}, [addMessage, addMultipleMessages, putSaveFileReducer, saveFile]);
};
