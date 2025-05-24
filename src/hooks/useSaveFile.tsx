import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MoveName } from '../constants/checkLists/movesCheckList';

import { v4 } from 'uuid';

import {
	emptyPokedex,
	localStorageSaveFileId,
	ONE_DAY,
	testState,
} from '../constants/gameData';
import { PokemonName } from '../constants/pokemonNames';
import { QuestName, questNames, QuestsRecord } from '../constants/questsRecord';
import { addPokemonToDex } from '../functions/addPokemonToDex';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { applyItemToPokemon } from '../functions/applyItemToPokemon';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { getBagLimit, getTotalInventoryAmount } from '../functions/getBagLimit';
import { getRewardItemsForQuest } from '../functions/getRewardForQuest';
import { getTeamSize } from '../functions/getTeamSize';
import { TimeOfDay } from '../functions/getTimeOfDay';
import {
	EmptyCatchBoosts,
	joinCatchBoosts,
} from '../functions/joinCatchBoosts';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory, joinInventories } from '../interfaces/Inventory';
import { ItemType } from '../interfaces/Item';
import { Occupant } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { QuestStatus } from '../interfaces/Quest';
import { RoutesType } from '../interfaces/Routing';
import { CatchBoosts, SaveFile } from '../interfaces/SaveFile';
import { MessageQueueContext } from './useMessageQueue';

export interface EvolutionReducerPayload {
	id: string;
	newName: PokemonName;
	name: PokemonName;
	consumeHeldItem: boolean;
	consumedItem?: ItemType;
	evoRequirement: 'LEVEL_UP' | 'FRIENDSHIP' | 'HELD_ITEM' | 'ITEM';
	timeOfDayRequirement?: TimeOfDay;
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

	setPokemonReducer: (update: OwnedPokemon[]) => void;

	talkToNurseReducer: (id: string) => void;
	handleOccupantReducer: (occ: Occupant) => void;
	navigateAwayFromOverworldReducer: (
		to: RoutesType,
		steps: number,
		challenger?: Challenger
	) => void;
	applyItemToPokemonReducer: (
		pokemon: OwnedPokemon,
		item: ItemType,
		move?: MoveName
	) => void;
	fulfillQuestReducer: (q: QuestName) => void;
	changeHeldItemReducer: (pokemonId: string, newItem?: ItemType) => void;
	useSacredAshReducer: () => void;
	evolvePokemonReducer: (x: EvolutionReducerPayload) => void;
}
const migrateSavefile = (input: SaveFile) => {
	const updatedInput = { ...input };

	//migrate new quests
	updatedInput.quests = Object.fromEntries(
		questNames.map((q) => [q, updatedInput.quests[q] ?? 'INACTIVE'])
	) as Record<QuestName, QuestStatus>;

	updatedInput.rocketOperation = undefined;
	return updatedInput;
};

const useSaveFile = (init: SaveFile): UseSaveFile => {
	const { addMessage } = useContext(MessageQueueContext);
	const local = window.localStorage.getItem(localStorageSaveFileId);
	const loaded = local ? migrateSavefile(JSON.parse(local) as SaveFile) : init;

	const [saveFile, s] = useState<SaveFile>(loaded);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	//handle side effects here
	const setSaveFile = useCallback((u: SaveFile) => {
		const update = { ...u };
		const newTime = new Date().getTime();

		let pokedex = update.pokedex ?? emptyPokedex;

		update.pokemon.forEach((p) => {
			pokedex = addPokemonToDex(pokedex, p.name, p.caughtOnMap, true);
		});

		if ((update.catchStreak?.streak ?? 0) > (update.longestStreak ?? 0)) {
			update.longestStreak = update.catchStreak?.streak;
		}
		s({
			...update,
			lastEdited: newTime,
			pokedex,
			//migrate pokemon
			//pokemon: update.pokemon.map(migratePokemon),
			//migrate inventory
			bag: joinInventories(EmptyInventory, update.bag),
			handledOccupants: update.handledOccupants.filter(
				(h) => h.resetAt < 0 || h.resetAt > newTime
			),
			currentSwarm:
				update.currentSwarm && newTime > update.currentSwarm?.leavesAt
					? undefined
					: update.currentSwarm,
		});
	}, []);
	const discardItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(item, -number, saveFile.bag);
		setSaveFile({ ...saveFile, bag: updatedInventory });
	};
	const sellItemReducer = (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => {
		const updatedInventory = updateItemFunction(item, -number, saveFile.bag);
		const updatedMoney = saveFile.money + number * pricePerItem;

		setSaveFile({
			...saveFile,
			bag: updatedInventory,
			money: updatedMoney,
		});
	};
	const buyItemReducer = (
		item: ItemType,
		number: number,
		pricePerItem: number
	) => {
		const updatedInventory = updateItemFunction(item, number, saveFile.bag);
		const updatedMoney = saveFile.money - number * pricePerItem;

		setSaveFile({
			...saveFile,
			bag: updatedInventory,
			money: updatedMoney,
		});
	};
	const addItemReducer = (item: ItemType, number: number) => {
		const updatedInventory = updateItemFunction(item, number, saveFile.bag);
		setSaveFile({ ...saveFile, bag: updatedInventory });
	};
	const receiveNewPokemonReducer = (newMon: Omit<OwnedPokemon, 'onTeam'>) => {
		const updatedPokemon = receiveNewPokemonFunction(
			newMon,
			saveFile.pokemon,
			getTeamSize(saveFile)
		);

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

	const setPokemonReducer = (update: OwnedPokemon[]) => {
		setSaveFile({
			...saveFile,
			pokemon: update,
		});
	};
	const navigateAwayFromOverworldReducer = (
		route: RoutesType,
		stepsTaken: number,
		challenger?: Challenger
	) => {
		if (route === 'BATLLE' && !challenger) {
			throw new Error('cant route to battle without challenger');
		}

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
					route === 'BATTLE' && challenger ? challenger : undefined,
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
			bag: joinInventories(saveFile.bag, { 'sacred-ash': 1 }, true),
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
		const timer = occ.type === 'BUSH' ? new Date().getTime() + ONE_DAY : -1;
		let newInventory = { ...saveFile.bag };
		if (occ.type === 'NPC' && occ.gifts) {
			newInventory = joinInventories(newInventory, occ.gifts);
		}
		if (occ.type === 'ITEM' || occ.type === 'HIDDEN_ITEM') {
			const { item, amount } = occ;
			newInventory = joinInventories(newInventory, { [item]: amount });

			if (
				getTotalInventoryAmount(newInventory) >
				getBagLimit(saveFile.campUpgrades)
			) {
				addMessage({
					message: 'Your Bag is full,  cant carry more items',
					needsNoConfirmation: true,
				});
				return;
			} else
				addMessage({
					message: `Found ${amount} ${item}`,
					needsNoConfirmation: true,
				});
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
			bag: newInventory,
			quests: updatedQuests,
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
		const updatedInventory = joinInventories(saveFile.bag, { [item]: 1 }, true);
		setSaveFile({
			...saveFile,
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id == updatedPokemon.id) {
					return updatedPokemon;
				}
				return p;
			}),
			bag: updatedInventory,
		});
	};

	const fulfillQuestReducer = (q: QuestName) => {
		const quest = QuestsRecord[q];

		const reward = getRewardItemsForQuest(q);
		const updatedInventory = joinInventories(saveFile.bag, reward);

		const pokemon = quest.rewardPokemon
			? [
					...saveFile.pokemon,
					{
						...quest.rewardPokemon,
						id: v4(),
						ownerId: saveFile.playerId,
						onTeam: team.length < 6,
					},
			  ]
			: saveFile.pokemon;

		const existingCatchBoosts: CatchBoosts =
			saveFile.catchBoosts ?? EmptyCatchBoosts;

		const rewardStrings: string[] = [
			`${quest.researchPoints} Research Points`,
			quest.rangerLevels ? `${quest.rangerLevels} Ranger Levels` : undefined,
			...Object.entries(reward).map(([item, amount]) => `${amount} ${item}`),
			quest.rewardPokemon ? `a ${quest.rewardPokemon.name}` : undefined,
		].filter((s) => s !== undefined);

		addMessage({
			message: `Received ${rewardStrings.join(' + ')} `,
		});
		setSaveFile({
			...saveFile,
			bag: updatedInventory,
			quests: { ...saveFile.quests, [q]: 'COLLECTED' },
			researchPoints: saveFile.researchPoints + quest.researchPoints,
			rangerLevel: (saveFile.rangerLevel ?? 0) + (quest.rangerLevels ?? 0),
			catchBoosts: joinCatchBoosts(
				existingCatchBoosts,
				quest.catchBoosts ?? {}
			),
			pokemon,
		});
	};
	const changeHeldItemReducer = (pokemonId: string, newItem?: ItemType) => {
		const heldItem = saveFile.pokemon.find(
			(p) => p.id === pokemonId
		)?.heldItemName;

		let updatedInventory = { ...saveFile.bag };

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
			bag: updatedInventory,
		});
	};

	const evolvePokemonReducer = ({
		id,
		name,
		newName,
		consumeHeldItem,
		consumedItem,
		evoRequirement,
		timeOfDayRequirement,
	}: EvolutionReducerPayload) => {
		const updatedInventory = consumedItem
			? joinInventories(
					saveFile.bag,
					{
						[consumedItem]: 1,
					},
					true
			  )
			: saveFile.bag;

		addMessage({
			message: `Your ${name} evolved into ${newName}`,
			needsNoConfirmation: true,
		});

		const hasEvolvedAPokemonThroughLevelUp =
			saveFile.mileStones.hasEvolvedAPokemonThroughLevelUp ||
			evoRequirement === 'LEVEL_UP';

		const hasEvolvedAPokemonWithAStone =
			saveFile.mileStones.hasEvolvedAPokemonWithAStone ||
			evoRequirement === 'ITEM';

		const hasEvolvedAPokemonWithAHeldItem =
			saveFile.mileStones.hasEvolvedAPokemonWithAHeldItem ||
			evoRequirement === 'HELD_ITEM';
		const hasEvolvedAPokemonThroughFriendship =
			saveFile.mileStones.hasEvolvedAPokemonThroughFriendship ||
			evoRequirement === 'FRIENDSHIP';

		const hasEvolvedAPokemonThatNeedsDaytime =
			saveFile.mileStones.hasEvolvedAPokemonThatNeedsDaytime ||
			timeOfDayRequirement === 'DAY';
		const hasEvolvedAPokemonThatNeedsNighttime =
			saveFile.mileStones.hasEvolvedAPokemonThatNeedsNighttime ||
			timeOfDayRequirement === 'NIGHT';

		const isStarter = saveFile.pokemon.find((p) => p.id === id)?.starter;

		const hasEvolvedStarter =
			saveFile.mileStones.hasEvolvedStarter || isStarter;

		const pokedex = addPokemonToDex(saveFile.pokedex, newName, 'camp', true);

		patchSaveFileReducer({
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id === id) {
					return {
						...p,
						name: newName,
						heldItemName: consumeHeldItem ? undefined : p.heldItemName,
					};
				}
				return p;
			}),
			pokedex,
			mileStones: {
				...saveFile.mileStones,
				hasEvolvedAPokemonThroughLevelUp,
				hasEvolvedAPokemonWithAStone,
				hasEvolvedAPokemonWithAHeldItem,
				hasEvolvedAPokemonThroughFriendship,
				hasEvolvedAPokemonThatNeedsDaytime,
				hasEvolvedAPokemonThatNeedsNighttime,
				hasEvolvedStarter,
			},
			bag: updatedInventory,
		});
	};

	//SYNC WITH LOCAL STORAGE
	useEffect(() => {
		window.localStorage.setItem(
			localStorageSaveFileId,
			JSON.stringify(saveFile)
		);
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

		saveFile,
		discardItemReducer,
		addItemReducer,
		receiveNewPokemonReducer,
		putSaveFileReducer,
		patchSaveFileReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setPokemonReducer,
		talkToNurseReducer,
		navigateAwayFromOverworldReducer,
		handleOccupantReducer,
		applyItemToPokemonReducer,
		fulfillQuestReducer,
		changeHeldItemReducer,
		useSacredAshReducer,
	};
};

export const SaveFileContext = React.createContext({} as UseSaveFile);

export const SaveFileProvider = ({ children }: { children: ReactNode }) => {
	const value = useSaveFile(testState);

	return (
		<SaveFileContext.Provider value={value}>
			{children}
		</SaveFileContext.Provider>
	);
};
