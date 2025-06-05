import { isBagOverloaded } from "../../../functions/getBagLimit";
import { OverworldMap } from "../../../interfaces/OverworldMap";

export const campLaboratoryOccupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    x: 10,
    y: 19,
    portal: {
      mapId: "camp",
      x: 30,
      y: 14,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
    id: "camp_to_campLaboratory",
    conditionFunction: (s) => !isBagOverloaded(s),
  },
];
