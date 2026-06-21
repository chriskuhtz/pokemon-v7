import {
  baseCampUpgrades,
  baseQuestState,
  emptyPokedex,
} from "../../constants/gameData/gameData";
import { GameData } from "../../interfaces/GameData";
import { EmptyInventory } from "../../interfaces/Inventory";
import { Game } from "../../modules/Game/Game";
import { kumaDex } from "../kuma/kumaDex";

export const strangeDimensionGameData: GameData = {
  saveFileId: "pokemonStrangeDimensionSaveFile",
  locationId: "pokemonStrangeDimensionLocation",
  startingLocation: {
    mapId: "procedural",
    orientation: "DOWN",
    forwardFoot: "CENTER1",
    x: 0,
    y: 0,
  },
  startingTab: "SETTINGS",
  startingRouterSequence: [
    {
      route: "NAME_SELECTION",
      condition: (s) => !!(s.playerId === ""),
    },
    {
      route: "SPRITE_SELECTION",
      condition: (s) => !!(s.sprite === "" && s.playerId),
    },
    {
      route: "STARTER_SELECTION",
      condition: (s) => !!(s.playerId && s.sprite && s.pokemon.length === 0),
    },
  ],
  startingSaveFile: {
    sprite: "",
    settings: { rogueLike: true, randomStarters: true },
    badges: [],
    researchPoints: 0,
    quests: baseQuestState,
    bag: EmptyInventory,
    storage: EmptyInventory,
    seedVault: [],
    playerId: "",
    money: 5000,
    pokemon: [],
    meta: {
      activeTab: "MAIN",
    },
    lastEdited: new Date().getTime(),
    lastNurse: "nurse_Pokecenter_Camp",
    mileStones: {
      hasEvolvedAPokemonThroughLevelUp: false,
      hasEvolvedAPokemonWithAHeldItem: false,
      hasEvolvedAPokemonWithAStone: false,
      hasCaughtAPokemonWithHoney: false,
      hasEvolvedAPokemonThroughFriendship: false,
      hasEvolvedAPokemonThatNeedsDaytime: false,
      hasEvolvedAPokemonThatNeedsNighttime: false,
      hasCraftedApricorn: false,
      hasGrownABerry: false,
      hasGrownAnApricorn: false,
      caughtFromSwarms: [],
      luredWithBerries: [],
      damageRecord: 0,
      taughtTmTypes: [],
      craftedTmTypes: [],
      strangeDimensionHighScore: 0,
    },
    farm: {
      plants: [],
      trees: [],
    },
    campUpgrades: baseCampUpgrades,
    pokedex: emptyPokedex,
    strangeDimensionLevel: 5,
  },
  allowedBaseSizes: [64, 16, 32, 128, 256],
  internalDex: kumaDex,
  features: {
    settingsEditableAtStart: {},
    settingsEditableDuringGame: {
      hideMovementButtons: true,
    },
    catchStreaks: false,
    numberOfBallsBadge: false,
    quests: false,
    pokemonStorageSystem: false,
    movesEditableInTeamOverview: true,
    movesLearnableInTeamOverview: true,
    snapShotExportAvailable: false,
    lostItems: false,
    staticEncounters: false,
    staticTrainers: false,
    overworldEggs: false,
    quizMaster: false,
  },
  losingMessages: {
    training: "luckily this was only a training battle",
    reset: "You lost the battle and have to reset",
    wild: "You lost the battle and rushed back to camp, loosing your items on the way",
    explorer:
      "You lost the battle and rushed back to camp, loosing some of your items on the way",
  },
  overworldActions: {
    bushCutting: {
      possible: (saveFile) => saveFile.campUpgrades["machete certification"],
      successDialogue: ["You use your certified machete skills"],
      failDialogue: [
        "You need a machete certification to cut bushes",
        "...bureaucracy",
      ],
    },
    swimming: {
      possible: (s) => s.campUpgrades["swimming certification"],
      successDialogue: [],
      failDialogue: [],
    },
    rockClimbing: {
      possible: (s) => s.campUpgrades["rock climbing certification"],
      successDialogue: [],
      failDialogue: [
        "A certified rock climber would be allowed to climb here",
        "... Bureaucracy",
      ],
    },
  },
  carryingCapacity: {
    base: { amount: 50 },
    second: {
      amount: 30,
      condition: (s) => s.campUpgrades["bag size upgrade 1"],
    },
    third: {
      amount: 40,
      condition: (s) => s.campUpgrades["bag size upgrade 2"],
    },
    fourth: {
      amount: 50,
      condition: (s) => s.campUpgrades["bag size upgrade 3"],
    },
  },
  teamSlots: {
    second: () => true,
    third: () => true,
    fourth: () => true,
    fifth: () => true,
    sixth: () => true,
  },
  defaultBattleSize: 2,
  isMoveLearnable: () => {
    return { learnable: true, message: "Can be learned" };
  },
};

export const StrangeDimension = (): JSX.Element => {
  return <Game {...strangeDimensionGameData} />;
};
