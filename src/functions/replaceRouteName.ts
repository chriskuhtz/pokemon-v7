import { mapDisplayNames } from "../constants/gameData/maps/mapsRecord";
import { MapId, mapIds } from "../interfaces/mapIds";

export const replaceRouteName = (input: string): string => {
  return input
    .split(" ")
    .map((word) => {
      if (mapIds.includes(word as MapId)) {
        return mapDisplayNames[word as MapId];
      }
      return word;
    })
    .join(" ");
};
