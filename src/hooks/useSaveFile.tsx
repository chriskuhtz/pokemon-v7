import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { emptyPokedex } from "../constants/gameData/gameData";
import { MoveName } from "../constants/movesCheckList";
import { PokemonName } from "../constants/pokemonNames";
import { addPokemonToDex } from "../functions/addPokemonToDex";
import { applyHappinessFromWalking } from "../functions/applyHappinessFromWalking";
import { applyItemToPokemon } from "../functions/applyItemToPokemon";
import { fullyHealPokemon } from "../functions/fullyHealPokemon";
import { TimeOfDay } from "../functions/getTimeOfDay";
import {
  cleanUpTimedEvents,
  refillRandomTimedEvents,
} from "../functions/TimedEvent";
import { updateItemFunction } from "../functions/updateItemFunction";
import { EmptyInventory, joinInventories } from "../interfaces/Inventory";
import { ItemType } from "../interfaces/Item";
import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { QuestStatus } from "../interfaces/Quest";
import { RoutesType } from "../interfaces/Routing";
import { SaveFile } from "../interfaces/SaveFile";
import {
  KumaQuestName,
  kumaQuestNames,
  KumaQuestsRecord,
} from "../versions/kuma/questsRecord";
import { startingSaveFileKuma } from "../versions/kuma/saveFile";
import { GameDataContext } from "./useGameData";
import { MessageQueueContext } from "./useMessageQueue";

export interface EvolutionReducerPayload {
  id: string;
  newName: PokemonName;
  name: PokemonName;
  consumeHeldItem: boolean;
  consumedItem?: ItemType;
  evoRequirement: "LEVEL_UP" | "FRIENDSHIP" | "HELD_ITEM" | "ITEM";
  timeOfDayRequirement?: TimeOfDay;
}

export interface UseSaveFile {
  saveFile: SaveFile;
  discardItemReducer: (item: ItemType, number: number) => void;
  patchSaveFileReducer: (update: Partial<SaveFile>) => void;
  setActiveTabReducer: (update: RoutesType) => void;
  talkToNurseReducer: (id: string) => void;
  navigateAwayFromOverworldReducer: (
    meta: SaveFile["meta"],
    steps: number,
  ) => void;
  applyItemToPokemonReducer: (
    pokemon: OwnedPokemon,
    item: ItemType,
    move?: MoveName,
  ) => void;
  changeHeldItemReducer: (pokemonId: string, newItem?: ItemType) => void;
  useSacredAshReducer: () => void;
  evolvePokemonReducer: (x: EvolutionReducerPayload) => void;
  resetSaveFile: () => void;
}

const migrateSavefile = (input: SaveFile) => {
  const updatedInput = { ...input };

  //migrate new quests
  updatedInput.quests = Object.fromEntries(
    kumaQuestNames.map((q) => [q, updatedInput.quests[q] ?? "INACTIVE"]),
  ) as Record<KumaQuestName, QuestStatus>;
  //migrate in unlocks
  Object.entries(KumaQuestsRecord).forEach(([key, value]) => {
    if (!value.campUpgrade) {
      return;
    }
    if (updatedInput.quests[key as KumaQuestName] === "COLLECTED") {
      updatedInput.campUpgrades[value.campUpgrade] = true;
    }
  });
  //migrate in badges
  Object.entries(KumaQuestsRecord).forEach(([key, value]) => {
    if (!value.badge) {
      return;
    }
    if (updatedInput.quests[key as KumaQuestName] === "COLLECTED") {
      updatedInput.badges = [...new Set([...updatedInput.badges, value.badge])];
    }
  });
  //migrate in trees
  if (!updatedInput.farm.trees || updatedInput.farm.trees.length < 6) {
    updatedInput.farm.trees = startingSaveFileKuma.farm.trees;
  }

  //migrate in tickets
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeN1E1"] ===
      "COLLECTED" &&
    updatedInput.bag["forest-ticket"] === 0 &&
    updatedInput.storage["forest-ticket"] === 0
  ) {
    updatedInput.storage["forest-ticket"] = 1;
  }
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeS1E1"] ===
      "COLLECTED" &&
    updatedInput.bag["plains-ticket"] === 0 &&
    updatedInput.storage["plains-ticket"] === 0
  ) {
    updatedInput.storage["plains-ticket"] = 1;
  }
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeS1W1"] ===
      "COLLECTED" &&
    updatedInput.bag["hills-ticket"] === 0 &&
    updatedInput.storage["hills-ticket"] === 0
  ) {
    updatedInput.storage["hills-ticket"] = 1;
  }
  if (
    updatedInput.quests["catch a ultra-rare pokemon from routeN1W1"] ===
      "COLLECTED" &&
    updatedInput.bag["peak-ticket"] === 0 &&
    updatedInput.storage["peak-ticket"] === 0
  ) {
    updatedInput.storage["peak-ticket"] = 1;
  }

  return updatedInput;
};

const useSaveFile = (init: SaveFile): UseSaveFile => {
  const { addMessage } = useContext(MessageQueueContext);
  const gameData = useContext(GameDataContext);
  const { saveFileId, startingRouterSequence, startingSaveFile } = gameData;
  const local = window.localStorage.getItem(saveFileId);
  const loaded = local ? migrateSavefile(JSON.parse(local) as SaveFile) : init;

  const [saveFile, s] = useState<SaveFile>(loaded);
  //SYNC WITH LOCAL STORAGE
  useEffect(() => {
    window.localStorage.setItem(saveFileId, JSON.stringify(saveFile));
  }, [saveFile, saveFileId]);

  const resetSaveFile = useCallback(() => {
    s(startingSaveFile);
  }, [startingSaveFile]);

  //handle side effects here
  const setSaveFile = useCallback(
    (u: SaveFile) => {
      let update = { ...u };
      const now = new Date().getTime();

      let pokedex = update.pokedex ?? emptyPokedex;

      //update pokedex
      update.pokemon.forEach((p) => {
        pokedex = addPokemonToDex(pokedex, p.name, p.caughtOnMap, true);
      });
      //update catch streak
      if ((update.catchStreak?.streak ?? 0) > (update.longestStreak ?? 0)) {
        update.longestStreak = update.catchStreak?.streak;
      }

      //remove expired TimedEvents
      update = cleanUpTimedEvents(update);
      //refill TimedEvents
      update = refillRandomTimedEvents(update, gameData);

      s({
        ...update,
        lastEdited: now,
        pokedex,
        bag: joinInventories(EmptyInventory, update.bag),
      });
    },
    [gameData],
  );
  const discardItemReducer = (item: ItemType, number: number) => {
    const updatedInventory = updateItemFunction(item, -number, saveFile.bag);
    setSaveFile({ ...saveFile, bag: updatedInventory });
  };

  const patchSaveFileReducer = (update: Partial<SaveFile>) =>
    setSaveFile({ ...saveFile, ...update });
  const setActiveTabReducer = useCallback(
    (update: RoutesType) => {
      setSaveFile({
        ...saveFile,
        meta: { ...saveFile.meta, activeTab: update },
      });
    },
    [saveFile, setSaveFile],
  );

  const navigateAwayFromOverworldReducer = (
    meta: SaveFile["meta"],
    stepsTaken: number,
  ) => {
    if (meta.activeTab === "BATTLE" && !meta.currentChallenger) {
      throw new Error("cant route to battle without challenger");
    }

    setSaveFile({
      ...saveFile,
      pokemon: saveFile.pokemon.map((p) => {
        if (!p.onTeam) {
          return p;
        }

        return applyHappinessFromWalking(p, stepsTaken);
      }),
      meta: meta,
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
      bag: joinInventories(saveFile.bag, { "sacred-ash": 1 }, true),
      pokemon: saveFile.pokemon.map((p) => {
        if (!p.onTeam) {
          return p;
        }

        return fullyHealPokemon(p);
      }),
    });
    addMessage({ message: "Whole Team fully healed" });
  };

  const applyItemToPokemonReducer = (
    pokemon: OwnedPokemon,
    item: ItemType,
    move?: MoveName,
  ) => {
    if (
      (item === "ether" ||
        item === "max-ether" ||
        item === "pp-max" ||
        item === "pp-up" ||
        item === "leppa-berry") &&
      !move
    ) {
      addMessage({ message: `${item} needs to be applied to specific move` });
      return;
    }
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

  const changeHeldItemReducer = (pokemonId: string, newItem?: ItemType) => {
    const heldItem = saveFile.pokemon.find(
      (p) => p.id === pokemonId,
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
          true,
        )
      : saveFile.bag;

    addMessage({
      message: `Your ${name} evolved into ${newName}`,
      needsNoConfirmation: true,
    });

    const hasEvolvedAPokemonThroughLevelUp =
      saveFile.mileStones.hasEvolvedAPokemonThroughLevelUp ||
      evoRequirement === "LEVEL_UP";

    const hasEvolvedAPokemonWithAStone =
      saveFile.mileStones.hasEvolvedAPokemonWithAStone ||
      evoRequirement === "ITEM";

    const hasEvolvedAPokemonWithAHeldItem =
      saveFile.mileStones.hasEvolvedAPokemonWithAHeldItem ||
      evoRequirement === "HELD_ITEM";
    const hasEvolvedAPokemonThroughFriendship =
      saveFile.mileStones.hasEvolvedAPokemonThroughFriendship ||
      evoRequirement === "FRIENDSHIP";

    const hasEvolvedAPokemonThatNeedsDaytime =
      saveFile.mileStones.hasEvolvedAPokemonThatNeedsDaytime ||
      timeOfDayRequirement === "DAY";
    const hasEvolvedAPokemonThatNeedsNighttime =
      saveFile.mileStones.hasEvolvedAPokemonThatNeedsNighttime ||
      timeOfDayRequirement === "NIGHT";

    const isStarter = saveFile.pokemon.find((p) => p.id === id)?.starter;

    const hasEvolvedStarter =
      saveFile.mileStones.hasEvolvedStarter || isStarter;

    const pokedex = addPokemonToDex(saveFile.pokedex, newName, "camp", true);

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

  //HANDLE START OF GAME
  useEffect(() => {
    const seq = startingRouterSequence.find(
      (seq) => seq.condition(saveFile) && saveFile.meta.activeTab !== seq.route,
    );

    if (seq) {
      setActiveTabReducer(seq.route);
    }
  }, [saveFile, setActiveTabReducer, startingRouterSequence]);

  return {
    evolvePokemonReducer,
    saveFile,
    discardItemReducer,
    patchSaveFileReducer,
    setActiveTabReducer,
    talkToNurseReducer,
    navigateAwayFromOverworldReducer,
    applyItemToPokemonReducer,
    changeHeldItemReducer,
    useSacredAshReducer,
    resetSaveFile,
  };
};

export const SaveFileContext = React.createContext({} as UseSaveFile);

export const SaveFileProvider = ({ children }: { children: ReactNode }) => {
  const { startingSaveFile } = useContext(GameDataContext);
  const value = useSaveFile(startingSaveFile);

  return (
    <SaveFileContext.Provider value={value}>
      {children}
    </SaveFileContext.Provider>
  );
};
