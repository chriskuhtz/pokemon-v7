import React, {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MoveName } from '../constants/checkLists/movesCheckList';

import { v4 } from 'uuid';
import { QuestName, QuestsRecord } from '../constants/checkLists/questsRecord';
import {
	emptyPokedex,
	localStorageId,
	ONE_DAY,
	testState,
} from '../constants/gameData';
import { mapsRecord } from '../constants/maps/mapsRecord';
import { PokemonName } from '../constants/pokemonNames';
import { addPokemonToDex } from '../functions/addPokemonToDex';
import { applyHappinessFromWalking } from '../functions/applyHappinessFromWalking';
import { applyItemToPokemon } from '../functions/applyItemToPokemon';
import { determineWildPokemon } from '../functions/determineWildPokemon';
import { getRandomEntry } from '../functions/filterTargets';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { getRewardItemsForQuest } from '../functions/getRewardForQuest';
import { TimeOfDay } from '../functions/getTimeOfDay';
import { OPPO_ID } from '../functions/makeChallengerPokemon';
import { receiveNewPokemonFunction } from '../functions/receiveNewPokemonFunction';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { reduceEncounterRateModifier } from '../functions/reduceEncounterRateModifier';
import { updateItemFunction } from '../functions/updateItemFunction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../interfaces/Inventory';
import { EncounterChanceItem, ItemType, pickupTable } from '../interfaces/Item';
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
	defeatedChallengerId?: string;
}
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
	evolvePokemonReducer: (x: EvolutionReducerPayload) => void;
}

const ensurePokedex = (input: SaveFile) => {
	if (!input.pokedex) {
		return { ...input, pokedex: emptyPokedex };
	}

	return input;
};

const useSaveFile = (
	init: SaveFile,
	addMessage: (x: Message) => void
): UseSaveFile => {
	const local = window.localStorage.getItem(localStorageId);
	const loaded = local ? ensurePokedex(JSON.parse(local) as SaveFile) : init;

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
			inventory: joinInventories(EmptyInventory, update.inventory),
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
								type: 'WILD',
								id: OPPO_ID,
								inventory: EmptyInventory,
								team: determineWildPokemon(
									team,
									mapsRecord[saveFile.location.mapId],
									saveFile.currentSwarm
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
		const timer = occ.type === 'BUSH' ? new Date().getTime() + ONE_DAY : -1;
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

		const reward = getRewardItemsForQuest(q);
		const updatedInventory = joinInventories(saveFile.inventory, reward);

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

		setSaveFile({
			...saveFile,
			inventory: updatedInventory,
			quests: { ...saveFile.quests, [q]: 'COLLECTED' },
			researchPoints: saveFile.researchPoints + quest.researchPoints,
			pokemon,
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
			defeatedChallengerId,
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

			const ownedTeam = updatedTeam.map((p) =>
				reduceBattlePokemonToOwnedPokemon(p)
			);

			//check pickup
			const pickUpCheckedTeam = ownedTeam.map((p) => {
				if (p.ability === 'pickup' && !p.heldItemName && Math.random() < 0.1) {
					return { ...p, heldItemName: getRandomEntry(pickupTable) };
				}

				return p;
			});

			const teamAndCaught = [
				...pickUpCheckedTeam,
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

			const alreadyDefeated = saveFile.handledOccupants.some(
				(h) => h.id === defeatedChallengerId
			);
			const gainedResearchPoints = () => {
				if (outcome !== 'WIN') {
					return 0;
				}
				if (!defeatedChallengerId) {
					return 0;
				}
				if (alreadyDefeated) {
					return 0;
				}

				return 1;
			};

			const pokedex = { ...saveFile.pokedex };
			caughtPokemon.forEach((p) =>
				addPokemonToDex(pokedex, p.name, p.caughtOnMap, true)
			);

			putSaveFileReducer({
				...saveFile,
				inventory: updatedInventory,
				money: saveFile.money + scatteredCoins,
				pokemon: updatedPokemon,
				meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
				researchPoints: saveFile.researchPoints + gainedResearchPoints(),
				handledOccupants:
					defeatedChallengerId && !alreadyDefeated
						? [
								...saveFile.handledOccupants,
								{ id: defeatedChallengerId, resetAt: -1 },
						  ]
						: saveFile.handledOccupants,
				mileStones: {
					...saveFile.mileStones,
					hasCaughtASwarmPokemon:
						saveFile.currentSwarm &&
						caughtPokemon.some((c) => c.name === saveFile.currentSwarm?.pokemon)
							? true
							: saveFile.mileStones.hasCaughtASwarmPokemon,
				},
				pokedex,
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
