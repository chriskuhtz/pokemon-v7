import { useContext, useMemo } from "react";
import { MapId } from "../constants/maps/mapsRecord";
import { typeColors } from "../constants/typeColors";
import { hexToRgb } from "../functions/hexToRGB";
import { isWater } from "../functions/isWater";
import { PokemonType } from "../interfaces/PokemonType";
import { LocationContext } from "./LocationProvider";

export const mapBattleColors: Record<
  MapId,
  { oppColor: PokemonType; playerColor: PokemonType }
> = {
  routeN1: { oppColor: "grass", playerColor: "normal" },
  routeN1E1: { oppColor: "bug", playerColor: "grass" },
  routeE1: { oppColor: "rock", playerColor: "fire" },
  routeS1E1: { oppColor: "grass", playerColor: "water" },
  routeS1: { oppColor: "water", playerColor: "ice" },
  routeS1W1: { oppColor: "rock", playerColor: "water" },
  routeW1: { oppColor: "rock", playerColor: "ground" },
  caveW1: { oppColor: "ghost", playerColor: "fire" },
  caveW1F1: { oppColor: "ghost", playerColor: "fire" },
  caveW1F2: { oppColor: "ghost", playerColor: "fire" },
  caveN1W1: { oppColor: "ghost", playerColor: "ice" },
  onixCave: { oppColor: "ghost", playerColor: "steel" },
  routeN1W1: { oppColor: "ice", playerColor: "dragon" },
  camp: { oppColor: "fighting", playerColor: "normal" },
  campCave: { oppColor: "ghost", playerColor: "steel" },
  campLaboratory: { oppColor: "water", playerColor: "steel" },
  challengeField: { oppColor: "fighting", playerColor: "normal" },
  randomField: { oppColor: "fighting", playerColor: "normal" },
  rocketCamp: { oppColor: "fighting", playerColor: "dark" },
  victoryRoad: { oppColor: "grass", playerColor: "steel" },
  victoryRoadU1: { oppColor: "ghost", playerColor: "steel" },
  victoryRoadExtra: { oppColor: "grass", playerColor: "steel" },
  victoryRoadExit: { oppColor: "grass", playerColor: "normal" },
  pokemonLeague: { oppColor: "water", playerColor: "steel" },
  dragonIsle: { oppColor: "water", playerColor: "dragon" },
};

export const useLocationColors = (): {
  playerColor: string;
  oppColor: string;
} => {
  const { location } = useContext(LocationContext);

  const oppColor = useMemo(() => {
    return hexToRgb(typeColors[mapBattleColors[location.mapId].oppColor], 0.5);
  }, [location.mapId]);
  const playerColor = useMemo(() => {
    return hexToRgb(
      typeColors[mapBattleColors[location.mapId].playerColor],
      0.5
    );
  }, [location.mapId]);

  return { oppColor, playerColor };
};

export const mapBattlePlatforms: Record<MapId, string> = {
  routeN1: "grass",
  routeN1E1: "forest",
  routeE1: "hills",
  routeS1E1: "plains",
  routeS1: "sand",
  routeS1W1: "grass",
  routeW1: "grass",
  caveW1: "cave",
  caveW1F1: "cave",
  caveW1F2: "cave",
  caveN1W1: "cave",
  onixCave: "cave",
  routeN1W1: "snow",
  camp: "grass",
  campCave: "cave",
  campLaboratory: "street",
  challengeField: "grass",
  randomField: "grass",
  rocketCamp: "street",
  victoryRoad: "cave",
  victoryRoadU1: "cave",
  victoryRoadExtra: "plains",
  victoryRoadExit: "grass",
  pokemonLeague: "street",
  dragonIsle: "grass",
};

export const useLocationBattlePlatform = (): string => {
  const { location } = useContext(LocationContext);

  if (isWater(location.x, location.y, location.mapId)) {
    return "water";
  }

  return mapBattlePlatforms[location.mapId];
};
