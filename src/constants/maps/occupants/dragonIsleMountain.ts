import { OverworldMap } from "../../../interfaces/OverworldMap";

export const dragonIsleMountainOccupants: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "dragon_isle_to_dragon_isle_mountain",
    type: "ON_STEP_PORTAL",
    x: 0,
    y: 20,
    portal: {
      mapId: "dragonIsle",
      x: 48,
      y: 20,
      orientation: "LEFT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "dragon_isle_mountain_to_dragon_isle_mountain_cave1",
    type: "ON_STEP_PORTAL",
    x: 29,
    y: 19,
    portal: {
      mapId: "dragonIsleMountainCave",
      x: 6,
      y: 12,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "dragon_isle_mountain_to_dragon_isle_mountain_cave2",
    type: "ON_STEP_PORTAL",
    x: 36,
    y: 32,
    portal: {
      mapId: "dragonIsleMountainCave",
      x: 22,
      y: 25,
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
