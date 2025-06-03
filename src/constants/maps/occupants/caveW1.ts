import { getTimeOfDay } from "../../../functions/getTimeOfDay";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { hughcaveW1 } from "./hugh";

export const caveW1Occupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    id: "cave1 entry bottom",
    conditionFunction: () => true,
    x: 28,
    y: 47,
    portal: {
      mapId: "routeW1",
      x: 28,
      y: 48,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave1 entry middle",
    conditionFunction: () => true,
    x: 2,
    y: 36,
    portal: {
      mapId: "routeW1",
      x: 3,
      y: 36,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave1 cave1_2",
    conditionFunction: () => true,
    x: 47,
    y: 21,
    portal: {
      mapId: "caveW1_2",
      x: 46,
      y: 21,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ITEM",
    x: 11,
    y: 48,
    item: "jaw-fossil",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveW1-jaw-fossil"),
    id: "caveW1-jaw-fossil",
  },
  {
    type: "ITEM",
    x: 20,
    y: 20,
    item: "sail-fossil",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveW1-sail-fossil"),
    id: "caveW1-sail-fossil",
  },
  {
    type: "ITEM",
    x: 35,
    y: 45,
    item: "max-mushroom",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveW1-max-mushroom"),
    id: "caveW1-max-mushroom",
  },
  {
    type: "ITEM",
    x: 27,
    y: 13,
    item: "elixir",
    amount: 2,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveW1-elixir"),
    id: "caveW1-elixir",
  },
  {
    type: "POKEMON",
    x: 41,
    y: 12,
    orientation: "DOWN",
    dexId: 146,
    encounter: {
      name: "moltres",
      maxXp: 125000,
      minXp: 125000,
      rarity: "common",
    },
    dialogue: ["Kyaaah"],
    conditionFunction: (s) =>
      s.pokedex.moltres.caughtOnRoutes.length === 0 &&
      s.bag["fire-stone"] > 0 &&
      getTimeOfDay() === "NIGHT" &&
      s.campUpgrades["invite historian"],
    id: "routeW1_moltres",
  },
  hughcaveW1,
];
