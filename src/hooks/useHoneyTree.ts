import { useCallback, useContext } from 'react';
import { v4 } from 'uuid';
import { testOpponent } from '../constants/gameData';
import { getRandomIndex } from '../functions/filterTargets';
import { joinInventories } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const HONEY_ENCOUNTER_OPTIONS: OwnedPokemon[] = [
	{
		...testOpponent,
		dexId: 446,
		xp: 200,
		id: v4(),
		caughtOnMap: 'routeN1',
	},
	{
		...testOpponent,
		dexId: 214,
		xp: 200,
		id: v4(),
		caughtOnMap: 'routeN1',
	},
	{
		...testOpponent,
		dexId: 56,
		xp: 200,
		id: v4(),
		caughtOnMap: 'routeN1',
	},
];

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
				{ message: '... and hide nearby' },
				{ message: '...waiting' },
				{ message: '..waiting.' },
				{ message: '.waiting..' },
				{
					message: 'A wild Pokemon is lured in by the honey!',
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
				{ message: '... and hide nearby' },
				{ message: '...waiting' },
				{ message: '..waiting.' },
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
