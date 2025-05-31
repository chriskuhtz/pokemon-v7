import { dugtrioExplorers } from "../../../hooks/useDugtrioExplorers";
import { zigzagoonForagers } from "../../../hooks/useZigzagoonForagers";
import { Occupant, OverworldMap } from "../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../interfaces/SpriteEnum";
import { amoongussCompostResearchers } from "../../../modules/AmoongussResearcher/AmoongussResearcher";
import { dragoniteTaxi } from "../../../modules/DragoniteTaxi/DragoniteTaxi";
import { miltankFarm } from "../../../modules/MiltankFarm/MiltankFarm";
import { seedvaultResearcher } from "../../../modules/SeedVault/SeedVault";
import { vileplumeResearchers } from "../../../modules/VilePlumeScentResearcher/VilePlumeScentResearcher";
import { bugsy } from "./bugsy";
import { rewardChris } from "./champChris";
import { chuckLine } from "./chuckLine";
import { elmLine } from "./elmLine";
import { lookerLine } from "./lookerLine";
import { mortyLine } from "./mortyLine";
import { rowanLine } from "./rowanLine";
import { whitneyLine } from "./whitney";

const trainingField: Occupant[] = [];

export const campOccupants: OverworldMap["occupants"] = [
  {
    type: "ROUTER_NPC",
    to: "FARM",
    id: "berry_farmer",
    x: 15,
    y: 17,
    orientation: "UP",
    dialogue: ["We can grow all types of berries and apricorns"],
    sprite: SpriteEnum.farmer,
    conditionFunction: (s) => s.campUpgrades.berry_farm,
  },
  {
    type: "COMBEE_HIVE",
    x: 16,
    y: 17,
    id: "combee_hive",
    conditionFunction: (s) => s.campUpgrades["build combee hive"],
  },
  {
    type: "PC",
    x: 8,
    y: 7,

    id: "camp_pc",
    conditionFunction: () => true,
  },
  {
    type: "STORAGE_CHEST",
    x: 9,
    y: 7,
    id: "camp_storage",
    conditionFunction: () => true,
  },
  {
    type: "ROUTER_NPC",
    to: "APRICORN_SMITHY",
    sprite: SpriteEnum.kurt,
    x: 3,
    y: 11,
    orientation: "DOWN",
    id: "campUpgrade_kurt",
    dialogue: [
      "My name is kurt",
      "I practice the ancient art",
      "of turning apricorns into pokeballs",
      "Each type of ball has a different specialty",
    ],
    conditionFunction: (s) => s.campUpgrades["invite apricorn smith kurt"],
  },
  {
    type: "ROUTER_NPC",
    to: "CHEF_GRANDMA",
    orientation: "DOWN",
    y: 11,
    x: 4,
    dialogue: [
      "Some Berries are not very useful raw",
      "but they are still good ingredients",
    ],
    sprite: SpriteEnum.grandma,
    conditionFunction: (s) => s.campUpgrades["invite chef grandma"],
    id: "chef grandma",
  },
  bugsy,
  ...whitneyLine,
  ...mortyLine,
  ...chuckLine,
  ...elmLine,
  ...rowanLine,
  ...miltankFarm,
  ...zigzagoonForagers,
  ...dugtrioExplorers,
  ...vileplumeResearchers,
  ...amoongussCompostResearchers,
  ...seedvaultResearcher,
  ...dragoniteTaxi,
  rewardChris,
  ...lookerLine,
];
