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
  //OBSTACLES
  {
    type: "CLIMBING_STEPS",
    x: 12,
    y: 8,
    conditionFunction: () => true,
    id: "climbing-steps-victoryRoadExtra-1",
  },
  {
    type: "CLIMBING_STEPS",
    x: 12,
    y: 9,
    conditionFunction: () => true,
    id: "climbing-steps-victoryRoadExtra-2",
  },
  //OVERWORLD_MONS
  //TRAINERS
  //ITEMS
];
