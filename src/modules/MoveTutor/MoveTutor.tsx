import { useContext, useMemo, useState } from "react";
import { BstSectionConnected } from "../../components/BstSection/BstSection";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { MoveEditor } from "../../components/MoveEditor/MoveEditor";
import { MovesDisplay } from "../../components/MovesDisplay/MovesDisplay";
import { getPokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { calculateLevelData } from "../../functions/calculateLevelData";
import { getHeldItem } from "../../functions/getHeldItem";
import { getItemUrl } from "../../functions/getItemUrl";
import { GameDataContext } from "../../hooks/useGameData";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { Chip } from "../../uiComponents/Chip/Chip";
import { IconSolarSystem } from "../../uiComponents/IconSolarSystem/IconSolarSystem";
import { Stack } from "../../uiComponents/Stack/Stack";

export const MoveTutor = () => {
  const { saveFile } = useContext(SaveFileContext);
  const team = useMemo(
    () => saveFile.pokemon.filter((p) => p.onTeam),
    [saveFile],
  );
  const gameData = useContext(GameDataContext);
  const { internalDex } = gameData;

  const [id, setId] = useState<string>(team[0].id);

  const pokemonWithId = useMemo(
    () => team.find((t) => t.id === id),
    [id, team],
  );

  const navigate = useNavigate();
  return (
    <InGamePage
      headline="Move Tutor"
      goBack={() => navigate("MOVE_TUTOR", "OVERWORLD")}
    >
      <Stack mode="column">
        {!id && <strong>Which Pokemon should I teach a move to?</strong>}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            padding: "2rem",
            columnGap: "1rem",
            rowGap: "1.5rem",
          }}
        >
          {team.map((t) => {
            const heldItem = getHeldItem(t);
            return (
              <IconSolarSystem
                sun={{
                  url: getPokemonSprite(t.name, { shiny: t.shiny }),
                }}
                firstPlanet={
                  <Chip>
                    <strong>
                      Lvl {calculateLevelData(t.xp, t.growthRate).level}
                    </strong>
                  </Chip>
                }
                secondPlanetUrl={`/typeIcons/${internalDex[t.name].types.at(
                  0,
                )}.png`}
                thirdPlanetUrl={
                  internalDex[t.name].types.at(1)
                    ? `/typeIcons/${internalDex[t.name].types.at(1)}.png`
                    : undefined
                }
                fourthPlanetUrl={getItemUrl(t.ball)}
                fifthPlanetUrl={heldItem ? getItemUrl(heldItem) : undefined}
                key={t.id}
                onClick={() => {
                  setId(t.id);
                }}
              />
            );
          })}
        </div>
        <h2>{pokemonWithId?.name}</h2>
        {pokemonWithId && (
          <>
            <h3>Attack Stats:</h3>
            <BstSectionConnected
              showOnly={["attack", "special-attack"]}
              ownedPokemon={pokemonWithId}
              hideExplanation
              box={false}
            />
          </>
        )}
        {pokemonWithId && (
          <>
            <h3>Current Moves:</h3>
            <MovesDisplay ownedPokemon={pokemonWithId} onlyCurrent />
          </>
        )}
        {pokemonWithId && (
          <>
            <h3>Learn new Moves:</h3>
            <MoveEditor ownedPokemon={pokemonWithId} />
          </>
        )}
      </Stack>
    </InGamePage>
  );
};
