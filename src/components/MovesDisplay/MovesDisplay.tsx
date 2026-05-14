import React from "react";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";
import { MoveInfoButton } from "../MoveInfoButton/MoveInfoButton";
import { MovesDisplayListEntry } from "./components/MovesDisplayListEntry";
import { useMovesDisplay } from "./hooks/useMovesDisplay";

export const MovesDisplay = ({
  ownedPokemon,
  onlyCurrent = false,
  small = false,
}: {
  ownedPokemon: OwnedPokemon;
  onlyCurrent?: boolean;
  small?: boolean;
}) => {
  const { b, activateMove, deActivateMove, reorder, currentMoves } =
    useMovesDisplay({
      ownedPokemon,
    });
  if (!b) {
    return <></>;
  }
  return (
    <>
      <MovesListWrapper>
        {currentMoves.map((o) => (
          <MovesDisplayListEntry
            small={small}
            key={o.name}
            o={o.name}
            battlePokemon={b}
            reorder={(dir) => reorder(dir, o.name)}
            onlyCurrent={!!onlyCurrent}
            currentMoves={currentMoves.map((c) => c.name)}
            activateMove={() => activateMove(o.name)}
            deActivateMove={() => deActivateMove(o)}
          />
        ))}
      </MovesListWrapper>
      <Stack mode="column">
        {!onlyCurrent
          ? ownedPokemon.unlockedMoves
              .filter((u) => !currentMoves.some((c) => c.name === u))
              .map((o) => (
                <div
                  key={o}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <Card
                      key={o}
                      actionElements={[]}
                      disabled={
                        !currentMoves.some((c) => c.name === o) &&
                        currentMoves.length === 4
                      }
                      icon={<MdRadioButtonUnchecked />}
                      onClick={() => {
                        if (!currentMoves.some((c) => c.name === o)) {
                          if (currentMoves.length === 4) {
                            return;
                          } else activateMove(o);
                        }
                      }}
                      content={<strong>{o}</strong>}
                    />
                  </div>
                  <MoveInfoButton movename={o} />
                </div>
              ))
          : [<React.Fragment key={"bla"}></React.Fragment>]}
      </Stack>
    </>
  );
};

const MovesListWrapper = ({ children }: { children: React.ReactElement[] }) => {
  return <Stack mode="column">{children}</Stack>;
};
