import { OverworldMap } from "../../../interfaces/OverworldMap";

export const dragonIsleOccupants: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "temp_dragon_isle_to_camp",
    type: "ON_STEP_PORTAL",
    x: 21,
    y: 46,
    portal: {
      mapId: "camp",
      x: 2,
      y: 18,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "dragon_isle_to_dragon_isle_mountain",
    type: "ON_STEP_PORTAL",
    x: 49,
    y: 20,
    portal: {
      mapId: "dragonIsleMountain",
      x: 1,
      y: 20,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "dragon_isle_to_dragon_isle_cave1",
    type: "ON_STEP_PORTAL",
    x: 29,
    y: 25,
    portal: {
      mapId: "dragonIsleCave",
      x: 29,
      y: 23,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "dragon_isle_to_dragon_isle_cave2",
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 7,
    portal: {
      mapId: "dragonIsleCave",
      x: 25,
      y: 5,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  //OBSTACLES
  //OVERWORLD_MONS
  //TRAINERS
  //ITEMS
];
