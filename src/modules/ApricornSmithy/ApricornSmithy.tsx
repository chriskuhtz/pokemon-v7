import { useCallback, useContext, useMemo } from "react";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import { apricornTable, ApricornType, isApricorn } from "../../interfaces/Item";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

export const ApricornSmithy = ({ goBack }: { goBack: () => void }) => {
  const { addMessage } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const apricorns: [ApricornType, number][] = useMemo(
    () =>
      Object.entries(saveFile.bag)
        .filter(([, amount]) => amount > 0)
        .filter(([item]) => isApricorn(item)) as [ApricornType, number][],
    [saveFile.bag],
  );

  const craftBall = useCallback(
    (apricorn: ApricornType, amount: number) => {
      addMessage({
        message: `Crafted ${amount} ${apricornTable[apricorn]} from ${apricorn}`,
        needsNoConfirmation: true,
      });
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, {
          [apricorn]: -amount,
          [apricornTable[apricorn]]: amount,
        }),
        mileStones: { ...saveFile.mileStones, hasCraftedApricorn: true },
      });
    },
    [addMessage, patchSaveFileReducer, saveFile.bag, saveFile.mileStones],
  );
  return (
    <Page goBack={goBack} headline="Kurt's Apricorn Smithy">
      {apricorns.length === 0 ? (
        <strong>Forage for Apricorn in the wild</strong>
      ) : (
        <Stack mode={"column"}>
          {apricorns.map(([apricorn, amount]) => (
            <Card
              icon={<ItemSprite item={apricorn} sizeFactor={1.5} />}
              content={
                <h3>
                  Turn {apricorn} into {apricornTable[apricorn]}
                </h3>
              }
              actionElements={[
                <strong
                  onClick={() => craftBall(apricorn, 1)}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  make 1{" "}
                  <ItemSprite item={apricornTable[apricorn]} sizeFactor={1.5} />
                </strong>,
                <strong
                  onClick={() => craftBall(apricorn, amount)}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  make {amount}{" "}
                  <ItemSprite item={apricornTable[apricorn]} sizeFactor={1.5} />
                </strong>,
              ]}
            />
          ))}
        </Stack>
      )}
    </Page>
  );
};
