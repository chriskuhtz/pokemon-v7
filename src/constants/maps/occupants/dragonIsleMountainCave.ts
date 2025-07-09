import { OverworldMap } from "../../../interfaces/OverworldMap";

export const dragonIsleMountainCaveOccupants: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "dragon_isle_mountain_to_dragon_isle_mountain_cave1",
    type: "ON_STEP_PORTAL",
    x: 6,
    y: 13,
    portal: {
      mapId: "dragonIsleMountain",
      x: 29,
      y: 20,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "dragon_isle_mountain_to_dragon_isle_mountain_cave2",
    type: "ON_STEP_PORTAL",
    x: 22,
    y: 26,
    portal: {
      mapId: "dragonIsleMountain",
      x: 36,
      y: 33,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  //OBSTACLES
  //OVERWORLD_MONS
  //TRAINERS
  //ITEMS
];
