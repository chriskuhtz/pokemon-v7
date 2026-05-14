import { useContext, useMemo } from "react";
import { portraitMode } from "../../constants/baseConstants";
import { typeColors, typeContrastColors } from "../../constants/typeColors";
import {
  getHighestStat,
  HIDDEN_STATS_FOR_TOTAL,
} from "../../functions/getHighestStat";
import { getStats } from "../../functions/getStats";
import { GameDataContext } from "../../hooks/useGameData";
import { useGetPokemonData } from "../../hooks/useGetPokemonData";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { PokemonData } from "../../interfaces/PokemonData";
import { Stat } from "../../interfaces/StatObject";
import { Chip } from "../../uiComponents/Chip/Chip";
import { BstExplanation } from "../BstExplanation/BstExplanation";

export const BstSection = ({
  ownedPokemon,
  data,
  hideExplanation,
  showOnly,
}: {
  ownedPokemon: OwnedPokemon;
  data: PokemonData;
  hideExplanation?: boolean;
  showOnly?: Stat[];
}) => {
  const {
    saveFile: { settings },
  } = useContext(SaveFileContext);

  const { color, backgroundColor } = useMemo(
    () => ({
      backgroundColor: typeColors[data.types[0].type.name],
      color: typeContrastColors[data.types[0].type.name],
    }),
    [data.types],
  );
  return (
    <div
      key={data.id}
      style={{
        padding: ".5rem",
        border: "1px solid black",
        borderRadius: "1rem",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
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
  );
};

export const BstSectionConnected = ({
  ownedPokemon,
  showOnly,
}: {
  ownedPokemon: OwnedPokemon;
  showOnly?: Stat[];
  hideExplanation?: boolean;
}) => {
  const { internalDex } = useContext(GameDataContext);

  const { res: data } = useGetPokemonData(internalDex[ownedPokemon.name].dexId);

  if (!data) {
    return <></>;
  }
  return (
    <div style={{ width: "95%" }}>
      <BstSection
        hideExplanation
        showOnly={showOnly}
        data={data}
        ownedPokemon={ownedPokemon}
      />
    </div>
  );
};
