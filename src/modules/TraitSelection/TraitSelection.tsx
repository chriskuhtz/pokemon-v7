import { useCallback, useContext, useState } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import { ItemType } from "../../interfaces/Item";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { battleSpriteSize, portraitMode } from "../../constants/baseConstants";
import { ArrayHelpers } from "../../functions/ArrayHelpers";
import {
  CharacterTrait,
  traitBonusExplanations,
  traitColors,
  traitLoadOuts,
  traitResearchBoni,
  traits,
  traitStarter,
  traitTypes,
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
  const [traitIndex, setTraitIndex] = useState<number>(0);
  return (
    <InGamePage headline="How would you describe yourself:">
      <TraitCard
        setTraitIndex={setTraitIndex}
        proceed={proceed}
        trait={ArrayHelpers.getEntryWithOverflow([...traits], traitIndex)}
      />
    </InGamePage>
  );
};

const TraitCard = ({
  trait,
  proceed,
  setTraitIndex,
}: {
  trait: CharacterTrait;
  proceed: (trait: CharacterTrait) => void;
  setTraitIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Card
      backgroundColor={traitColors[trait]}
      key={trait}
      icon={
        <img
          height={portraitMode ? battleSpriteSize * 2 : battleSpriteSize * 3}
          src={`/typeIcons/${traitTypes[trait]}.png`}
        />
      }
      content={
        <Stack mode="column" alignItems="center">
          <div style={{ width: "100%" }}>
            <Stack mode="row" justifyContent="space-between">
              <FaArrowLeft
                size={battleSpriteSize}
                onClick={() => setTraitIndex((t) => t - 1)}
              />
              <h3>{trait}:</h3>
              <FaArrowRight
                size={battleSpriteSize}
                onClick={() => setTraitIndex((t) => t + 1)}
              />
            </Stack>
          </div>
          <strong>Special Starting Pokemon Option:</strong>

          <PokemonSprite
            sizeFactor={2}
            name={traitStarter[trait]}
            config={{ officalArtwork: true }}
          />
          <strong>
            gains more points for:{" "}
            {Object.keys(traitResearchBoni[trait])
              .map((bonus) => `${bonus} Quests`)
              .join(", ")}
          </strong>

          <strong>Starting Supplies:</strong>
          <Stack mode="row" alignItems="center" flexWrap="wrap">
            {Object.entries(traitLoadOuts[trait].storage)
              .filter(([, amount]) => amount > 0)
              .map(([item, amount]) => (
                <Stack mode="row" alignItems="center" key={item}>
                  {amount} x <ItemSprite item={item as ItemType} />
                </Stack>
              ))}
          </Stack>
          {traitBonusExplanations[trait].map((t) => (
            <div key={t}>
              <strong>{t}</strong>
            </div>
          ))}
        </Stack>
      }
      actionElements={[
        <button onClick={() => proceed(trait)}>I am a {trait}</button>,
      ]}
    />
  );
};
