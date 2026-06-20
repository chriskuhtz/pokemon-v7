import { useContext, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { PokemonSprite } from "../../../components/PokemonSprite/PokemonSprite";

import {
  battleSpriteSize,
  portraitMode,
} from "../../../constants/baseConstants";
import { determineTypeFactor } from "../../../functions/determineTypeFactor";
import { getMovesArray } from "../../../functions/getMovesArray";
import { isPlayerPokemon } from "../../../functions/getPlayerPokemon";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { BattlePokemon } from "../../../interfaces/BattlePokemon";
import { MoveDto } from "../../../interfaces/Move";
import { Card } from "../../../uiComponents/Card/Card";
import { Stack } from "../../../uiComponents/Stack/Stack";
import { ActionType, ChooseActionPayload } from "../interfaces/interfaces";

export function TargetSelection({
  name,
  id,
  targets,
  chooseAction,
  chosenAction,
  setChosenAction,
  moveData,
  disabled,
  controlled,
}: {
  name: string;
  id: string;
  targets: BattlePokemon[];
  chosenAction: ActionType;
  chooseAction: (x: ChooseActionPayload) => void;
  setChosenAction: (x: ActionType | undefined) => void;
  moveData?: MoveDto;
  disabled: boolean;
  controlled: BattlePokemon;
}) {
  const {
    saveFile: { playerId },
  } = useContext(SaveFileContext);
  useEffect(() => {
    //choose the only available option, skip menu
    if (targets.length === 1 && chosenAction !== "SWITCH") {
      chooseAction({
        userId: id,
        actionName: chosenAction,
        targetId: targets[0].id,
      });
      setChosenAction(undefined);
    }
    switch (moveData?.target.name) {
      case "all-allies":
      case "user-and-allies":
      case "users-field":
      case "all-opponents":
      case "opponents-field":
      case "all-other-pokemon":
      case "all-pokemon":
      case "random-opponent":
      case "user":
      case "fainting-pokemon":
      case "entire-field":
        chooseAction({
          userId: id,
          actionName: chosenAction,
          targetId: targets[0].id,
        });
        setChosenAction(undefined);
    }
  }, [
    chooseAction,
    chosenAction,
    id,
    moveData?.target.name,
    setChosenAction,
    targets,
  ]);
  return (
    <div
      style={{
        padding: ".5rem",
      }}
    >
      <strong
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IoIosArrowBack
          role="button"
          size={battleSpriteSize}
          tabIndex={0}
          onClick={() => setChosenAction(undefined)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Backspace" || e.key === "Enter") {
              setChosenAction(undefined);
            }
          }}
        />
        Who is the target for {name}'s {chosenAction}?
      </strong>
      <div
        style={
          portraitMode
            ? {
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: ".25rem",
              }
            : {
                display: "flex",
                gap: "1rem",
                flexDirection: "row",
              }
        }
      >
        {!["ether", "max-ether"].includes(chosenAction) && (
          <Stack mode={portraitMode ? "column" : "row"}>
            {targets
              .filter((t) => !isPlayerPokemon(t, playerId))
              .map((t) => {
                const typeFactor = moveData
                  ? determineTypeFactor(
                      t,
                      controlled,
                      { data: moveData },
                      undefined,
                      undefined,
                    )
                  : 1;
                const typeHint = typeFactor !== 1 ? `(x${typeFactor} Dmg)` : "";
                return (
                  <Card
                    icon={
                      <PokemonSprite
                        sizeFactor={0.8}
                        name={t.name}
                        config={{
                          shiny: t.shiny,
                          back: false,
                        }}
                      />
                    }
                    content={`Opponent ${t.data.name} ${typeHint}`}
                    key={t.id}
                    onClick={() => {
                      chooseAction({
                        userId: id,
                        actionName: chosenAction,
                        targetId: t.id,
                      });
                      setChosenAction(undefined);
                    }}
                    actionElements={[]}
                    disabled={disabled}
                  />
                );
              })}
            {targets
              .filter((t) => isPlayerPokemon(t, playerId))
              .map((t) => (
                <Card
                  icon={
                    <PokemonSprite
                      sizeFactor={0.8}
                      name={t.name}
                      config={{
                        shiny: t.shiny,
                        back: true,
                      }}
                    />
                  }
                  content={`Your ${t.data.name}`}
                  key={t.id}
                  onClick={() => {
                    chooseAction({
                      userId: id,
                      actionName: chosenAction,
                      targetId: t.id,
                    });
                    setChosenAction(undefined);
                  }}
                  actionElements={[]}
                  disabled={disabled}
                />
              ))}
          </Stack>
        )}

        {["ether", "max-ether"].includes(chosenAction) &&
          targets.map((t) => {
            const moves = getMovesArray(t);

            return moves
              .filter((m) => m.usedPP > 0)
              .map((m) => (
                <button
                  disabled={disabled}
                  key={t.id + m.name}
                  onClick={() => {
                    chooseAction({
                      userId: id,
                      actionName: chosenAction,
                      targetId: t.id,
                      moveToRestore: m.name,
                    });
                    setChosenAction(undefined);
                  }}
                >
                  {t.data.name} {m.name}
                </button>
              ));
          })}
      </div>
    </div>
  );
}
