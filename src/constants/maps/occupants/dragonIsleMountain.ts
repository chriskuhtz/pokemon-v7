import { OverworldMap } from "../../../interfaces/OverworldMap";

export const dragonIsleMountainOccupants: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "dragon_isle_to_dragon_isle_camp",
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
  //OBSTACLES
  //OVERWORLD_MONS
  //TRAINERS
  //ITEMS
];
