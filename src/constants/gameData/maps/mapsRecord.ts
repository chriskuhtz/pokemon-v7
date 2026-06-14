import { defaultShaderMap } from "../../../functions/getTimeOfDay";
import { MapId } from "../../../interfaces/mapIds";
import { OverworldMap } from "../../../interfaces/OverworldMap";
import { apricornClearing } from "./apricornClearing";
import { camp } from "./camp";
import { campCave } from "./campCave";
import { campLaboratory } from "./campLaboratory";
import { caveN1W1 } from "./caveN1W1";
import { caveW1 } from "./caveW1";
import { caveW1F1 } from "./caveW1F1";
import { caveW1F2 } from "./caveW1F2";
import { challengeField } from "./challengeField";
import { ilexForest } from "./ilexForest";
import { labyrinthLevel1 } from "./labyrinth/labyrinthLevel1";
import { labyrinthLevel2 } from "./labyrinth/labyrinthLevel2";
import { murasakiGlades } from "./murasakiGlades";
import { onixCave } from "./onixCave";
import { pokemonLeague } from "./pokemonLeague";
import { rakudairoRuins } from "./rakudairoRuins";
import { randomChallengeField } from "./randomChallengeField";
import { rocketCamp } from "./rocketCamp";
import { routeE1 } from "./routeE1";
import { routeN1 } from "./routeN1";
import { routeN1E1 } from "./routeN1E1";
import { routeN1W1 } from "./routeN1W1";
import { routeS1 } from "./routeS1";
import { routeS1E1 } from "./routeS1E1";
import { routeS1W1 } from "./routeS1W1";
import { routeW1 } from "./routeW1";
import { victoryRoad } from "./victoryRoad";
import { victoryRoadExit } from "./victoryRoadExit";
import { victoryRoadExtra } from "./victoryRoadExtra";
import { victoryRoadU1 } from "./victoryRoadU1";

export const mapsRecord: Record<MapId, OverworldMap> = {
  //KUMA VERSION
  camp: camp,
  campCave: campCave,
  campLaboratory: campLaboratory,
  routeN1: routeN1,
  routeN1E1: routeN1E1,
  routeE1: routeE1,
  routeS1E1: routeS1E1,
  routeS1: routeS1,
  routeS1W1: routeS1W1,
  routeW1: routeW1,
  routeN1W1: routeN1W1,
  onixCave: onixCave,
  caveW1: caveW1,
  caveW1F1: caveW1F1,
  caveW1F2: caveW1F2,
  caveN1W1: caveN1W1,
  challengeField: challengeField,
  rocketCamp: rocketCamp,
  randomField: randomChallengeField,
  victoryRoad: victoryRoad,
  victoryRoadU1: victoryRoadU1,
  victoryRoadExtra: victoryRoadExtra,
  victoryRoadExit: victoryRoadExit,
  pokemonLeague: pokemonLeague,
  "ilex-forest": ilexForest,
  "murasaki-glades": murasakiGlades,
  "rakudairo-ruins": rakudairoRuins,
  apricornClearing: apricornClearing,
  //LABYRINTH VERSION
  labyrinth_level_1: labyrinthLevel1,
  labyrinth_level_2: labyrinthLevel2,
};

export const Emptymap: OverworldMap = {
  area: "OPEN",
  id: "camp",
  occupants: [],
  timeOfDayShadersMap: defaultShaderMap,
  tilesetUrl: "/tilesets/newMasterSheet.png",
  questMenuAvailable: true,
  tileMap: {
    baseLayer: [[]],
    waterLayer: [[]],
    foregroundLayer: [[]],
    encounterLayer: [[]],
    obstacleLayer: [[]],
    decorationLayer: [[]],
  },
};
