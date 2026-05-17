import { useCallback, useContext } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import { ItemType } from "../../interfaces/Item";

import {
  CharacterTrait,
  traitBonusExplanations,
  traitColors,
  traitLoadOuts,
  traitResearchBoni,
  traits,
} from "../../interfaces/Trait";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

export const TraitSelection = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const proceed = useCallback(
    (trait: CharacterTrait) => {
      patchSaveFileReducer({
        storage: joinInventories(
          saveFile.storage,
          traitLoadOuts[trait].storage,
        ),
        trait,
        meta:
          saveFile.pokemon.length > 0
            ? { activeTab: "OVERWORLD" }
            : saveFile.meta,
      });
    },
    [
      patchSaveFileReducer,
      saveFile.meta,
      saveFile.pokemon.length,
      saveFile.storage,
    ],
  );

  return (
    <InGamePage headline="How would you describe yourself:">
      <Stack mode="column" alignItems="stretch" justifyContent="center">
        {traits.map((trait) => {
          const loadOut = traitLoadOuts[trait];
          return (
            <Card
              backgroundColor={traitColors[trait]}
              key={trait}
              onClick={() => proceed(trait)}
              icon={undefined}
              content={
                <Stack mode="column" gapInRem={2}>
                  <h3>{trait}:</h3>

                  {traitBonusExplanations[trait].map((t) => (
                    <div key={t}>
                      <strong>{t}</strong>
                    </div>
                  ))}

                  <div>
                    <strong>
                      gains more points for:{" "}
                      {Object.keys(traitResearchBoni[trait])
                        .map((bonus) => `${bonus} Quests`)
                        .join(", ")}
                    </strong>
                  </div>
                  <div>
                    <strong>Supplies:</strong>
                    <Stack mode="row" alignItems="center" flexWrap="wrap">
                      {Object.entries(loadOut.storage ?? {})
                        .filter(([, amount]) => amount > 0)
                        .map(([item, amount]) => (
                          <Stack mode="row" alignItems="center" key={item}>
                            {amount} x <ItemSprite item={item as ItemType} />
                          </Stack>
                        ))}
                    </Stack>{" "}
                  </div>
                </Stack>
              }
              actionElements={[]}
            />
          );
        })}
      </Stack>
    </InGamePage>
  );
};
