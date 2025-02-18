import { useCallback, useEffect, useState } from 'react';
import { localStorageId } from '../constants/gameData';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { applyItemToPokemon } from '../functions/applyItemToPokemon';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { joinInventories } from '../interfaces/Inventory';
import { HealingItemType, ItemType } from '../interfaces/Item';
import { OverworldItem } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { QuestName, QuestsRecord } from '../interfaces/Quest';
import { RoutesType } from '../interfaces/Routing';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';
import { AddToastFunction } from './useToasts';

export const useSaveFile = (
	init: SaveFile,
	addToast: AddToastFunction
): {
	saveFile: SaveFile;
	discardItemReducer: (item: ItemType, number: number) => void;
	addItemReducer: (item: ItemType, number: number) => void;
	receiveNewPokemonReducer: (newMon: Omit<OwnedPokemon, 'onTeam'>) => void;
	putSaveFileReducer: (update: SaveFile) => void;
	patchSaveFileReducer: (update: Partial<SaveFile>) => void;
	setActiveTabReducer: (update: RoutesType) => void;
	sellItemReducer: (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => void;
	buyItemReducer: (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => void;
	setCharacterLocationReducer: (update: CharacterLocationData) => void;
	collectItemReducer: (item: [string, OverworldItem]) => void;
	setPokemonReducer: (update: OwnedPokemon[]) => void;

	talkToNurseReducer: (id: number) => void;
	cutBushReducer: (id: number) => void;
	navigateAwayFromOverworldReducer: (to: RoutesType, steps: number) => void;
	applyItemToPokemonReducer: (
		pokemon: OwnedPokemon,
		item: HealingItemType
	) => void;
	fulfillQuestReducer: (q: QuestName) => void;
} => {
	const local = window.localStorage.getItem(localStorageId);
	const loaded = local ? (JSON.parse(local) as SaveFile) : init;

	const [saveFile, s] = useState<SaveFile>(loaded);

	const setSaveFile = useCallback(
		(
			update: SaveFile,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			culprit: string
		) => {
			const newTime = new Date().getTime();

			//console.log('setSaveFile', update, 'CULPRIT:', culprit);
			s({
				...update,
				lastEdited: newTime,
				cutBushes:
					newTime - saveFile.lastEdited > 900000 ? [] : update.cutBushes,
			});
		},
		[saveFile]
	);
	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			-number,
			saveFile.inventory
		);
		setSaveFile({ ...saveFile, inventory: updatedInventory }, 'discardItem');
	};
	const sellItemReducer = (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => {
		const updatedInventory = updateItemFunction(
			item,
			-number,
			saveFile.inventory
		);
		const updatedMoney = saveFile.money + number * pricePerItem;

		setSaveFile(
			{
				...saveFile,
				inventory: updatedInventory,
				money: updatedMoney,
			},
			'sellItem'
		);
	};
	const buyItemReducer = (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => {
		const updatedInventory = updateItemFunction(
			item,
			number,
			saveFile.inventory
		);
		const updatedMoney = saveFile.money - number * pricePerItem;

		setSaveFile(
			{
				...saveFile,
				inventory: updatedInventory,
				money: updatedMoney,
			},
			'buyItem'
		);
	};
	const addItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			number,
			saveFile.inventory
		);
		setSaveFile({ ...saveFile, inventory: updatedInventory }, 'addItem');
	};
	const receiveNewPokemonReducer = (newMon: Omit<OwnedPokemon, 'onTeam'>) => {
		const updatedPokemon = receiveNewPokemonFunction(newMon, saveFile.pokemon);

		setSaveFile({ ...saveFile, pokemon: updatedPokemon }, 'receiveItem');
	};
	const putSaveFileReducer = (update: SaveFile) => {
		setSaveFile(update, 'putSavefile');
	};
	const patchSaveFileReducer = (update: Partial<SaveFile>) =>
		setSaveFile({ ...saveFile, ...update }, 'patchSavefile');
	const setActiveTabReducer = useCallback(
		(update: RoutesType) => {
			setSaveFile(
				{
					...saveFile,
					meta: { ...saveFile.meta, activeTab: update },
				},
				'setactivetab'
			);
		},
		[saveFile, setSaveFile]
	);
	const setCharacterLocationReducer = (update: CharacterLocationData) => {
		setSaveFile(
			{
				...saveFile,
				location: update,
			},
			'setCharacter'
		);
	};
	const collectItemReducer = (item: [string, OverworldItem]) => {
		const id = Number.parseInt(item[0]);
		const updatedInventory = updateItemFunction(
			item[1].item,
			item[1].amount,
			saveFile.inventory
		);
		setSaveFile(
			{
				...saveFile,
				inventory: updatedInventory,
				collectedItems: [
					...saveFile.collectedItems.filter((c) => c !== id),
					id,
				],
			},
			'collectItem'
		);
	};
	const setPokemonReducer = (update: OwnedPokemon[]) => {
		setSaveFile(
			{
				...saveFile,
				pokemon: update,
			},
			'setPokemon'
		);
	};
	const navigateAwayFromOverworldReducer = (
		route: RoutesType,
		stepsTaken: number
	) => {
		console.log('navigate away');
		applyStepsWalkedToTeamReducer(stepsTaken);
		setActiveTabReducer(route);
	};
	const applyStepsWalkedToTeamReducer = (steps: number) => {
		console.log('apply Steps walked');
		setPokemonReducer(
			saveFile.pokemon.map((p) => {
				if (!p.onTeam) {
					return p;
				}

				return applyHappinessFromWalking(p, steps);
			})
		);
	};
	const talkToNurseReducer = (id: number) => {
		setSaveFile(
			{
				...saveFile,
				lastNurse: id,
				pokemon: saveFile.pokemon.map((p) => {
					if (!p.onTeam) {
						return p;
					}

					return fullyHealPokemon(p);
				}),
			},
			'talkToNurse'
		);
		addToast('Whole Team fully healed', 'SUCCESS');
	};
	const cutBushReducer = (id: number) => {
		setSaveFile(
			{
				...saveFile,
				cutBushes: [...(saveFile.cutBushes ?? []), id],
			},
			'cutBush'
		);
	};
	const applyItemToPokemonReducer = (
		pokemon: OwnedPokemon,
		item: HealingItemType
	) => {
		const updatedPokemon = applyItemToPokemon(pokemon, item, addToast);
		const updatedInventory = joinInventories(
			saveFile.inventory,
			{ [item]: 1 },
			true
		);
		setSaveFile(
			{
				...saveFile,
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id == updatedPokemon.id) {
						return updatedPokemon;
					}
					return p;
				}),
				inventory: updatedInventory,
			},
			'applyItem'
		);
	};
	const fulfillQuestReducer = (q: QuestName) => {
		const quest = QuestsRecord[q];
		const updatedInventory = joinInventories(
			saveFile.inventory,
			quest.rewardItems
		);
		setSaveFile(
			{
				...saveFile,
				inventory: updatedInventory,
				quests: { ...saveFile.quests, [q]: 'COLLECTED' },
			},
			'applyItem'
		);
	};

	//SYNC WITH LOCAL STORAGE
	useEffect(() => {
		window.localStorage.setItem(localStorageId, JSON.stringify(saveFile));
	}, [saveFile]);
	//HANDLE START OF GAME
	useEffect(() => {
		if (saveFile.meta.activeTab !== 'SETTINGS' && !saveFile.settings) {
			setActiveTabReducer('SETTINGS');
			return;
		}
		if (
			saveFile.settings &&
			saveFile.meta.activeTab !== 'STARTER_SELECTION' &&
			(saveFile.playerId === '' || saveFile.pokemon.length === 0)
		) {
			setActiveTabReducer('STARTER_SELECTION');
		}
	}, [saveFile, setActiveTabReducer]);

	return {
		saveFile,
		discardItemReducer,
		addItemReducer,
		receiveNewPokemonReducer,
		putSaveFileReducer,
		patchSaveFileReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setCharacterLocationReducer,
		collectItemReducer,
		setPokemonReducer,
		talkToNurseReducer,
		navigateAwayFromOverworldReducer,
		cutBushReducer,
		applyItemToPokemonReducer,
		fulfillQuestReducer,
	};
};
