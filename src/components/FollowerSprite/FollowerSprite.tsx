import { useContext, useEffect, useMemo } from "react";
import { fps } from "../../constants/baseConstants";
import { baseInternalDex } from "../../constants/baseInternalDex";
import { getNextLocation } from "../../functions/getNextLocation";
import { getOppositeDirection } from "../../functions/getOppositeDirection";
import { getYOffsetFromOrientation } from "../../functions/getYOffsetFromOrientation";
import { isPassable } from "../../functions/isPassable";
import { LocationContext } from "../../hooks/LocationProvider";
import { BaseSizeContext } from "../../hooks/useBaseSize";
import { GameDataContext } from "../../hooks/useGameData";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { Occupant } from "../../interfaces/Occupant";
import { OverworldMap } from "../../interfaces/OverworldMap";
import { CharacterLocationData } from "../../interfaces/SaveFile";
import { playerCanvasId } from "../../modules/Overworld/constants/constants";
import { useDrawCharacter } from "../../modules/Overworld/hooks/useDrawCharacter";
import { threeDigitString } from "../../modules/Overworld/hooks/useDrawOccupants";

const followerCanvasId = "followerCanvas";

export const FollowerSprite = ({
  map,
  occupants,
}: {
  map: OverworldMap;
  occupants: Occupant[];
}): JSX.Element => {
  const { saveFile } = useContext(SaveFileContext);
  const { location } = useContext(LocationContext);
  const { baseSize } = useContext(BaseSizeContext);
  const gameData = useContext(GameDataContext);

  const mon = useMemo(() => {
    return saveFile.pokemon.find((p) => p.onTeam && p.damage < p.maxHp);
  }, [saveFile]);
  const firstTeamMemberDexId = useMemo(() => {
    if (!mon) {
      return -1;
    }

    return baseInternalDex[mon.name].dexId;
  }, [mon]);

  const showFollower = useMemo(() => {
    if (firstTeamMemberDexId > 741 || firstTeamMemberDexId < 0) {
      return false;
    }
    if (saveFile.flying) {
      return false;
    }

    const isWaterPokemon: boolean = !!(
      mon && gameData.internalDex[mon.name].types.includes("water")
    );
    const isFlyingPokemon: boolean = !!(
      mon && gameData.internalDex[mon.name].types.includes("flying")
    );
    return isPassable({
      nextLocation: getNextLocation(
        location,
        getOppositeDirection(location.orientation),
      ),
      playerLocation: location,
      map,
      currentOccupants: occupants,
      canClimb: true,
      canSwim: isWaterPokemon,
      flying: isFlyingPokemon,
    });
  }, [
    firstTeamMemberDexId,
    gameData.internalDex,
    location,
    map,
    mon,
    occupants,
    saveFile.flying,
  ]);

  useDrawFollowerPokemon(followerCanvasId, location, firstTeamMemberDexId);

  if (showFollower) {
    return (
      <canvas
        style={{
          top:
            location.orientation === "DOWN"
              ? -baseSize
              : location.orientation === "UP"
                ? baseSize
                : 0,
          left:
            location.orientation === "LEFT"
              ? baseSize
              : location.orientation === "RIGHT"
                ? -baseSize
                : 0,
          transitionProperty: "top,left",
          transition: `${fps} ease 0s`,
          position: "absolute",
          zIndex: -1,
        }}
        id={followerCanvasId}
        height={baseSize}
        width={baseSize}
      />
    );
  }
  return <></>;
};

export const useDrawFollowerPokemon = (
  canvasId: string,
  playerLocation: CharacterLocationData,
  dexId: number,
) => {
  const { baseSize } = useContext(BaseSizeContext);

  const yOffset = useMemo(
    () => getYOffsetFromOrientation(playerLocation.orientation),
    [playerLocation.orientation],
  );

  const xOffset = useMemo(() => {
    if (playerLocation.forwardFoot === "LEFT") {
      return -3 * 64;
    }
    if (playerLocation.forwardFoot === "CENTER2") {
      return -2 * 64;
    }
    if (playerLocation.forwardFoot === "RIGHT") {
      return -64;
    }
    return 0;
  }, [playerLocation.forwardFoot]);

  useEffect(() => {
    if (dexId > 999) {
      //we dont have sprites for newer / special pokemon
      return;
    }
    const el: HTMLCanvasElement | null = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement | null;

    const ctx = el?.getContext("2d");

    const img = new Image();

    img.addEventListener("load", () => {
      ctx?.clearRect(0, 0, baseSize, baseSize);
      ctx?.drawImage(img, -xOffset, -yOffset, 64, 64, 0, 0, baseSize, baseSize);
    });

    img.src = `/overworldPokemonSprites/${threeDigitString(dexId)}.png`;
  }, [baseSize, canvasId, dexId, xOffset, yOffset]);
};

export const PlayerSprite = ({ map }: { map: OverworldMap }) => {
  const { saveFile } = useContext(SaveFileContext);
  const { location } = useContext(LocationContext);
  const { baseSize } = useContext(BaseSizeContext);

  const sprite = useMemo(() => {
    if (saveFile.flying) {
      return "pidgeot";
    }
    const onWater = map.tileMap.waterLayer[location.y][location.x];
    const onSnow = map.id === "routeN1W1";
    if (onWater && saveFile.swimmerSprite) {
      return saveFile.swimmerSprite;
    }
    if (onSnow && saveFile.skierSprite) {
      return saveFile.skierSprite;
    }

    return saveFile.sprite;
  }, [
    saveFile.flying,
    saveFile.swimmerSprite,
    saveFile.sprite,
    saveFile.skierSprite,
    map.tileMap.waterLayer,
    map.id,
    location.y,
    location.x,
  ]);

  useDrawCharacter(playerCanvasId, location, sprite);
  useDrawCharacter("playerForeground", location, sprite);
  return (
    <>
      <canvas
        id={playerCanvasId}
        height={baseSize * 1.5}
        style={{ marginTop: -baseSize * 0.5 }}
        width={baseSize}
      />
      <canvas
        id={"playerForeground"}
        height={baseSize * 0.5}
        style={{
          top: -baseSize,
          marginTop: -baseSize * 0.5,
          position: "relative",
          left: -baseSize,
        }}
        width={baseSize}
      />
    </>
  );
};
