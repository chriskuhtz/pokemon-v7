import { isBagOverloaded } from "../../../functions/getBagLimit";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { elmLine } from "./elmLine";
import { oakLine } from "./oakLine";
import { rowanLine } from "./rowanLine";

export const campLaboratoryOccupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    x: 10,
    y: 13,
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
  ...oakLine,
  ...elmLine,
  ...rowanLine,
];
