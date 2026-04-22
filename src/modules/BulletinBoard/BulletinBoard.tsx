import React, { useCallback, useContext, useMemo } from "react";
import { MdFormatListBulleted } from "react-icons/md";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { battleSpriteSize } from "../../constants/gameData/gameData";
import { getRewardItemsForQuest } from "../../functions/getRewardForQuest";
import { replaceRouteName } from "../../functions/replaceRouteName";
import { useAvailableBulletinQuests } from "../../hooks/useAvailableBulletinQuests";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { ItemType } from "../../interfaces/Item";
import { AnimatedBar } from "../../uiComponents/AnimatedBar/AnimatedBar";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";
import {
  KumaQuestName,
  kumaQuestNames,
} from "../../versions/kuma/questsRecord";

export const BulletinBoard = ({ goBack }: { goBack: () => void }) => {
  const { addMessage } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const acceptQuest = useCallback(
    (name: KumaQuestName) => {
      addMessage({
        message: `Accepted Quest: ${name}`,
        needsNoConfirmation: true,
      });
      patchSaveFileReducer({
        ...saveFile,
        quests: { ...saveFile.quests, [name]: "ACTIVE" },
      });
    },
    [addMessage, patchSaveFileReducer, saveFile],
  );

  const availableQuests = useAvailableBulletinQuests();

  const acceptAllOpenQuests = useCallback(() => {
    addMessage({
      message: `Accepted ${availableQuests.length} new Quests`,
      needsNoConfirmation: true,
    });

    const patchedQuests = { ...saveFile.quests };

    availableQuests.forEach((q) => {
      patchedQuests[q.name] = "ACTIVE";
    });
    patchSaveFileReducer({
      ...saveFile,
      quests: patchedQuests,
    });
  }, [addMessage, availableQuests, patchSaveFileReducer, saveFile]);

  const total = kumaQuestNames.length;

  const numberOfCompletedQuests = useMemo(() => {
    return kumaQuestNames.filter((q) => saveFile.quests[q] === "COLLECTED")
      .length;
  }, [saveFile.quests]);

  return (
    <Page headline={"Bulletin Board:"} goBack={goBack}>
      <Stack mode="column">
        <CompletedQuestsBar
          total={total}
          numberOfCompletedQuests={numberOfCompletedQuests}
        />
        {availableQuests.length > 0 && (
          <Card
            onClick={acceptAllOpenQuests}
            content="Accept all open quests"
            icon={undefined}
            actionElements={[]}
          />
        )}
        {availableQuests.length > 3 ? (
          availableQuests.map(({ name, quest }) => {
            return (
              <Card
                key={name}
                icon={<MdFormatListBulleted size={battleSpriteSize} />}
                content={
                  <div>
                    <h3>{replaceRouteName(name)}</h3>

                    <h5 style={{ display: "flex", alignItems: "center" }}>
                      Reward:
                      {Object.entries(getRewardItemsForQuest(name)).map(
                        ([item, amount]) => (
                          <React.Fragment key={item}>
                            {amount} x <ItemSprite item={item as ItemType} />
                          </React.Fragment>
                        ),
                      )}{" "}
                      {quest.rewardPokemon && (
                        <PokemonSprite name={quest.rewardPokemon.name} />
                      )}
                    </h5>
                    <h5>Research Points: {quest.researchPoints}</h5>
                  </div>
                }
                actionElements={[
                  <button onClick={() => acceptQuest(name)}>
                    Accept Quest
                  </button>,
                ]}
              />
            );
          })
        ) : (
          <strong>Talk to the people in the camp for more Quests</strong>
        )}
      </Stack>
    </Page>
  );
};

const CompletedQuestsBar = ({
  total,
  numberOfCompletedQuests,
}: {
  total: number;
  numberOfCompletedQuests: number;
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <strong style={{ textWrap: "nowrap" }}>Completed Quests:</strong>
      <AnimatedBar
        max={total}
        offset={total - numberOfCompletedQuests}
        color={"blue"}
      />
    </div>
  );
};
