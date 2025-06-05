import { getTimeOfDay } from "../../../functions/getTimeOfDay";
import { makeApricornTree } from "../../../functions/makeApricornTree";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { routeE1Lure } from "../../../modules/BerryLure/BerryLure";
import { travellingMerchantRouteE1 } from "../../../modules/TravellingMerchant/TravellingMerchant";
import { barryE1 } from "./barry";
import { blaine } from "./blaine";
import { cynthiaE1 } from "./cynthia";
import { hughE1 } from "./hugh";
import { nE1 } from "./n";
import { redE1 } from "./red";
import { silverE1 } from "./silver";

export const routeE1Occupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 0,
    portal: {
      mapId: "routeN1E1",
      x: 25,
      y: 49,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeE1_to_routeN1E1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 50,
    portal: {
      mapId: "routeS1E1",
      y: 1,
      x: 25,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeE1_to_routeS1E1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 0,
    y: 25,
    portal: {
      mapId: "camp",
      y: 20,
      x: 38,
      orientation: "LEFT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeE1_to_camp",
  },
  {
    type: "LEDGE",
    x: 1,
    y: 24,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge1"),
    id: "ledge1",
    sprite: "/ledges/ledgeDown.png",
    passableFrom: "UP",
  },
  {
    type: "LEDGE",
    x: 2,
    y: 24,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge2"),
    id: "ledge2",
    sprite: "/ledges/ledgeInnerCornerLeft.png",
  },
  {
    type: "LEDGE",
    x: 2,
    y: 25,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge3"),
    id: "ledge3",
    sprite: "/ledges/ledgeLeft.png",
    passableFrom: "RIGHT",
  },
  {
    type: "LEDGE",
    x: 2,
    y: 26,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge4"),
    id: "ledge4",
    sprite: "/ledges/ledgeInnerCornerLeftBottom.png",
  },
  {
    type: "LEDGE",
    x: 1,
    y: 26,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge5"),
    id: "ledge5",
    sprite: "/ledges/ledgeUp.png",
    passableFrom: "DOWN",
  },
  {
    type: "LEDGE",
    x: 24,
    y: 2,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge6"),
    id: "ledge6",
    sprite: "/ledges/ledgeEndBottomLeft.png",
  },
  {
    type: "LEDGE",
    x: 25,
    y: 2,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge7"),
    id: "ledge7",
    sprite: "/ledges/ledgeDown.png",
    passableFrom: "UP",
  },
  {
    type: "LEDGE",
    x: 26,
    y: 2,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "ledge8"),
    id: "ledge8",
    sprite: "/ledges/ledgeEndBottomRight.png",
  },
  {
    y: 48,
    x: 24,
    type: "SNORLAX",
    orientation: "LEFT",
    id: "snorlax-blocker-routeE1",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "snorlax-blocker-routeE1"),
  },
  {
    type: "ROCK",
    y: 33,
    x: 22,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_1"),
    id: "rock_routeE1_1",
  },
  {
    type: "ROCK",
    y: 24,
    x: 40,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_2"),
    id: "rock_routeE1_2",
  },
  {
    type: "ROCK",
    y: 10,
    x: 5,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_1"),
    id: "rock_routeE1_1",
  },
  {
    type: "ROCK",
    y: 5,
    x: 27,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_4"),
    id: "rock_routeE1_4",
  },
  {
    type: "ROCK",
    y: 40,
    x: 46,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_5"),
    id: "rock_routeE1_5",
  },
  {
    type: "ROCK",
    y: 30,
    x: 10,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_6"),
    id: "rock_routeE1_6",
  },
  {
    type: "ROCK",
    y: 42,
    x: 4,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_7"),
    id: "rock_routeE1_7",
  },
  {
    type: "ROCK",
    y: 7,
    x: 46,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_8"),
    id: "rock_routeE1_8",
  },
  {
    type: "ROCK",
    y: 13,
    x: 25,
    conditionFunction: (s) =>
      !s.handledOccupants.some((occ) => occ.id === "rock_routeE1_9"),
    id: "rock_routeE1_9",
  },
  {
    type: "ITEM",
    item: "root-fossil",
    amount: 1,
    x: 32,
    y: 20,
    id: "routeE1_root-fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "routeE1_root-fossil"),
  },
  {
    type: "ITEM",
    item: "claw-fossil",
    amount: 1,
    x: 33,
    y: 20,
    id: "routeE1_claw-fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "routeE1_claw-fossil"),
  },
  ...blaine,
  routeE1Lure,
  ...travellingMerchantRouteE1,
  barryE1,

  ...makeApricornTree({
    x: 5,
    y: 6,
    apricorn: "yellow-apricorn",
    id: "routeE1_yellow_tree_1",
  }),
  ...makeApricornTree({
    x: 7,
    y: 7,
    apricorn: "yellow-apricorn",
    id: "routeE1_yellow_tree_2",
  }),
  ...makeApricornTree({
    x: 8,
    y: 5,
    apricorn: "yellow-apricorn",
    id: "routeE1_yellow_tree_3",
  }),
  silverE1,
  cynthiaE1,
  nE1,
  redE1,
  hughE1,
  {
    type: "POKEMON",
    x: 15,
    y: 28,
    orientation: "RIGHT",
    dexId: 244,
    encounter: {
      name: "entei",
      maxXp: 125000,
      minXp: 125000,
      rarity: "common",
    },
    dialogue: ["Grrr"],
    conditionFunction: (s) =>
      s.pokedex.entei.caughtOnRoutes.length === 0 && getTimeOfDay() === "DAY",
    id: "routeE1_entei",
  },
];
