import { useContext, useMemo } from "react";
import { battleSpriteSize } from "../../constants/baseConstants";
import { percentageBasedColor } from "../../constants/typeColors";
import { getStats } from "../../functions/getStats";
import { isOwnedPokemonKO } from "../../functions/isKo";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { useIsReadyToEvolve } from "../../hooks/useIsReadyToEvolve";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { PokemonSprite } from "../PokemonSprite/PokemonSprite";
import "./TeamOverview.css";

export const TeamOverview = ({ steps }: { steps: number }) => {
  const {
    saveFile: { pokemon },
  } = useContext(SaveFileContext);
  const navigate = useNavigate();
  const team = useMemo(() => pokemon.filter((p) => p.onTeam), [pokemon]);

  return (
    <>
      {team.map((t) => (
        <TeamMemberInOverview
          pokemon={t}
          key={t.id}
          onClick={() => navigate("OVERWORLD", "TEAM", steps)}
        />
      ))}
    </>
  );
};

const TeamMemberInOverview = ({
  pokemon,
  onClick,
}: {
  pokemon: OwnedPokemon;
  onClick: () => void;
}) => {
  const { res: battlePokemon } = useGetBattleTeam([pokemon], {});
  const { saveFile } = useContext(SaveFileContext);

  const readyToEvolve = useIsReadyToEvolve(pokemon, battlePokemon?.at(0)?.data);
  if (!battlePokemon?.at(0)) {
    return <></>;
  }

  const max = getStats(
    battlePokemon.at(0)?.data.stats ?? [],
    pokemon.xp,
    pokemon.growthRate,
    pokemon.nature,
    pokemon.effortValues,
    saveFile.settings,
  ).hp;

  const damage = pokemon.damage;

  const percentage = 1 - damage / max;

  const color = percentageBasedColor(percentage).color;

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          borderRadius: 9000,
          width: battleSpriteSize,
          maxHeight: battleSpriteSize,
          height: battleSpriteSize,
          minHeight: battleSpriteSize,
        }}
      >
        <PokemonSprite
          className={readyToEvolve ? "readyToEvolve" : undefined}
          onClick={onClick}
          name={pokemon.name}
          config={{
            shiny: pokemon.shiny,
            grayscale: isOwnedPokemonKO(pokemon),
          }}
        />
      </div>
      <div
        style={{
          zIndex: -1,
          borderBottomRightRadius: 9000,
          borderBottomLeftRadius: 9000,
          borderTopLeftRadius: percentage > 0.8 ? 9000 : 0,
          borderTopRightRadius: percentage > 0.8 ? 9000 : 0,
          bottom: 0,
          backgroundColor: color,
          position: "absolute",
          width: battleSpriteSize,
          maxHeight: percentage * battleSpriteSize,
          height: percentage * battleSpriteSize,
          minHeight: percentage * battleSpriteSize,
        }}
      ></div>
    </div>
  );
};
