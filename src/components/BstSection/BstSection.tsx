import { useContext, useMemo } from "react";
import { portraitMode } from "../../constants/baseConstants";
import { typeColors, typeContrastColors } from "../../constants/typeColors";
import {
  getHighestStat,
  HIDDEN_STATS_FOR_TOTAL,
} from "../../functions/getHighestStat";
import { getStats } from "../../functions/getStats";
import { getTypeNames } from "../../functions/getTypeNames";
import { GameDataContext } from "../../hooks/useGameData";
import { useGetPokemonData } from "../../hooks/useGetPokemonData";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { PokemonData } from "../../interfaces/PokemonData";
import { PokemonType } from "../../interfaces/PokemonType";
import { Stat } from "../../interfaces/StatObject";
import { Card } from "../../uiComponents/Card/Card";
import { Chip } from "../../uiComponents/Chip/Chip";
import { BstExplanation } from "../BstExplanation/BstExplanation";

export const BstSection = ({
  ownedPokemon,
  data,
  hideExplanation,
  showOnly,
  box = true,
  fixedTypeColor,
  ownedByPlayer,
}: {
  ownedPokemon: OwnedPokemon;
  data: PokemonData;
  hideExplanation?: boolean;
  showOnly?: Stat[];
  box?: boolean;
  fixedTypeColor?: PokemonType;
  ownedByPlayer: boolean;
}) => {
  const {
    saveFile: { settings, trait },
  } = useContext(SaveFileContext);

  const { color, backgroundColor } = useMemo(
    () => ({
      backgroundColor: typeColors[fixedTypeColor ?? data.types[0].type.name],
      color: typeContrastColors[fixedTypeColor ?? data.types[0].type.name],
    }),
    [data.types, fixedTypeColor],
  );

  const content = useMemo(
    () => (
      <div>
        {!hideExplanation && (
          <strong
            style={{
              padding: "1rem .5rem",
            }}
          >
            Total Stats:
          </strong>
        )}
        <div
          style={{
            padding: ".5rem",
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: portraitMode ? "1fr" : "1fr 1fr 1fr",
            alignItems: "center",
          }}
        >
          {Object.entries(
            getStats(
              data.stats,
              ownedPokemon.xp,
              ownedPokemon.growthRate,
              ownedPokemon.nature,
              ownedPokemon.effortValues,
              settings,
              ownedByPlayer ? trait : undefined,
              getTypeNames({ ...ownedPokemon, data }),
            ),
          )
            .sort()
            .filter(([stat]) => {
              if (!showOnly || showOnly.length === 0) {
                return true;
              }
              return showOnly.includes(stat as Stat);
            })
            .map(([stat, value]) => {
              const highestStat = getHighestStat({
                ownedPokemon,
                data,
                settings,
                ownerTrait: ownedByPlayer ? trait : undefined,
                pokemonTypes: getTypeNames({ ...ownedPokemon, data }),
              }).at(1);

              if (!HIDDEN_STATS_FOR_TOTAL.includes(stat)) {
                return (
                  <Chip
                    key={`${data.id}+${stat}`}
                    style={{
                      width: `calc(100% / ${highestStat} * ${value})`,
                      backgroundColor,
                      color,
                    }}
                  >
                    <>
                      {stat}: {value}
                    </>
                  </Chip>
                );
              }
            })}
        </div>
        {!hideExplanation && (
          <BstExplanation ownedPokemon={ownedPokemon} data={data} />
        )}
      </div>
    ),
    [
      backgroundColor,
      color,
      data,
      hideExplanation,
      ownedByPlayer,
      ownedPokemon,
      settings,
      showOnly,
      trait,
    ],
  );

  if (!box) {
    return content;
  }
  return <Card content={content} icon={undefined} actionElements={[]} />;
};

export const BstSectionConnected = ({
  ownedPokemon,
  showOnly,
  box = true,
}: {
  ownedPokemon: OwnedPokemon;
  showOnly?: Stat[];
  hideExplanation?: boolean;
  box?: boolean;
}) => {
  const { internalDex } = useContext(GameDataContext);

  const { res: data } = useGetPokemonData(internalDex[ownedPokemon.name].dexId);

  if (!data) {
    return <></>;
  }
  return (
    <div style={{ width: "95%" }}>
      <BstSection
        fixedTypeColor={"normal"}
        hideExplanation
        showOnly={showOnly}
        data={data}
        ownedPokemon={ownedPokemon}
        box={box}
        ownedByPlayer={true}
      />
    </div>
  );
};
