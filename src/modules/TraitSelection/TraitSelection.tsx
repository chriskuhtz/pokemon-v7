import { useCallback, useContext } from "react";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { SaveFileContext } from "../../hooks/useSaveFile";
import {
  EmptyInventory,
  Inventory,
  joinInventories,
} from "../../interfaces/Inventory";
import { ItemType } from "../../interfaces/Item";
import { researchBoni } from "../../interfaces/Quest";
import { CharacterTrait, traitBoni, traits } from "../../interfaces/SaveFile";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

const loadOuts: Record<CharacterTrait, { storage: Inventory }> = {
  chef: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 5,
      "big-malasada": 1,
      "old-gateau": 1,
      casteliacone: 1,
      "rage-candy-bar": 1,
      "pewter-crunchies": 1,
      "moomoo-cheese": 1,
      "lumiose-galette": 1,
      "lava-cookie": 1,
    }),
  },
  gardener: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "sitrus-berry": 5,
      "lum-berry": 5,
      "shuca-berry": 1,
      "hondew-berry": 1,
      honey: 3,
      "big-root": 1,
      "miracle-seed": 1,
      "surprise-mulch": 5,
    }),
  },
  competitor: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "scope-lens": 1,
      "expert-belt": 1,
      "shell-bell": 1,
      "wide-lens": 1,
      "choice-band": 1,
      "choice-specs": 1,
    }),
  },
  collector: {
    storage: joinInventories(EmptyInventory, {
      "nest-ball": 10,
      "net-ball": 10,
      "quick-ball": 10,
      lure: 5,
    }),
  },
  explorer: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 10,
      repel: 5,
      "super-repel": 1,
      lure: 5,
      "super-lure": 1,
    }),
  },
};

export const TraitSelection = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const proceed = useCallback(
    (trait: CharacterTrait) => {
      patchSaveFileReducer({
        storage: joinInventories(saveFile.storage, loadOuts[trait].storage),
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
    <Page headline="How would you describe yourself:">
      <Stack mode="column" alignItems="stretch" justifyContent="center">
        {traits.map((trait) => {
          const loadOut = loadOuts[trait];
          return (
            <Card
              onClick={() => proceed(trait)}
              icon={undefined}
              content={
                <Stack mode="column" gap={2}>
                  <h3>{trait}:</h3>

                  <div>
                    <strong>{traitBoni[trait]}</strong>
                  </div>

                  <div>
                    <strong>
                      gains more points for:{" "}
                      {researchBoni[trait]
                        .map((bonus) => `${bonus} Quests`)
                        .join(" ,")}
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
    </Page>
  );
};
