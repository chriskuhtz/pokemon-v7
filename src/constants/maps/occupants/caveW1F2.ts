import { OverworldMap } from "../../../interfaces/OverworldMap";

export const caveW1F2Occupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    id: "cave1F2 entry middle hole",
    conditionFunction: () => true,
    x: 35,
    y: 19,
    portal: {
      mapId: "routeW1",
      x: 35,
      y: 21,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave1F2 entry trainer",
    conditionFunction: () => true,
    x: 6,
    y: 17,
    portal: {
      mapId: "routeW1",
      x: 6,
      y: 18,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ON_STEP_PORTAL",
    id: "cave1F2 entry top",
    conditionFunction: () => true,
    x: 23,
    y: 2,
    portal: {
      mapId: "routeW1",
      x: 24,
      y: 2,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  {
    type: "ITEM",
    x: 5,
    y: 3,
    item: "rocky-helmet",
    amount: 1,
    conditionFunction: (s) =>
      !s.handledOccupants.some((h) => h.id === "caveW1-rocky-helmet"),
    id: "caveW1-rocky-helmet",
  },
];
