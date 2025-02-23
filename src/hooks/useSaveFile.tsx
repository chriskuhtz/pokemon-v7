import { useCallback, useEffect, useMemo, useState } from 'react';
import { mapsRecord } from '../constants/checkLists/mapsRecord';
import { MoveName } from '../constants/checkLists/movesCheckList';
import {
	OccupantName,
	occupantsRecord,
} from '../constants/checkLists/occupantsRecord';
import { QuestName, QuestsRecord } from '../constants/checkLists/questsRecord';
import { localStorageId, testState } from '../constants/gameData';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { applyItemToPokemon } from '../functions/applyItemToPokemon';
import { calculateLevelData } from '../functions/calculateLevelData';
import { determineWildPokemon } from '../functions/determineWildPokemon';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { updateItemFunction } from '../functions/updateItemFunction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Inventory, joinInventories } from '../interfaces/Inventory';
import { EncounterChanceItem, ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { RoutesType } from '../interfaces/Routing';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';
import { Message } from './useMessageQueue';

export const getHatchTimeModifier = (team: OwnedPokemon[]): number => {
	return team.some((t) => t.ability === 'magma-armor') ? 2 : 1;
};

export const reduceEncounterRateModifier = (
	steps: number,
	encounterRateModifier?: { factor: number; steps: number }
): { factor: number; steps: number } | undefined => {
	if (!encounterRateModifier) {
		return;
	}
	if (steps >= encounterRateModifier.steps) {
		return;
	}

	return {
		...encounterRateModifier,
		steps: encounterRateModifier.steps - steps,
	};
};

export interface LeaveBattlePayload {
	caughtPokemon: BattlePokemon[];
	updatedInventory: Inventory;
	scatteredCoins: number;
	team: BattlePokemon[];
	outcome: 'WIN' | 'LOSS' | 'DRAW';
	defeatedPokemon: BattlePokemon[];
}

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

	talkToNurseReducer: (id: OccupantName) => void;
	handleOccupantReducer: (id: OccupantName) => void;
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
	leaveBattleReducer: (x: LeaveBattlePayload) => void;
	applyEncounterRateModifierItem: (item: EncounterChanceItem) => void;
}

export const useSaveFile = (
	init: SaveFile,
	addMessage: (x: Message) => void
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
					(h) => h.resetAt < 0 || h.resetAt > newTime
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
		const updatedModifier = reduceEncounterRateModifier(
			1,
			saveFile.encounterRateModifier
		);
		if (saveFile.encounterRateModifier && !updatedModifier) {
			addMessage({ message: `Encounter Rate Modifier ended` });
		}
		setSaveFile(
			{
				...saveFile,
				location: update,
				encounterRateModifier: updatedModifier,
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
							? {
									team: determineWildPokemon(
										team,
										mapsRecord[saveFile.location.mapId]
									),
							  }
							: undefined,
				},
			},
			'navigateAwayFromOverworld'
		);
	};

	const talkToNurseReducer = (id: OccupantName) => {
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
		addMessage({ message: 'Whole Team fully healed' });
	};

	const handleOccupantReducer = (id: OccupantName) => {
		const occ = occupantsRecord[id];

		if (!occ) {
			throw new Error(`what is this occupant supposed to be ${id}`);
		}

		const timer = occ.type === 'BUSH' ? new Date().getTime() + 900000 : -1;

		let newInventory = { ...saveFile.inventory };
		if (occ.type === 'NPC' && occ.gifts) {
			newInventory = joinInventories(newInventory, occ.gifts);
		}
		if (occ.type === 'ITEM' || occ.type === 'HIDDEN_ITEM') {
			const { item, amount } = occ;

			newInventory = joinInventories(newInventory, { [item]: amount });
		}
		const updatedQuests = saveFile.quests;
		if (occ.type === 'NPC' && occ.quest) {
			const { quest } = occ;

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
		const updatedPokemon = applyItemToPokemon(pokemon, item, addMessage, move);
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
		({
			team: updatedTeam,
			updatedInventory,
			caughtPokemon,
			scatteredCoins,
			outcome,
			defeatedPokemon,
		}: LeaveBattlePayload) => {
			let updatedLocation = saveFile.location;

			if (outcome === 'LOSS') {
				if (saveFile.settings?.rogueLike) {
					reset();
					return;
				} else {
					updatedLocation = {
						mapId: 'camp_tent',
						x: 0,
						y: 0,
						orientation: 'DOWN',
						forwardFoot: 'CENTER1',
					};

					putSaveFileReducer({
						...saveFile,
						meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
						location: updatedLocation,
					});
					return;
				}
			}

			const gainedXp = defeatedPokemon.reduce((sum, d) => {
				const { level } = calculateLevelData(d.xp);

				return sum + Math.floor((d.data.base_experience * level) / 7);
			}, 0);

			const filteredTeam = updatedTeam.filter(() => {
				// if (
				// 	saveFile.settings?.disqualifyFaintedPokemon &&
				// 	p.status === 'FAINTED'
				// ) {
				// 	return false;
				// }
				return true;
			});

			const xpPerTeamMember =
				outcome === 'WIN' ? Math.round(gainedXp / filteredTeam.length) : 0;

			const leveledUpTeam = filteredTeam
				.map((p) => {
					const newXp = p.xp + xpPerTeamMember;
					return { ...p, xp: newXp };
				})
				.map((p) => reduceBattlePokemonToOwnedPokemon(p));

			const teamAndCaught = [
				...leveledUpTeam,
				...caughtPokemon.map((c) => ({
					...reduceBattlePokemonToOwnedPokemon(
						{ ...c, ownerId: saveFile.playerId },
						c.ball === 'heal-ball'
					),
					caughtOnMap: saveFile.location.mapId,
				})),
			].map((t, i) => ({ ...t, onTeam: i < 6 }));

			const updatedPokemon = [
				...teamAndCaught,
				...saveFile.pokemon.filter((p) => !team.some((t) => t.id === p.id)),
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

	const applyEncounterRateModifierItem = (item: EncounterChanceItem) => {
		let modifier: { factor: number; steps: number } = { factor: 0, steps: 0 };
		if (saveFile.encounterRateModifier) {
			addMessage({ message: 'There is already a encounter rate modifier' });
			return;
		}
		if (item === 'white-flute') {
			modifier = { factor: 2, steps: 250 };
		}
		if (item === 'black-flute') {
			modifier = { factor: 0.5, steps: 250 };
		}
		if (item === 'repel') {
			modifier = { factor: 0, steps: 100 };
		}
		if (item === 'super-repel') {
			modifier = { factor: 0, steps: 200 };
		}
		if (item === 'max-repel') {
			modifier = { factor: 0, steps: 500 };
		}

		addMessage({ message: `${item} applied` });
		setSaveFile(
			{
				...saveFile,
				encounterRateModifier: modifier,
				inventory: joinInventories(saveFile.inventory, { [item]: 1 }, true),
			},
			'applyEncounterRate'
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
		applyEncounterRateModifierItem,
	};
};
