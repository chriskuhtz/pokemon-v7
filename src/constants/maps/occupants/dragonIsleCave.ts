import { OverworldMap } from "../../../interfaces/OverworldMap";

export const dragonIsleCaveOccupants: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "dragon_isle_to_dragon_isle_cave1",
    type: "ON_STEP_PORTAL",
    x: 29,
    y: 24,
    portal: {
      mapId: "dragonIsle",
      x: 29,
      y: 26,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
  },
  {
    id: "dragon_isle_to_dragon_isle_cave2",
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 6,
    portal: {
      mapId: "dragonIsle",
      x: 25,
      y: 8,
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
