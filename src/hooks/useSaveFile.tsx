import { useCallback, useEffect, useMemo, useState } from 'react';
import { MoveName } from '../constants/checkLists/movesCheckList';
import { occupantsRecord } from '../constants/checkLists/occupantsRecord';
import { QuestName, QuestsRecord } from '../constants/checkLists/questsRecord';
import { localStorageId, testState } from '../constants/gameData';
import { meadow } from '../constants/maps/meadow';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { applyItemToPokemon } from '../functions/applyItemToPokemon';
import { determineWildPokemon } from '../functions/determineWildPokemon';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { updateItemFunction } from '../functions/updateItemFunction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Inventory, joinInventories } from '../interfaces/Inventory';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { RoutesType } from '../interfaces/Routing';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';
import { AddToastFunction } from './useToasts';

export const getHatchTimeModifier = (team: OwnedPokemon[]): number => {
	return team.some((t) => t.ability === 'magma-armor') ? 2 : 1;
};

export interface UseSaveFile {
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
	setPokemonReducer: (update: OwnedPokemon[]) => void;

	talkToNurseReducer: (id: number) => void;
	handleOccupantReducer: (id: number) => void;
	navigateAwayFromOverworldReducer: (to: RoutesType, steps: number) => void;
	applyItemToPokemonReducer: (
		pokemon: OwnedPokemon,
		item: ItemType,
		move?: MoveName
	) => void;
	fulfillQuestReducer: (q: QuestName) => void;
	changeHeldItemReducer: (pokemonId: string, newItem?: ItemType) => void;
	useSacredAshReducer: () => void;
	reset: () => void;
	leaveBattleReducer: (
		caughtPokemon: BattlePokemon[],
		updatedInventory: Inventory,
		scatteredCoins: number,
		team: BattlePokemon[]
	) => void;
}

export const useSaveFile = (
	init: SaveFile,
	addToast: AddToastFunction
): UseSaveFile => {
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
				handledOccupants: update.handledOccupants.filter(
					(h) => h.resetAt > newTime
				),
			});
		},
		[]
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
	const putSaveFileReducer = useCallback(
		(update: SaveFile) => {
			setSaveFile(update, 'putSavefile');
		},
		[setSaveFile]
	);
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

		setSaveFile(
			{
				...saveFile,
				pokemon: saveFile.pokemon.map((p) => {
					if (!p.onTeam) {
						return p;
					}

					return applyHappinessFromWalking(p, stepsTaken);
				}),
				meta: {
					activeTab: route,
					currentChallenger:
						route === 'BATTLE'
							? { team: determineWildPokemon(team, meadow), id: -1 }
							: undefined,
				},
			},
			'navigateAwayFromOverworld'
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
	const useSacredAshReducer = () => {
		setSaveFile(
			{
				...saveFile,
				inventory: joinInventories(
					saveFile.inventory,
					{ 'sacred-ash': 1 },
					true
				),
				pokemon: saveFile.pokemon.map((p) => {
					if (!p.onTeam) {
						return p;
					}

					return fullyHealPokemon(p);
				}),
			},
			'sacredAsh'
		);
		addToast('Whole Team fully healed', 'SUCCESS');
	};

	const handleOccupantReducer = (id: number) => {
		const occ = occupantsRecord[id];

		if (!occ) {
			throw new Error(`what is this occupant supposed to be ${id}`);
		}
		const timer = new Date().getTime() + 900000;

		let newInventory = { ...saveFile.inventory };
		if (occ.type === 'NPC' && occ.gifts) {
			Object.entries(occ.gifts).forEach(([item, amount]) => {
				addToast(`received ${amount} ${item}`, 'SUCCESS');
			});

			newInventory = joinInventories(newInventory, occ.gifts);
		}
		if (occ.type === 'ITEM' || occ.type === 'HIDDEN_ITEM') {
			const { item, amount } = occ;
			addToast(`found ${amount} ${item}`, 'SUCCESS');

			newInventory = joinInventories(newInventory, { [item]: amount });
		}
		const updatedQuests = saveFile.quests;
		if (occ.type === 'NPC' && occ.quest) {
			const { quest } = occ;
			addToast(`new quest: ${quest}`);

			if (updatedQuests[quest] === 'INACTIVE') {
				updatedQuests[quest] = 'ACTIVE';
			}
		}

		setSaveFile(
			{
				...saveFile,
				inventory: newInventory,
				quests: updatedQuests,
				meta: {
					activeTab:
						occ.type === 'TRAINER' ? 'BATTLE' : saveFile.meta.activeTab,
					currentChallenger:
						occ.type === 'TRAINER' ? { team: occ.team, id } : undefined,
				},
				handledOccupants: [
					...saveFile.handledOccupants,
					{ id, resetAt: timer },
				],
			},
			'handleOccupant'
		);
	};
	const applyItemToPokemonReducer = (
		pokemon: OwnedPokemon,
		item: ItemType,
		move?: MoveName
	) => {
		const updatedPokemon = applyItemToPokemon(pokemon, item, addToast, move);
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
	const changeHeldItemReducer = (pokemonId: string, newItem?: ItemType) => {
		const heldItem = saveFile.pokemon.find(
			(p) => p.id === pokemonId
		)?.heldItemName;

		let updatedInventory = { ...saveFile.inventory };

		if (heldItem) {
			updatedInventory = joinInventories(updatedInventory, { [heldItem]: 1 });
		}
		if (newItem) {
			updatedInventory = joinInventories(updatedInventory, { [newItem]: -1 });
		}

		patchSaveFileReducer({
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id === pokemonId) {
					return { ...p, heldItemName: newItem };
				}
				return p;
			}),
			inventory: updatedInventory,
		});
	};
	const reset = useCallback(() => {
		setSaveFile(testState, 'reset');
	}, [setSaveFile]);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const leaveBattleReducer = useCallback(
		(
			caughtPokemon: BattlePokemon[],
			updatedInventory: Inventory,
			scatteredCoins: number,
			updatedTeam: BattlePokemon[]
		) => {
			const filteredTeam = updatedTeam
				.filter((p) => {
					if (
						saveFile.settings?.disqualifyFaintedPokemon &&
						p.status === 'FAINTED'
					) {
						return false;
					}

					return true;
				})
				.map((t) => reduceBattlePokemonToOwnedPokemon(t));

			if (filteredTeam.length === 0) {
				reset();
			}
			const updatedPokemon = [
				...filteredTeam,
				...saveFile.pokemon.filter((p) => !team.some((t) => t.id === p.id)),
				...caughtPokemon.map((c) => {
					return {
						...reduceBattlePokemonToOwnedPokemon(c, c.ball === 'heal-ball'),
						ownerId: saveFile.playerId,
					};
				}),
			];
			putSaveFileReducer({
				...saveFile,
				inventory: updatedInventory,
				money: saveFile.money + scatteredCoins,
				pokemon: updatedPokemon,
				meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
			});
		},
		[putSaveFileReducer, reset, saveFile, team]
	);

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
			saveFile.meta.activeTab !== 'SPRITE_SELECTION' &&
			saveFile.sprite === ''
		) {
			setActiveTabReducer('SPRITE_SELECTION');
			return;
		}
		if (
			saveFile.settings &&
			saveFile.sprite &&
			saveFile.meta.activeTab !== 'STARTER_SELECTION' &&
			(saveFile.playerId === '' || saveFile.pokemon.length === 0)
		) {
			setActiveTabReducer('STARTER_SELECTION');
		}
	}, [saveFile, setActiveTabReducer]);

	return {
		reset,
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
		setPokemonReducer,
		talkToNurseReducer,
		navigateAwayFromOverworldReducer,
		handleOccupantReducer,
		applyItemToPokemonReducer,
		fulfillQuestReducer,
		changeHeldItemReducer,
		useSacredAshReducer,
		leaveBattleReducer,
	};
};
