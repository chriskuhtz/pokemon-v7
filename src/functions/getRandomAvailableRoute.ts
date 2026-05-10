import { MapId } from "../interfaces/mapIds";
import { SaveFile } from "../interfaces/SaveFile";
import { ArrayHelpers } from "./ArrayHelpers";
import { canAccessApricornClearing } from "./canAccessApricornClearing";

export const getRandomAvailableRoute = (
  s: SaveFile,
  omit: MapId[],
): MapId | undefined => {
  const options: MapId[] = ["routeN1"];

  if (s.campUpgrades["machete certification"]) {
    options.push("routeN1E1");
  }
  if (canAccessApricornClearing(s)) {
    options.push("apricornClearing");
  }
  if (s.campUpgrades["sledge hammer certification"]) {
    options.push("routeE1");
  }
  if (s.campUpgrades["shovel certification"]) {
    options.push("onixCave");
  }
  if (s.campUpgrades["swimming certification"]) {
    options.push("routeS1E1", "routeS1W1", "routeS1");
  }
  if (s.campUpgrades["rock climbing certification"]) {
    options.push("routeW1");
  }
  if (s.campUpgrades["buy skiing equipment"]) {
    options.push("routeN1W1");
  }
  if (s.storage["ilex-ticket"] > 0 || s.bag["ilex-ticket"] > 0) {
    options.push("ilex-forest");
  }
  if (s.storage["murasaki-ticket"] > 0 || s.bag["murasaki-ticket"] > 0) {
    options.push("murasaki-glades");
  }
  if ((s.rangerLevel ?? 0) > 5) {
    options.push("apricornClearing");
  }

  const filteredOptions = options.filter((o) => !omit.includes(o));

  if (filteredOptions.length === 0) {
    return;
  }
  return ArrayHelpers.getRandomEntry(filteredOptions);
};
