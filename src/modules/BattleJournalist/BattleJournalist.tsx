import { useCallback, useContext, useMemo } from "react";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";

import { SpriteIcon } from "../../components/SpriteIcon/SpriteIcon";
import { ArrayHelpers } from "../../functions/ArrayHelpers";
import { calculateLevelData } from "../../functions/calculateLevelData";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import { ItemType, moveUnlockPayments } from "../../interfaces/Item";
import { JournalEntryData } from "../../interfaces/JournalEntryData";
import { RouterNpc } from "../../interfaces/Occupant";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";
import { allJournalEntries } from "../TrainerNotes/TrainerNotes";

export const BattleJournalist = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMultipleMessages } = useContext(MessageQueueContext);

  const navigate = useNavigate();

  const tradeSnackForNotes = useCallback(
    (data: JournalEntryData, cost: ItemType) => {
      addMultipleMessages([
        {
          icon: <SpriteIcon sprite={SpriteEnum["gangster"]} />,
          message: "Thanks for the tastiness, big dog",
        },
        {
          icon: <SpriteIcon sprite={SpriteEnum["gangster"]} />,
          message: "Break a leg",
        },
        {
          icon: <ItemSprite item={cost} />,
          message: `Handed over 1 ${cost} in exchange for notes about ${data.trainer.id}`,
          onRemoval: () =>
            patchSaveFileReducer({
              bag: joinInventories(saveFile.bag, { [cost]: 1 }, true),
              trainerNotes: [
                ...(saveFile.trainerNotes ?? []),
                { xpOverwrite: data.xpOverwrite, id: data.trainer.id },
              ],
            }),
        },
      ]);
    },
    [
      addMultipleMessages,
      patchSaveFileReducer,
      saveFile.bag,
      saveFile.trainerNotes,
    ],
  );

  const availableForPurchase = useMemo(
    () =>
      allJournalEntries.filter(
        (note) =>
          !saveFile.trainerNotes?.some(
            (ownedNote) =>
              ownedNote.id === note.trainer.id &&
              ownedNote.xpOverwrite === note.xpOverwrite,
          ),
      ),
    [saveFile.trainerNotes],
  );
  return (
    <Page
      headline="Battle Journalist"
      goBack={() => navigate("BATTLE_JOURALIST", "OVERWORLD")}
    >
      <Stack mode="column">
        <h3>Trade Snacks for the Journalists Notes:</h3>
        {availableForPurchase.map((data, index) => {
          const cost = ArrayHelpers.getEntryWithOverflow(
            moveUnlockPayments,
            index,
          );
          return (
            <Card
              disabled={saveFile.bag[cost] <= 0}
              onClick={() => tradeSnackForNotes(data, cost)}
              key={data.trainer.id + data.xpOverwrite}
              icon={
                data.trainer.profilePicture ? (
                  <img src={`${data.trainer.profilePicture}`} />
                ) : (
                  <SpriteIcon sprite={data.trainer.sprite} />
                )
              }
              content={
                data.xpOverwrite ? (
                  <strong>
                    Notes about {data.trainer.id} at lvl{" "}
                    {calculateLevelData(data.xpOverwrite, "medium").level} or
                    lower
                  </strong>
                ) : (
                  <strong>Notes about {data.trainer.id}</strong>
                )
              }
              actionElements={[
                <Stack mode="row" alignItems="center">
                  Buy for <ItemSprite item={cost} />
                </Stack>,
              ]}
            />
          );
        })}
      </Stack>
    </Page>
  );
};

export const battleJournalist: RouterNpc = {
  id: "battle-journalist",
  conditionFunction: (s) => s.campUpgrades["battle journalist"],
  dialogue: [
    "Whats good, big dog",
    "I've gabbed and gossiped",
    "with all the gnarly trainers around here",
    "Just bring me something tasty",
    "and we can have a look at my notes",
  ],
  x: 29,
  y: 27,
  orientation: "RIGHT",
  sprite: SpriteEnum.gangster,
  type: "ROUTER_NPC",
  to: "BATTLE_JOURALIST",
};
