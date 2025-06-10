import { OverworldMap } from "../../../interfaces/OverworldMap";

export const caveN1W1Occupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    x: 29,
    y: 38,
    portal: {
      mapId: "routeN1W1",
      x: 29,
      y: 40,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeN1W1_to_caveN1W1_1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 24,
    y: 25,
    portal: {
      mapId: "routeN1W1",
      x: 24,
      y: 27,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeN1W1_to_caveN1W1_2",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 44,
    y: 4,
    portal: {
      mapId: "routeN1W1",
      x: 44,
      y: 6,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeN1W1_to_caveN1W1_3",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 27,
    y: 4,
    portal: {
      mapId: "routeN1W1",
      x: 27,
      y: 6,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeN1W1_to_caveN1W1_4",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 13,
    y: 8,
    portal: {
      mapId: "routeN1W1",
      x: 13,
      y: 10,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeN1W1_to_caveN1W1_5",
  },
  {
    type: "ITEM",
    item: "helix-fossil",
    amount: 1,
    x: 8,
    y: 2,
    id: "caveN1W1_helix_fossil",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveN1W1_helix_fossil"),
  },
  /*{
    type: "ITEM",
    item: "?",
    amount: 1,
    x: 32,
    y: 16,
    id: "caveN1W1_?",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveN1W1_?"),
  }, */
  /*{
    type: "ITEM",
    item: "?",
    amount: 1,
    x: 1,
    y: 14,
    id: "caveN1W1_?",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveN1W1_?"),
  }, */
  /*{
    type: "ITEM",
    item: "?",
    amount: 1,
    x: 27,
    y: 26,
    id: "caveN1W1_?",
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveN1W1_?"),
  }, */
];
