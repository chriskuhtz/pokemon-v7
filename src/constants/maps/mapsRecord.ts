import { defaultShaderMap } from "../../functions/getTimeOfDay";
import { OverworldMap } from "../../interfaces/OverworldMap";
import { challengeFieldId, randomFieldId } from "../gameData";
import { camp } from "./camp";
import { campFarm } from "./campFarm";
import { caveW1 } from "./caveW1";
import { caveW12 } from "./caveW12";
import { caveW13 } from "./caveW13";
import { challengeField } from "./challengeField";
import { onixCave } from "./onixCave";
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

export const mapIds = [
  "camp",
  "campFarm",
  "routeN1",
  "routeN1E1",
  "routeE1",
  "onixCave",
  "routeS1E1",
  "routeS1",
  "routeS1W1",
  "routeW1",
  "routeN1W1",
  "caveW1",
  "caveW12",
  "caveW13",
  challengeFieldId,
  randomFieldId,
  "rocketCamp",
] as const;
export type MapId = (typeof mapIds)[number];

export const mapsRecord: Record<MapId, OverworldMap> = {
  camp: camp,
  campFarm: campFarm,
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
  caveW12: caveW12,
  caveW13: caveW13,
  challengeField: challengeField,
  rocketCamp: rocketCamp,
  randomField: randomChallengeField,
};

export const mapDisplayNames: Record<MapId, string> = {
  routeN1: "akai meadow",
  routeN1E1: "orenji forest",
  routeE1: "kiiro highlands",
  routeS1E1: "midori plains",
  routeS1: "aoi lake",
  routeS1W1: "kuro hills",
  routeW1: "shiro cliffs",
  caveW1: "shiro cave E",
  caveW12: "shiro cave O1",
  caveW13: "shiro cave O2",
  routeN1W1: "koniro plateau",
  camp: "kuma camp",
  campFarm: "kuma farm",
  onixCave: "onix cave",
  challengeField: "challenge field",
  randomField: "challenge field",
  rocketCamp: "Rocket Camp",
};

export const Emptymap: OverworldMap = {
  area: "OPEN",
  id: "camp",
  occupants: [],
  timeOfDayShadersMap: defaultShaderMap,
  tilesetUrl: "/tilesets/palletTown.png",
  tileMap: {
    baseLayer: [[]],
    waterLayer: [[]],
    foregroundLayer: [[]],
    encounterLayer: [[]],
    obstacleLayer: [[]],
    decorationLayer: [[]],
  },
};
