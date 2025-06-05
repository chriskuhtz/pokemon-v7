import { isBagOverloaded } from "../../../functions/getBagLimit";
import { dugtrioExplorers } from "../../../hooks/useDugtrioExplorers";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../interfaces/SpriteEnum";

export const campCaveOccupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    x: 14,
    y: 8,
    portal: {
      mapId: "camp",
      x: 11,
      y: 26,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    id: "camp_to_campCave",
    conditionFunction: (s) => !isBagOverloaded(s),
  },
  {
    type: "ROUTER_NPC",
    to: "FOSSIL_REVIVER",
    orientation: "DOWN",
    x: 3,
    y: 7,
    dialogue: ["Fossils are fascinating", "These Pokemon lived aeons ago"],
    sprite: SpriteEnum.roark,
    conditionFunction: (s) => s.campUpgrades["invite fossil expert"],
    id: "fossil expert",
  },
  ...dugtrioExplorers,
];
