import { useCallback, useContext } from 'react';
import { v4 } from 'uuid';
import { OPPO_ID } from '../constants/gameData';
import { joinInventories } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { EmptyStatObject } from '../interfaces/StatObject';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

const HONEY_ENCOUNTER: OwnedPokemon = {
	dexId: 446,
	xp: 300,
	id: v4(),
	damage: 0,
	ownerId: OPPO_ID,
	firstMove: { name: 'tackle', usedPP: 0 },
	ball: 'poke-ball',
	nature: 'bold',
	ability: 'compound-eyes',
	happiness: 0,
	stepsWalked: 0,
	maxHp: 0,
	effortValues: EmptyStatObject,
	ppBoostedMoves: [],
	caughtOnMap: 'testMap',
};

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
									team: [HONEY_ENCOUNTER],
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
