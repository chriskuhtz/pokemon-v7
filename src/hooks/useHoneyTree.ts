import { useCallback, useContext } from 'react';
import { getHoneyEncounters } from '../constants/internalDex';
import { getRandomIndex } from '../functions/filterTargets';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../functions/makeChallengerPokemon';
import { EmptyInventory, joinInventories } from '../interfaces/Inventory';
import { getRandomNature } from '../interfaces/Natures';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { LocationContext } from './LocationProvider';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const HONEY_ENCOUNTER_OPTIONS: OwnedPokemon[] = getHoneyEncounters().map((h) =>
	makeChallengerPokemon({
		nature: getRandomNature(),
		name: h,
		xp: 1000,
		caughtOnMap: 'camp',
	})
);

export const useHoneyTree = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const { addMultipleMessages, addMessage } = useContext(MessageQueueContext);

	return useCallback(() => {
		if (saveFile.bag.honey < 1) {
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
						patchSaveFileReducer({
							bag: joinInventories(saveFile.bag, { honey: 1 }, true),
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
											caughtOnMap: location.mapId,
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
						patchSaveFileReducer({
							...saveFile,
							bag: joinInventories(saveFile.bag, { honey: 1 }, true),
						});
					},
				},
			]);
		}
	}, [
		addMessage,
		addMultipleMessages,
		location.mapId,
		patchSaveFileReducer,
		saveFile,
	]);
};
