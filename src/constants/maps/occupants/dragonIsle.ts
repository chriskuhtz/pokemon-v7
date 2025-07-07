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
  //OVERWORLD_MONS
  //TRAINERS
  //ITEMS
];
