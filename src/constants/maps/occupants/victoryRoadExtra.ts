import { OverworldMap } from "../../../interfaces/OverworldMap";

export const victoryRoadOccupantsExtra: OverworldMap["occupants"] = [
  //PORTALS
  {
    id: "victory_road_lower_level_to_victory_road_extra_cave",
    type: "ON_STEP_PORTAL",
    x: 20,
    y: 38,
    portal: {
      mapId: "victoryRoadU1",
      x: 8,
      y: 4,
      orientation: "DOWN",
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
  {
    type: "POKEMONSTATUE",
    x: 17,
    y: 20,
    orientation: "LEFT",
    dexId: 144,
    dialogue: ["A strange statue.", "You feel a cold wind."],
    conditionFunction: (s) => true,
    id: "victory-road_arcticuno_statue",
    activeCondition: (s) => true,
  },
  {
    type: "POKEMONSTATUE",
    x: 23,
    y: 20,
    orientation: "RIGHT",
    dexId: 146,
    dialogue: ["A strange statue.", "You feel a gust of hot air."],
    conditionFunction: (s) => true,
    id: "victory-road_moltres_statue",
    activeCondition: (s) => true,
  },
  {
    type: "POKEMONSTATUE",
    x: 20,
    y: 23,
    orientation: "DOWN",
    dexId: 145,
    dialogue: ["A strange statue.", "You feel a spark in the air."],
    conditionFunction: (s) => true,
    id: "victory-road_zapdos_statue",
    activeCondition: (s) => true,
  },
];
