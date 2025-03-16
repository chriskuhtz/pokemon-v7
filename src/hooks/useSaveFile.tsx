import React, {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MoveName } from '../constants/checkLists/movesCheckList';

import { QuestName, QuestsRecord } from '../constants/checkLists/questsRecord';
import { localStorageId, testState } from '../constants/gameData';
import { mapsRecord } from '../constants/maps/mapsRecord';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { applyItemToPokemon } from '../functions/applyItemToPokemon';
import { calculateLevelData } from '../functions/calculateLevelData';
import { determineWildPokemon } from '../functions/determineWildPokemon';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { getRewardForQuest } from '../functions/getRewardForQuest';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { reduceEncounterRateModifier } from '../functions/reduceEncounterRateModifier';
import { updateItemFunction } from '../functions/updateItemFunction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Inventory, joinInventories } from '../interfaces/Inventory';
import { EncounterChanceItem, ItemType } from '../interfaces/Item';
import { Occupant } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { RoutesType } from '../interfaces/Routing';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';
import { Message } from './useMessageQueue';

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

	talkToNurseReducer: (id: string) => void;
	handleOccupantReducer: (occ: Occupant) => void;
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
	evolvePokemonReducer: (
		id: string,
		newDexId: number,
		name: string,
		newName: string,
		consumeHeldItem: boolean,
		consumedItem?: ItemType
	) => void;
}

const useSaveFile = (
	init: SaveFile,
	addMessage: (x: Message) => void
): UseSaveFile => {
	const local = window.localStorage.getItem(localStorageId);
	const loaded = local ? (JSON.parse(local) as SaveFile) : init;

	const [saveFile, s] = useState<SaveFile>(loaded);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const setSaveFile = useCallback((update: SaveFile) => {
		const newTime = new Date().getTime();

		s({
			...update,
			lastEdited: newTime,
			handledOccupants: update.handledOccupants.filter(
				(h) => h.resetAt < 0 || h.resetAt > newTime
			),
		});
	}, []);
	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			-number,
			saveFile.inventory
		);
		setSaveFile({ ...saveFile, inventory: updatedInventory });
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

		setSaveFile({
			...saveFile,
			inventory: updatedInventory,
			money: updatedMoney,
		});
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

		setSaveFile({
			...saveFile,
			inventory: updatedInventory,
			money: updatedMoney,
		});
	};
	const addItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(
			item,
			number,
			saveFile.inventory
		);
		setSaveFile({ ...saveFile, inventory: updatedInventory });
	};
	const receiveNewPokemonReducer = (newMon: Omit<OwnedPokemon, 'onTeam'>) => {
		const updatedPokemon = receiveNewPokemonFunction(newMon, saveFile.pokemon);

		setSaveFile({ ...saveFile, pokemon: updatedPokemon });
	};
	const putSaveFileReducer = useCallback(
		(update: SaveFile) => {
			setSaveFile(update);
		},
		[setSaveFile]
	);
	const patchSaveFileReducer = (update: Partial<SaveFile>) =>
		setSaveFile({ ...saveFile, ...update });
	const setActiveTabReducer = useCallback(
		(update: RoutesType) => {
			setSaveFile({
				...saveFile,
				meta: { ...saveFile.meta, activeTab: update },
			});
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
		setSaveFile({
			...saveFile,
			location: update,
			encounterRateModifier: updatedModifier,
		});
	};

	const setPokemonReducer = (update: OwnedPokemon[]) => {
		setSaveFile({
			...saveFile,
			pokemon: update,
		});
	};
	const navigateAwayFromOverworldReducer = (
		route: RoutesType,
		stepsTaken: number
	) => {
		console.log('navigate away');

		setSaveFile({
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
		});
	};

	const talkToNurseReducer = (id: string) => {
		setSaveFile({
			...saveFile,
			lastNurse: id,
			pokemon: saveFile.pokemon.map((p) => {
				if (!p.onTeam) {
					return p;
				}

				return fullyHealPokemon(p);
			}),
		});
	};
	const useSacredAshReducer = () => {
		setSaveFile({
			...saveFile,
			inventory: joinInventories(saveFile.inventory, { 'sacred-ash': 1 }, true),
			pokemon: saveFile.pokemon.map((p) => {
				if (!p.onTeam) {
					return p;
				}

				return fullyHealPokemon(p);
			}),
		});
		addMessage({ message: 'Whole Team fully healed' });
	};

	const handleOccupantReducer = (occ: Occupant) => {
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
		setSaveFile({
			...saveFile,
			inventory: newInventory,
			quests: updatedQuests,
			meta: {
				activeTab: occ.type === 'TRAINER' ? 'BATTLE' : saveFile.meta.activeTab,
				currentChallenger:
					occ.type === 'TRAINER' ? { team: occ.team, id: occ.id } : undefined,
			},
			handledOccupants: [
				...saveFile.handledOccupants,
				{ id: occ.id, resetAt: timer },
			],
		});
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
		setSaveFile({
			...saveFile,
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id == updatedPokemon.id) {
					return updatedPokemon;
				}
				return p;
			}),
			inventory: updatedInventory,
		});
	};

	const fulfillQuestReducer = (q: QuestName) => {
		const quest = QuestsRecord[q];

		const reward = getRewardForQuest(q);
		const updatedInventory = joinInventories(saveFile.inventory, reward);
		setSaveFile({
			...saveFile,
			inventory: updatedInventory,
			quests: { ...saveFile.quests, [q]: 'COLLECTED' },
			researchPoints: saveFile.researchPoints + quest.researchPoints,
		});
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
		setSaveFile(testState);
	}, [setSaveFile]);

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
						mapId: 'camp',
						x: 6,
						y: 5,
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
		setSaveFile({
			...saveFile,
			encounterRateModifier: modifier,
			inventory: joinInventories(saveFile.inventory, { [item]: 1 }, true),
		});
	};
	const evolvePokemonReducer = (
		id: string,
		newDexId: number,
		name: string,
		newName: string,
		consumeHeldItem: boolean,
		consumedItem?: ItemType
	) => {
		const updatedInventory = consumedItem
			? joinInventories(
					saveFile.inventory,
					{
						[consumedItem]: 1,
					},
					true
			  )
			: saveFile.inventory;

		addMessage({
			message: `Your ${name} evolved into ${newName}`,
			needsNoConfirmation: true,
		});

		patchSaveFileReducer({
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id === id) {
					return {
						...p,
						dexId: newDexId,
						heldItemName: consumeHeldItem ? undefined : p.heldItemName,
					};
				}
				return p;
			}),
			mileStones: { ...saveFile.mileStones, hasEvolvedAPokemon: true },
			inventory: updatedInventory,
		});
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
		evolvePokemonReducer,
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

export const SaveFileContext = React.createContext({} as UseSaveFile);

export const SaveFileProvider = ({
	children,
	addMessage,
}: {
	children: ReactNode;
	addMessage: (x: Message) => void;
}) => {
	const value = useSaveFile(testState, addMessage);

	return (
		<SaveFileContext.Provider value={value}>
			{children}
		</SaveFileContext.Provider>
	);
};
