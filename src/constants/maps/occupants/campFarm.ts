import { makeApricornTree } from "../../../functions/makeApricornTree";
import { dugtrioExplorers } from "../../../hooks/useDugtrioExplorers";
import { zigzagoonForagers } from "../../../hooks/useZigzagoonForagers";
import { Occupant, OverworldMap } from "../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../interfaces/SpriteEnum";
import { amoongussCompostResearchers } from "../../../modules/AmoongussResearcher/AmoongussResearcher";
import { miltankFarm } from "../../../modules/MiltankFarm/MiltankFarm";
import { seedvaultResearcher } from "../../../modules/SeedVault/SeedVault";
import { vileplumeResearchers } from "../../../modules/VilePlumeScentResearcher/VilePlumeScentResearcher";

const trainingField: Occupant[] = [];

export const campOccupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    id: "camp_to_farm",
    conditionFunction: () => true,
    x: 0,
    y: 3,
    portal: {
      mapId: "camp",
      x: 18,
      y: 16,
      orientation: "LEFT",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ROUTER_NPC",
    to: "FARM",
    id: "berry_farmer",
    x: 9,
    y: 14,
    orientation: "UP",
    dialogue: ["We can grow all types of berries and apricorns"],
    sprite: SpriteEnum.farmer,
    conditionFunction: (s) => s.campUpgrades.berry_farm,
  },
  {
    type: "COMBEE_HIVE",
    x: 8,
    y: 2,
    id: "combee_hive",
    conditionFunction: (s) => s.campUpgrades["build combee hive"],
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
    x: 2,
    y: 7,
    orientation: "RIGHT",
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
    orientation: "RIGHT",
    y: 11,
    x: 1,
    dialogue: [
      "Some Berries are not very useful raw",
      "but they are still good ingredients",
    ],
    sprite: SpriteEnum.grandma,
    conditionFunction: (s) => s.campUpgrades["invite chef grandma"],
    id: "chef grandma",
  },
  {
    type: "POKEMON",
    dexId: 77,
    x: 15,
    y: 9,
    orientation: "DOWN",
    id: "ponyta",
    dialogue: ["Ponyta is trotting happily"],
    conditionFunction: () => true,
  },
  {
    type: "POKEMON",
    dexId: 78,
    x: 17,
    y: 10,
    orientation: "RIGHT",
    id: "rapidash",
    dialogue: ["Rapidash is trotting majestical"],
    conditionFunction: () => true,
  },
  ...makeApricornTree({
    x: 1,
    y: 6,
    apricorn: "grey-apricorn",
    id: "farm_grey_tree_1",
  }),
  ...makeApricornTree({
    x: 1,
    y: 8,
    apricorn: "grey-apricorn",
    id: "farm_grey_tree_2",
  }),
  ...makeApricornTree({
    x: 2,
    y: 5,
    apricorn: "grey-apricorn",
    id: "farm_grey_tree_3",
  }),
  ...makeApricornTree({
    x: 2,
    y: 9,
    apricorn: "grey-apricorn",
    id: "farm_grey_tree_4",
  }),
  ...miltankFarm,
  ...zigzagoonForagers,
  ...dugtrioExplorers,
  ...vileplumeResearchers,
  ...amoongussCompostResearchers,
  ...seedvaultResearcher,
];
