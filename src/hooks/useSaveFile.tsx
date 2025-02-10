import { useEffect, useState } from 'react';
import { localStorageId } from '../constants/gameData';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { ItemType } from '../interfaces/Item';
import { OverworldItem } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { RoutesType } from '../interfaces/Routing';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';

export const useSaveFile = (
	init: SaveFile,
	useLocalStorage?: boolean
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
	applyStepsWalkedToTeamReducer: (steps: number) => void;
	talkToNurseReducer: (id: number) => void;
} => {
	const local = window.localStorage.getItem(localStorageId);
	const loaded =
		useLocalStorage && local ? (JSON.parse(local) as SaveFile) : init;

	const [saveFile, setSaveFile] = useState<SaveFile>(loaded);

	useEffect(() => {
		if (useLocalStorage) {
			window.localStorage.setItem(localStorageId, JSON.stringify(saveFile));
		}
	}, [saveFile, useLocalStorage]);

	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			-number,
			saveFile.inventory
		);
		setSaveFile((gm) => ({ ...gm, inventory: updatedInventory }));
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

		setSaveFile((gm) => ({
			...gm,
			inventory: updatedInventory,
			money: updatedMoney,
		}));
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

		setSaveFile((gm) => ({
			...gm,
			inventory: updatedInventory,
			money: updatedMoney,
		}));
	};
	const addItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			number,
			saveFile.inventory
		);
		setSaveFile((gm) => ({ ...gm, inventory: updatedInventory }));
	};
	const receiveNewPokemonReducer = (newMon: Omit<OwnedPokemon, 'onTeam'>) => {
		const updatedPokemon = receiveNewPokemonFunction(newMon, saveFile.pokemon);

		setSaveFile((gm) => ({ ...gm, pokemon: updatedPokemon }));
	};
	const putSaveFileReducer = (update: SaveFile) => {
		setSaveFile(update);
	};
	const patchSaveFileReducer = (update: Partial<SaveFile>) =>
		setSaveFile((s) => ({ ...s, ...update }));

	const setActiveTabReducer = (update: RoutesType) => {
		setSaveFile((s) => ({ ...s, meta: { ...s.meta, activeTab: update } }));
	};

	const setCharacterLocationReducer = (update: CharacterLocationData) => {
		setSaveFile((s) => ({
			...s,
			location: update,
		}));
	};

	const collectItemReducer = (item: [string, OverworldItem]) => {
		const id = Number.parseInt(item[0]);
		const updatedInventory = updateItemFunction(
			item[1].item,
			item[1].amount,
			saveFile.inventory
		);
		setSaveFile((gm) => ({
			...gm,
			inventory: updatedInventory,
			collectedItems: [...saveFile.collectedItems.filter((c) => c !== id), id],
		}));
	};
	const setPokemonReducer = (update: OwnedPokemon[]) => {
		setSaveFile((gm) => ({
			...gm,
			pokemon: update,
		}));
	};
	const applyStepsWalkedToTeamReducer = (steps: number) => {
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
		setSaveFile((gm) => ({
			...gm,
			lastNurse: id,
			pokemon: gm.pokemon.map((p) => {
				if (!p.onTeam) {
					return p;
				}

				return {
					...p,
					damage: 0,
					primaryAilment: undefined,
					firstMove: { ...p.firstMove, usedPP: 0 },
					secondMove: p.secondMove ? { ...p.secondMove, usedPP: 0 } : undefined,
					thirdMove: p.thirdMove ? { ...p.thirdMove, usedPP: 0 } : undefined,
					fourthMove: p.fourthMove ? { ...p.fourthMove, usedPP: 0 } : undefined,
				};
			}),
		}));
	};

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
		applyStepsWalkedToTeamReducer,
		talkToNurseReducer,
	};
};
