import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { MoveInfoButton } from "../../components/MoveInfoButton/MoveInfoButton";
import { TmSprite } from "../../components/TmSprite/TmSprite";
import { battleSpriteSize } from "../../constants/baseConstants";
import { MoveBaseData, movesBaseData } from "../../constants/movesBaseData";
import { handledMoves, MoveName } from "../../constants/movesCheckList";
import { typeColors } from "../../constants/typeColors";
import { hexToRgb } from "../../functions/hexToRGB";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { Inventory, joinInventories } from "../../interfaces/Inventory";
import { gemTable, ItemType } from "../../interfaces/Item";
import { PokemonType, realTypes } from "../../interfaces/PokemonType";
import { TM } from "../../interfaces/SaveFile";
import { ListItem } from "../../uiComponents/ListItem/ListItem";
import { Stack } from "../../uiComponents/Stack/Stack";

const getTmCost = (
  m: MoveBaseData,
  isTinkerer: boolean,
): Partial<Inventory> => {
  const gem: ItemType =
    (Object.entries(gemTable)
      .find((g) => g.at(1) === m.type.name)
      ?.at(0) as ItemType | undefined) ?? "normal-gem";
  const statusMoveCost = isTinkerer ? 1 : 2;

  const powerBasedCost = (power: number | null): number => {
    let base = 2;
    if (isTinkerer) {
      base -= 1;
    }
    if (power && power >= 50) {
      base += 1;
    }
    if (power && power >= 70) {
      base += 1;
    }
    if (power && power >= 90) {
      base += 1;
    }

    return base;
  };
  const powerBasedMineral = (power: number | null): number => {
    let base = 0;

    if (power && power >= 90) {
      base += 1;
    }

    return base;
  };
  const mineralAmount = powerBasedMineral(m.power);
  switch (m.move_damage_class_id) {
    case 1:
      return { [`${gem}`]: statusMoveCost };
    case 2:
      if (mineralAmount > 0) {
        return {
          [`${gem}`]: powerBasedCost(m.power),
          zinc: mineralAmount,
        };
      }
      return {
        [`${gem}`]: powerBasedCost(m.power),
      };
    case 3:
      if (mineralAmount > 0) {
        return {
          [`${gem}`]: powerBasedCost(m.power),
          calcium: mineralAmount,
        };
      }
      return {
        [`${gem}`]: powerBasedCost(m.power),
      };
  }
};

const getTmFailChance = (m: MoveBaseData, isTinkerer: boolean): number => {
  let base: number = isTinkerer ? 0.025 : 0.05;

  if (m.move_damage_class_id === 1) {
    base *= 2;
  }
  if (m.power && m.power > 60) {
    base *= 1.5;
  }
  if (m.power && m.power > 90) {
    base *= 1.5;
  }
  return base;
};
export const TmCrafting = (): JSX.Element => {
  const navigate = useNavigate();
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const craft = (tm: TM, cost: Partial<Inventory>, m: MoveBaseData) => {
    const failChance = getTmFailChance(m, saveFile.trait === "tinkerer");

    if (Math.random() < failChance) {
      addMessage({
        icon: <TmSprite type={tm.type} />,
        message: `You were unable to craft a viable tm`,
        onRemoval: () =>
          patchSaveFileReducer({
            bag: joinInventories(saveFile.bag, cost, true),
          }),
      });
    } else
      addMessage({
        icon: <TmSprite type={tm.type} />,
        message: `crafted a ${tm.moveName} TM out of the gems`,
        onRemoval: () =>
          patchSaveFileReducer({
            tms: [...(saveFile.tms ?? []), tm],
            bag: joinInventories(saveFile.bag, cost, true),
            mileStones: {
              ...saveFile.mileStones,
              craftedTmTypes: [
                ...(saveFile.mileStones.craftedTmTypes ?? []),
                tm.type,
              ],
            },
          }),
      });
  };
  const [sortingType, setSortingType] = useState<PokemonType>();
  return (
    <InGamePage
      headline="Tm Crafting"
      goBack={() => navigate("TM_CRAFTING", "OVERWORLD")}
    >
      <Stack mode="column">
        <h3 style={{ margin: ".25rem" }}>
          Craft TMs (Technical Machines) from Gems and Minerals.{" "}
        </h3>
        <h3 style={{ margin: ".25rem" }}>
          A TM can teach a pokemon of the same type a new attack.{" "}
        </h3>
        <h3 style={{ margin: ".25rem" }}>
          {" "}
          Even if the pokemon cant normally learn the move
        </h3>
        <Stack mode={"row"} gapInRem={2}>
          {realTypes.map((t) => (
            <img
              key={t}
              style={{
                outline: t === sortingType ? "2px solid black" : undefined,
                borderRadius: 9000,
              }}
              height={battleSpriteSize}
              src={`/typeIcons/${t}.png`}
              onClick={() => setSortingType(t)}
            />
          ))}
        </Stack>
        {movesBaseData
          .filter((m) => handledMoves.includes(m.name as MoveName))
          .filter((m) => {
            if (!sortingType) {
              return true;
            }
            return m.type.name === sortingType;
          })
          .map((move) => {
            const cost = getTmCost(
              move as MoveBaseData,
              saveFile.trait === "tinkerer",
            );

            const disabled = Object.entries(cost).some(
              ([item, amount]) => saveFile.bag[item as ItemType] < amount,
            );
            return (
              <ListItem
                key={move.name}
                onClick={() =>
                  craft(
                    {
                      type: move.type.name,
                      moveName: move.name as MoveName,
                      id: v4(),
                    },
                    cost,
                    move as MoveBaseData,
                  )
                }
                disabled={disabled}
                backgroundColor={hexToRgb(typeColors[move.type.name], 0.5)}
                primaryIcon={<TmSprite type={move.type.name} />}
                content={`Craft a ${move.name} Tm`}
                additionalContent={
                  <Stack mode="row" alignItems="center">
                    <strong>Materials: </strong>
                    {Object.entries(cost).map(([item, amount], index) => {
                      return (
                        <React.Fragment key={item + index}>
                          <ItemSprite item={item as ItemType} />({amount})
                        </React.Fragment>
                      );
                    })}
                  </Stack>
                }
                infoButton={<MoveInfoButton movename={move.name as MoveName} />}
              />
            );
          })}
      </Stack>
    </InGamePage>
  );
};
