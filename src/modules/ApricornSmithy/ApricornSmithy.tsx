import { useCallback, useContext, useMemo } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { ArrayHelpers } from "../../functions/ArrayHelpers";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import {
  apricorns,
  apricornTable,
  ApricornType,
  isApricorn,
} from "../../interfaces/Item";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

export const ApricornSmithy = ({ goBack }: { goBack: () => void }) => {
  const { addMessage } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const apricornsInBag: [ApricornType, number][] = useMemo(
    () =>
      Object.entries(saveFile.bag)
        .filter(([, amount]) => amount > 0)
        .filter(([item]) => isApricorn(item)) as [ApricornType, number][],
    [saveFile.bag],
  );

  const craftBall = useCallback(
    (apricorn: ApricornType, amount: number) => {
      const craftedBall =
        saveFile.trait === "maker" && Math.random() > 0.9
          ? apricornTable[
              ArrayHelpers.getRandomEntry(
                [...apricorns].filter((a) => a !== "purple-apricorn"),
              )
            ]
          : apricornTable[apricorn];
      addMessage({
        message: `Crafted ${amount} ${craftedBall} from ${apricorn}`,
        needsNoConfirmation: true,
      });
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, {
          [apricorn]: -amount,
          [craftedBall]: amount,
        }),
        mileStones: { ...saveFile.mileStones, hasCraftedApricorn: true },
      });
    },
    [
      addMessage,
      patchSaveFileReducer,
      saveFile.bag,
      saveFile.mileStones,
      saveFile.trait,
    ],
  );
  return (
    <InGamePage goBack={goBack} headline="Kurt's Apricorn Smithy">
      {apricornsInBag.length === 0 ? (
        <strong>Forage for Apricorn in the wild</strong>
      ) : (
        <Stack mode={"column"}>
          {apricornsInBag.map(([apricorn, amount]) => (
            <Card
              icon={<ItemSprite item={apricorn} sizeFactor={1.5} />}
              content={
                <h3>
                  Turn {apricorn} into {apricornTable[apricorn]}
                </h3>
              }
              actionElements={[
                <strong
                  role="button"
                  tabIndex={0}
                  onClick={() => craftBall(apricorn, 1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      craftBall(apricorn, 1);
                    }
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  make 1{" "}
                  <ItemSprite item={apricornTable[apricorn]} sizeFactor={1.5} />
                </strong>,
                amount > 1 ? (
                  <strong
                    role="button"
                    tabIndex={0}
                    onClick={() => craftBall(apricorn, amount)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        craftBall(apricorn, amount);
                      }
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    make {amount}{" "}
                    <ItemSprite
                      item={apricornTable[apricorn]}
                      sizeFactor={1.5}
                    />
                  </strong>
                ) : undefined,
              ].filter((el) => el !== undefined)}
            />
          ))}
        </Stack>
      )}
    </InGamePage>
  );
};
