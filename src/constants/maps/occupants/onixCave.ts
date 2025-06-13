import { OverworldMap } from "../../../interfaces/OverworldMap";
import { brock } from "./brock";

export const onixCaveOccupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    id: "cave exit to meadow",
    conditionFunction: () => true,
    x: 1,
    y: 1,
    portal: {
      mapId: "routeN1",
      x: 3,
      y: 3,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    sprite: "/mapObjects/ladderUp.png",
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave exit to plains",
    conditionFunction: () => true,
    x: 48,
    y: 47,
    portal: {
      mapId: "routeS1E1",
      x: 3,
      y: 3,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    sprite: "/mapObjects/ladderUp.png",
  },
  {
    type: "ITEM",
    item: "dome-fossil",
    amount: 1,
    x: 33,
    y: 2,
    id: "onixCave_dome_fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "onixCave_dome_fossil"),
  },
  {
    type: "ITEM",
    item: "black-augurite",
    amount: 1,
    x: 14,
    y: 28,
    id: "onixCave_fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "onixCave_fossil"),
  },
  {
    type: "ITEM",
    item: "dawn-stone",
    amount: 1,
    x: 5,
    y: 14,
    id: "onixCave_fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "onixCave_fossil"),
  },
  {
    type: "ITEM",
    item: "moon-stone",
    amount: 1,
    x: 5,
    y: 45,
    id: "onixCave_fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "onixCave_fossil"),
  },
  {
    type: "ITEM",
    item: "dusk-stone",
    amount: 1,
    x: 25,
    y: 24,
    id: "onixCave_fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "onixCave_fossil"),
  },
  ...brock,
];
