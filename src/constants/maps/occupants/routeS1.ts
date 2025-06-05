import { getTimeOfDay } from "../../../functions/getTimeOfDay";
import { makeApricornTree } from "../../../functions/makeApricornTree";
import { occupantHandled } from "../../../functions/occupantHandled";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { barryS1 } from "./barry";
import { cynthiaS1 } from "./cynthia";
import { hughS1 } from "./hugh";
import { misty } from "./misty";
import { nS1 } from "./n";
import { redS1 } from "./red";
import { silverS1 } from "./silver";

export const routeS1Occupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 0,
    portal: {
      mapId: "camp",
      x: 20,
      y: 38,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1_to_camp",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 50,
    y: 12,
    portal: {
      mapId: "routeS1E1",
      x: 1,
      y: 12,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1_to_routeS1E1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 50,
    y: 13,
    portal: {
      mapId: "routeS1E1",
      x: 1,
      y: 13,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1_to_routeS1E1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 50,
    y: 14,
    portal: {
      mapId: "routeS1E1",
      x: 1,
      y: 14,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1_to_routeS1E1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 0,
    y: 25,
    portal: {
      mapId: "routeS1W1",
      y: 25,
      x: 49,
      orientation: "LEFT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1_to_routeS1W1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 0,
    y: 35,
    portal: {
      mapId: "routeS1W1",
      y: 35,
      x: 49,
      orientation: "LEFT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1_to_routeS1W1",
  },
  {
    type: "ITEM",
    x: 15,
    y: 23,
    item: "soft-sand",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "softsand"),
    id: "softsand",
  },
  {
    type: "ITEM",
    x: 17,
    y: 22,
    item: "cover-fossil",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "lake-fossil"),
    id: "lake-fossil",
  },
  {
    type: "ITEM",
    x: 10,
    y: 38,
    item: "net-ball",
    amount: 10,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "lake-net-balls"),
    id: "lake-net-balls",
  },
  {
    type: "ITEM",
    x: 35,
    y: 34,
    item: "full-restore",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "lake-full-restore"),
    id: "lake-full-restore",
  },
  {
    type: "POKEMON",
    x: 35,
    y: 34,
    orientation: "DOWN",
    dexId: 145,
    encounter: {
      name: "zapdos",
      maxXp: 125000,
      minXp: 125000,
      rarity: "common",
    },
    dialogue: ["Kyoohh"],
    conditionFunction: (s) =>
      s.pokedex.zapdos.caughtOnRoutes.length === 0 &&
      s.bag["thunder-stone"] > 0 &&
      getTimeOfDay() === "MORNING" &&
      s.campUpgrades["invite historian"],
    id: "routeS1_zapdos",
  },
  ...misty,
  barryS1,
  cynthiaS1,
  nS1,
  redS1,
  silverS1,
  hughS1,
  ...makeApricornTree({
    x: 42,
    y: 18,
    apricorn: "orange-apricorn",
    id: "orange-apri-routeS1-1",
  }),
  ...makeApricornTree({
    x: 40,
    y: 16,
    apricorn: "orange-apricorn",
    id: "orange-apri-routeS1-2",
  }),
  ...makeApricornTree({
    x: 39,
    y: 17,
    apricorn: "orange-apricorn",
    id: "orange-apri-routeS1-3",
  }),
  {
    type: "POKEMON",
    x: 2,
    y: 43,
    orientation: "RIGHT",
    dexId: 243,
    encounter: {
      name: "raikou",
      maxXp: 125000,
      minXp: 125000,
      rarity: "common",
    },
    dialogue: ["Raaaaii"],
    conditionFunction: (s) =>
      s.pokedex.raikou.caughtOnRoutes.length === 0 &&
      getTimeOfDay() === "NIGHT",

    id: "routeS1_raikou",
  },
  {
    type: "ITEM",
    x: 4,
    y: 33,
    item: "kings-rock",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "kings-rock-s1"),
    id: "kings-rock-s1",
  },
  {
    type: "POKEMON",
    x: 5,
    y: 35,
    orientation: "DOWN",
    dexId: 199,
    encounter: {
      name: "slowking",
      maxXp: 64000,
      minXp: 64000,
      rarity: "common",
    },
    dialogue: ["hhhmmm"],
    conditionFunction: (s) => !occupantHandled(s, "routeS1_slowking"),
    id: "routeS1_slowking",
  },
];
