import { useContext, useMemo } from "react";
import { battleSpriteSize } from "../../../constants/baseConstants";
import { calculateLevelData } from "../../../functions/calculateLevelData";
import { getStats } from "../../../functions/getStats";
import { getTypeNames } from "../../../functions/getTypeNames";
import { replaceRouteName } from "../../../functions/replaceRouteName";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { PokemonData } from "../../../interfaces/PokemonData";
import { Card } from "../../../uiComponents/Card/Card";
import { Stack } from "../../../uiComponents/Stack/Stack";
import { AbilityInfoButton } from "../../AbilityInfoButton/AbilityInfoButton";
import { HappinessIcon } from "../../HappinessIcon/HappinessIcon";
import { HpBar } from "../../HpBar/HpBar";
import { ItemSprite } from "../../ItemSprite/ItemSprite";
import { PrimaryAilmentIcon } from "../../PrimaryAilmentIcon/PrimaryAilmentIcon";
import { ReleaseButton } from "../../ReleaseButton/ReleaseButton";
import { XpBar } from "../../XpBar/XpBar";

export const DetailsCard = ({
  ownedPokemon,
  data,
  setNickName,
  detailed = true,
}: {
  ownedPokemon: OwnedPokemon;
  data: PokemonData;
  detailed?: boolean;
  setNickName?: (x: string | undefined) => void;
}) => {
  const { saveFile } = useContext(SaveFileContext);
  const typeNames = getTypeNames({ ...ownedPokemon, data });
  const { level } = calculateLevelData(
    ownedPokemon.xp,
    ownedPokemon.growthRate,
  );

  const primaryInfo = useMemo(
    () => (
      <Stack mode="column">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
            paddingRight: 16,
            paddingBottom: 16,
          }}
        >
          <HappinessIcon value={ownedPokemon.happiness} />
        </div>
        <HpBar
          max={
            getStats(
              data.stats,
              ownedPokemon.xp,
              ownedPokemon.growthRate,
              ownedPokemon.nature,
              ownedPokemon.effortValues,
              saveFile.settings,
              saveFile.trait,
              getTypeNames({ ...ownedPokemon, data }),
            ).hp
          }
          damage={ownedPokemon.damage}
        />
        <XpBar xp={ownedPokemon.xp} growthRate={ownedPokemon.growthRate} />
        <h4>
          Lvl {level} {data.name}{" "}
          <PrimaryAilmentIcon primaryAilment={ownedPokemon.primaryAilment} />
        </h4>
      </Stack>
    ),
    [data, level, ownedPokemon, saveFile.settings, saveFile.trait],
  );
  return (
    <Stack mode="column">
      <Card content={primaryInfo} icon={undefined} actionElements={[]} />
      {detailed && (
        <>
          {setNickName && (
            <input
              placeholder="Nickname"
              value={ownedPokemon.nickname}
              onChange={(e) => setNickName(e.target.value)}
            />
          )}
          <h4 style={{ display: "flex", alignItems: "center" }}>
            ability: {ownedPokemon.ability}{" "}
            <AbilityInfoButton small abilityName={ownedPokemon.ability} />
          </h4>
          <h4 style={{ display: "flex", gap: ".25rem", alignItems: "center" }}>
            type:
            <>
              <img
                height={battleSpriteSize / 1.5}
                src={`/typeIcons/${typeNames.at(0)}.png`}
              />
              ({typeNames.at(0)})
            </>
            {typeNames.at(1) && (
              <>
                <div>/</div>
                <>
                  <img
                    height={battleSpriteSize / 1.5}
                    src={`/typeIcons/${typeNames.at(1)}.png`}
                  />
                  ({typeNames.at(1)})
                </>
              </>
            )}
          </h4>

          {ownedPokemon.weightModifier && (
            <h4>rel. Weight: {ownedPokemon.weightModifier.toFixed(2)}</h4>
          )}
          {ownedPokemon.heightModifier && (
            <h4>rel. Height: {ownedPokemon.heightModifier.toFixed(2)}</h4>
          )}
          <h4>Gender: {ownedPokemon.gender}</h4>
          <h4>Caught at: {replaceRouteName(ownedPokemon.caughtOnMap)}</h4>
          {ownedPokemon.heldItemName && (
            <h4
              style={{ display: "flex", gap: ".25rem", alignItems: "center" }}
            >
              Held Item: <ItemSprite item={ownedPokemon.heldItemName} />
            </h4>
          )}
          <h4 style={{ display: "flex", gap: ".25rem", alignItems: "center" }}>
            Pokeball: <ItemSprite item={ownedPokemon.ball} />
          </h4>
          <h4>{ownedPokemon.starter ? "Your first Pokemon" : ""}</h4>
          <ReleaseButton ownedPokemon={ownedPokemon} />
        </>
      )}
    </Stack>
  );
};
