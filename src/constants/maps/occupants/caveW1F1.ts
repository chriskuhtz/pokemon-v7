import { OverworldMap } from "../../../interfaces/OverworldMap";

export const caveW1F1Occupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    id: "cave1 cave1F1",
    conditionFunction: () => true,
    x: 47,
    y: 21,
    portal: {
      mapId: "caveW1",
      x: 48,
      y: 21,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave1F1 entry middle",
    conditionFunction: () => true,
    x: 3,
    y: 26,
    portal: {
      mapId: "routeW1",
      x: 3,
      y: 27,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave1F1 waterfall entry",
    conditionFunction: () => true,
    x: 27,
    y: 36,
    portal: {
      mapId: "routeW1",
      x: 27,
      y: 37,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave1F1 waterfall entry",
    conditionFunction: () => true,
    x: 28,
    y: 36,
    portal: {
      mapId: "routeW1",
      x: 28,
      y: 37,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ITEM",
    x: 26,
    y: 14,
    item: "sail-fossil",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveW1-sail-fossil"),
    id: "caveW1-sail-fossil",
  },
  {
    type: "ITEM",
    x: 48,
    y: 3,
    item: "revive",
    amount: 2,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveW1-revive"),
    id: "caveW1-revive",
  },
];
