import { useCallback, useContext } from 'react';
import { PokemonSprite } from '../components/PokemonSprite/PokemonSprite';
import { SpriteIcon } from '../components/SpriteIcon/SpriteIcon';
import { battleSpriteSize, ONE_DAY } from '../constants/gameData/gameData';
import { getBagLimit, getTotalInventoryAmount } from '../functions/getBagLimit';
import { getItemUrl } from '../functions/getItemUrl';
import { getTeamSize } from '../functions/getTeamSize';
import {
	makeChallengerPokemon,
	OPPO_ID,
} from '../functions/makeChallengerPokemon';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory, joinInventories } from '../interfaces/Inventory';
import { getRandomItem } from '../interfaces/Item';
import {
	OverworldChest,
	OverworldHiddenItem,
	OverworldItem,
	OverworldNpc,
	OverworldPokeball,
	OverworldSnorlax,
} from '../interfaces/Occupant';
import { gameData } from '../versions/labyrinth/gameData';
import { MessageQueueContext } from './useMessageQueue';
import { SaveFileContext } from './useSaveFile';

export const useInteractWithSnorlax = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	const interact = useCallback(
		(occ: OverworldSnorlax) => {
			if (saveFile.bag['poke-flute'] <= 0) {
				addMultipleMessages([
					{ message: 'Snorlax is sleeping deeply', needsNoConfirmation: true },
					{ message: 'Maybe a song could wake it', needsNoConfirmation: true },
				]);
				return;
			} else {
				const challenger: Challenger = {
					type: 'WILD',
					id: OPPO_ID,
					inventory: EmptyInventory,
					team: [
						makeChallengerPokemon({
							name: 'snorlax',
							xp: 64000,
						}),
					],
				};
				const now = new Date().getTime();

				addMultipleMessages([
					{ message: 'You play the pokeflute' },
					{ message: 'Snorlax wakes up grumpily ...' },
					{
						message: 'and attacks',
						onRemoval: () => {
							patchSaveFileReducer({
								mileStones: { ...saveFile.mileStones, hasWokenASnorlax: true },
								meta: { currentChallenger: challenger, activeTab: 'BATTLE' },
								handledOccupants: [
									...saveFile.handledOccupants,
									{ id: occ.id, resetAt: now + ONE_DAY },
								],
							});
						},
					},
				]);
			}
		},
		[
			addMultipleMessages,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.handledOccupants,
			saveFile.mileStones,
		]
	);

	return interact;
};

export const useInteractWithOverworldChest = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);

	return useCallback(
		(chest: OverworldChest) => {
			const chestData = window.localStorage.getItem(chest.id ?? '');
			if (!chestData) {
				window.localStorage.setItem(
					chest.id,
					JSON.stringify(joinInventories(EmptyInventory, chest.contents))
				);
			}
			patchSaveFileReducer({
				...saveFile,
				meta: { activeTab: 'CHEST', currentChestId: chest.id },
				handledOccupants: [
					...saveFile.handledOccupants.filter((h) => h.id !== chest.id),
					{ id: chest.id, resetAt: -1 },
				],
			});

			return;
		},
		[patchSaveFileReducer, saveFile]
	);
};

export const useInteractWithNPC = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(occ: OverworldNpc) => {
			if (!saveFile.handledOccupants.some((h) => h.id === occ.id)) {
				addMultipleMessages(
					[
						...occ.unhandledMessage.map((d, i) => ({
							icon: <SpriteIcon sprite={occ.sprite} />,
							message: d,
							onRemoval:
								i === occ.unhandledMessage.length - 1
									? () => {
											const updatedQuests = saveFile.quests;
											if (occ.quest) {
												const { quest } = occ;
												if (updatedQuests[quest] === 'INACTIVE') {
													updatedQuests[quest] = 'ACTIVE';
												}
											}
											patchSaveFileReducer({
												...saveFile,
												bag: joinInventories(
													saveFile.bag,
													occ.gifts ?? EmptyInventory
												),
												quests: updatedQuests,
												handledOccupants: [
													...saveFile.handledOccupants,
													{ id: occ.id, resetAt: -1 },
												],
											});
									  }
									: undefined,
						})),
						...Object.entries(occ.gifts ?? {}).map(([item, amount]) => ({
							message: `received ${amount} ${item}`,
						})),
						occ.quest ? { message: `new quest: ${occ.quest}` } : undefined,
					].filter((m) => m !== undefined)
				);
			} else {
				addMultipleMessages(
					(occ.handledMessage ?? occ.unhandledMessage).map((d) => {
						return {
							icon: <SpriteIcon sprite={occ.sprite} />,
							message: d,
						};
					})
				);
			}
		},
		[addMultipleMessages, patchSaveFileReducer, saveFile]
	);
};

export const useInteractWithOverworldItem = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	return useCallback(
		(data: OverworldItem | OverworldHiddenItem) => {
			const occ = saveFile.settings?.randomOverworldItems
				? { ...data, item: getRandomItem() }
				: data;
			const { item, amount } = occ;
			let newInventory = { ...saveFile.bag };
			newInventory = joinInventories(newInventory, { [item]: amount });

			if (
				getTotalInventoryAmount(newInventory) > getBagLimit(saveFile, gameData)
			) {
				addMessage({
					message: `Your Bag is full,  cant carry ${amount} more items`,
					needsNoConfirmation: true,
				});
				return;
			} else
				addMessage({
					icon: <img src={getItemUrl(item)} height={battleSpriteSize} />,
					message: `Found ${amount} ${item}`,
					needsNoConfirmation: true,
					onRemoval: () => {
						patchSaveFileReducer({
							...saveFile,
							bag: newInventory,
							handledOccupants: [
								...saveFile.handledOccupants,
								{ id: occ.id, resetAt: -1 },
							],
						});
					},
				});
		},
		[addMessage, patchSaveFileReducer, saveFile]
	);
};
export const useInteractWithOverworldPokeball = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return useCallback(
		(occ: OverworldPokeball) => {
			addMultipleMessages([
				...occ.dialogue.map((d) => ({
					message: d,
				})),
				{
					message: `Received a ${occ.pokemon.name}`,
					onRemoval: () =>
						patchSaveFileReducer({
							...saveFile,
							pokemon: receiveNewPokemonFunction(
								{ ...occ.pokemon, ownerId: saveFile.playerId },
								saveFile.pokemon,
								getTeamSize(saveFile, gameData)
							),
							handledOccupants: [
								...saveFile.handledOccupants,
								{ id: occ.id, resetAt: -1 },
							],
						}),
					icon: <PokemonSprite name={occ.pokemon.name} />,
				},
			]);
		},
		[addMultipleMessages, patchSaveFileReducer, saveFile]
	);
};
