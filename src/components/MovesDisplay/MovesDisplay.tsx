import React from "react";
import { FaArrowDown, FaArrowUp, FaCheck, FaX } from "react-icons/fa6";
import { MoveName } from "../../constants/movesCheckList";
import { getCurrentPP } from "../../functions/getCurrentPP";
import { getMovesArray } from "../../functions/getMovesArray";
import { useGetMoveData } from "../../hooks/useGetMoveData";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { Stack } from "../../uiComponents/Stack/Stack";
import {
  MoveDisplayEntry,
  PPAndStrengthSection,
} from "./components/MovesDisplayListEntry";
import { useMovesDisplay } from "./hooks/useMovesDisplay";

export const MovesDisplay = ({
  ownedPokemon,
  onlyCurrent = false,
}: {
  ownedPokemon: OwnedPokemon;
  onlyCurrent?: boolean;
}) => {
  const { b, activateMove, deActivateMove, reorder, currentMoves } =
    useMovesDisplay({
      ownedPokemon,
    });
  if (!b) {
    return <></>;
  }
  return (
    <Stack mode="column">
      <strong>Active Moves (max. 4):</strong>
      {currentMoves.map((o, index) => {
        const battleMove = getMovesArray(b).find(
          (move) => move.name === o.name,
        );
        if (!battleMove) {
          return <></>;
        }
        const currentPP = getCurrentPP(b, battleMove);
        return (
          <MoveDisplayEntry
            onClick={() => deActivateMove(o)}
            key={o.name}
            typeName={battleMove.data.type.name}
            moveName={o.name}
            additionalInfo={
              <PPAndStrengthSection
                data={battleMove.data}
                currentPP={currentPP}
              />
            }
            additionalIcons={[
              index !== 0 ? (
                <FaArrowUp onClick={() => reorder("UP", o.name)} />
              ) : undefined,
              index !== currentMoves.length - 1 ? (
                <FaArrowDown onClick={() => reorder("DOWN", o.name)} />
              ) : undefined,
              currentMoves.length > 1 ? (
                <FaX onClick={() => deActivateMove(o)} />
              ) : undefined,
            ].filter((icon) => icon !== undefined)}
          />
        );
      })}
      {ownedPokemon.unlockedMoves.filter(
        (u) => !currentMoves.some((c) => c.name === u),
      ).length > 0 &&
        !onlyCurrent && <strong>Available Moves:</strong>}
      {!onlyCurrent
        ? ownedPokemon.unlockedMoves
            .filter((u) => !currentMoves.some((c) => c.name === u))
            .map((o) => (
              <UnlockedMoveDisplay
                key={o}
                moveName={o}
                activate={
                  currentMoves.length < 4 ? () => activateMove(o) : undefined
                }
                pp={
                  ownedPokemon.deactivatedMoves?.find((d) => d.name === o)
                    ?.usedPP
                }
              />
            ))
        : [<React.Fragment key={"bla"}></React.Fragment>]}
    </Stack>
  );
};

const UnlockedMoveDisplay = ({
  moveName,
  pp,
  activate,
}: {
  moveName: MoveName;
  pp: number | undefined;
  activate: (() => void) | undefined;
}) => {
  const { res } = useGetMoveData(moveName);

  if (!res) {
    return;
  }

  return (
    <MoveDisplayEntry
      onClick={activate}
      moveName={moveName}
      typeName={res.type.name}
      additionalIcons={activate ? [<FaCheck onClick={activate} />] : undefined}
      additionalInfo={
        <PPAndStrengthSection data={res} currentPP={pp ?? res.pp} />
      }
    />
  );
};
