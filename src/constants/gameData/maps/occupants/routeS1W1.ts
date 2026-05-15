import { getTraveller } from "../../../../functions/getTraveller";
import { makeApricornTree } from "../../../../functions/makeApricornTree";
import { makeBerryTree } from "../../../../functions/makeBerryTree";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { OverworldMap } from "../../../../interfaces/OverworldMap";
import { routeS1W1Lure } from "../../../../modules/BerryLure/BerryLure";
import { routeS1W1DragoniteTaxi } from "../../../../modules/DragoniteTaxi/DragoniteTaxi";
import { trainerJasmine } from "./jasmine";
import { sabrina } from "./sabrina";

export const routeS1W1Occupants: OverworldMap["occupants"] = [
  {
    type: "ON_STEP_PORTAL",
    x: 25,
    y: 0,
    portal: {
      mapId: "routeW1",
      x: 25,
      y: 49,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1W1_to_routeW1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 50,
    y: 25,
    portal: {
      mapId: "routeS1",
      y: 25,
      x: 1,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1W1_to_routeS1",
  },
  {
    type: "ON_STEP_PORTAL",
    x: 50,
    y: 35,
    portal: {
      mapId: "routeS1",
      y: 35,
      x: 1,
      orientation: "RIGHT",
      forwardFoot: "CENTER1",
    },
    conditionFunction: () => true,
    id: "routeS1W1_to_routeS1",
  },
  {
    x: 11,
    y: 43,
    type: "ITEM",
    item: "armor-fossil",
    amount: 1,
    conditionFunction: (s) => !occupantHandled(s, "routeS1W1_armor_fossil"),
    id: "routeS1W1_armor_fossil",
  },
  {
    x: 10,
    y: 43,
    type: "ITEM",
    item: "skull-fossil",
    amount: 1,
    conditionFunction: (s) => !occupantHandled(s, "routeS1W1_skull_fossil"),
    id: "routeS1W1_skull_fossil",
  },
  {
    x: 49,
    y: 30,
    type: "ITEM",
    item: "belue-berry",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, "routeS1W1_belue_berry"),
    id: "routeS1W1_belue_berry",
  },
  {
    x: 49,
    y: 1,
    type: "ITEM",
    item: "razz-berry",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, "routeS1W1_razz_berry"),
    id: "routeS1W1_razz_berry",
  },
  {
    x: 6,
    y: 7,
    type: "ITEM",
    item: "rindo-berry",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, "routeS1W1_rindo_berry"),
    id: "routeS1W1_rindo_berry",
  },
  {
    x: 2,
    y: 39,
    type: "ITEM",
    item: "grepa-berry",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, "routeS1W1_grepa_berry"),
    id: "routeS1W1_grepa_berry",
  },

  ...makeApricornTree({
    x: 8,
    y: 43,
    apricorn: "red-apricorn",
    id: "red-apricorn-s1w1",
  }),
  ...makeApricornTree({
    x: 10,
    y: 44,
    apricorn: "white-apricorn",
    id: "white-apricorn-s1w1",
  }),
  ...makeApricornTree({
    x: 11,
    y: 42,
    apricorn: "pink-apricorn",
    id: "pink-apricorn-s1w1",
  }),
  ...makeApricornTree({
    x: 13,
    y: 43,
    apricorn: "pink-apricorn",
    id: "pink-apricorn-s1w1-2",
  }),
  ...makeBerryTree({
    berry: "babiri-berry",
    id: "babiri-tree-routeS1W1",
    x: 35,
    y: 8,
  }),
  ...makeBerryTree({
    berry: "colbur-berry",
    id: "colbur-tree-routeS1W1",
    x: 30,
    y: 12,
  }),
  ...makeBerryTree({
    berry: "wacan-berry",
    id: "wacan-tree-routeS1W1",
    x: 9,
    y: 7,
  }),
  ...getTraveller("routeS1W1"),
  ...sabrina,
  ...routeS1W1DragoniteTaxi,
  trainerJasmine,
  routeS1W1Lure,
];
