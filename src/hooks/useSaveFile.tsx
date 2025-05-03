import React, {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MoveName } from '../constants/checkLists/movesCheckList';

import { v4 } from 'uuid';
import {
	getBagLimit,
	getTotalInventoryAmount,
} from '../components/BagLimitBar/BagLimitBar';
import {
	QuestName,
	questNames,
	QuestsRecord,
} from '../constants/checkLists/questsRecord';
import {
	emptyPokedex,
	localStorageId,
	ONE_DAY,
	testState,
} from '../constants/gameData';
import { PokemonName } from '../constants/pokemonNames';
import { addPokemonToDex } from '../functions/addPokemonToDex';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { applyItemToPokemon } from '../functions/applyItemToPokemon';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { getRewardItemsForQuest } from '../functions/getRewardForQuest';
import { TimeOfDay } from '../functions/getTimeOfDay';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { updateItemFunction } from '../functions/updateItemFunction';
import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory, joinInventories } from '../interfaces/Inventory';
import { getRandomBall, getRandomItem, ItemType } from '../interfaces/Item';
import { Occupant } from '../interfaces/OverworldMap';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { Quest } from '../interfaces/Quest';
import { RoutesType } from '../interfaces/Routing';
import { CharacterLocationData, SaveFile } from '../interfaces/SaveFile';
import { randomQuestRewards } from '../modules/Settings/Settings';
import { Message } from './useMessageQueue';

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
	setCharacterLocationReducer: (update: CharacterLocationData) => void;
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
	reset: () => void;
	evolvePokemonReducer: (x: EvolutionReducerPayload) => void;
}
const migrateSavefile = (input: SaveFile) => {
	const updatedInput = { ...input };

	//add new random quest rewards
	const randomizedRewards = window.localStorage.getItem(randomQuestRewards);

	if (randomizedRewards) {
		const parsed = (
			randomizedRewards ? JSON.parse(randomizedRewards) : {}
		) as Record<QuestName, Quest>;

		if (
			questNames.some((q) => !parsed[q]) ||
			Object.keys(parsed).some((key) => !questNames.includes(key))
		) {
			window.localStorage.setItem(
				randomQuestRewards,
				JSON.stringify(
					Object.fromEntries(
						Object.entries(QuestsRecord).map(([name, quest]) => {
							if (parsed[name]) {
								return [name, parsed];
							}
							return [
								name,
								{
									...quest,
									rewardItems: {
										[getRandomItem()]: Math.floor(1 + Math.random() * 9),
										[getRandomBall()]: Math.floor(1 + Math.random() * 4),
									},
								},
							];
						})
					)
				)
			);
		}
	}

	//migrate new quests
	updatedInput.quests = Object.fromEntries(
		questNames.map((q) => [q, updatedInput.quests[q] ?? 'INACTIVE'])
	);

	updatedInput.pokemon = input.pokemon.map((p) => {
		if (!p.caughtAtDate) {
			return { ...p, caughtAtDate: new Date().getTime() };
		}

		return p;
	});
	return updatedInput;
};

const useSaveFile = (
	init: SaveFile,
	addMessage: (x: Message) => void
): UseSaveFile => {
	const local = window.localStorage.getItem(localStorageId);
	const loaded = local ? migrateSavefile(JSON.parse(local) as SaveFile) : init;

	const [saveFile, s] = useState<SaveFile>(loaded);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const setSaveFile = useCallback((update: SaveFile) => {
		const newTime = new Date().getTime();

		let pokedex = update.pokedex ?? emptyPokedex;

		update.pokemon.forEach((p) => {
			pokedex = addPokemonToDex(pokedex, p.name, p.caughtOnMap, true);
		});
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
		setSaveFile({
			...saveFile,
			location: update,
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

		const rewardStrings: string[] = [
			`${quest.researchPoints} Research Points`,
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
	const reset = useCallback(() => {
		setSaveFile(testState);
	}, [setSaveFile]);

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

		const pokedex = addPokemonToDex(
			saveFile.pokedex,
			newName,
			saveFile.location.mapId,
			true
		);

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
			},
			bag: updatedInventory,
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
