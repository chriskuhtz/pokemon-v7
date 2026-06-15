import { useCallback, useContext } from "react";
import { PiEgg, PiEggCrackLight } from "react-icons/pi";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { AbilityName, abilityNames } from "../../constants/abilityCheckList";
import { battleSpriteSize, shinyChance } from "../../constants/baseConstants";
import { handledMoves, MoveName } from "../../constants/movesCheckList";
import { typeColors } from "../../constants/typeColors";
import { ArrayHelpers } from "../../functions/ArrayHelpers";
import { determineGender } from "../../functions/determineGender";
import { getTeamSize } from "../../functions/getTeamSize";
import { deAlternate } from "../../functions/handleAlternateForms";
import { GameDataContext } from "../../hooks/useGameData";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { getRandomNature } from "../../interfaces/Natures";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { PokemonData } from "../../interfaces/PokemonData";
import { PokemonSpeciesData } from "../../interfaces/PokemonSpeciesData";
import { PokemonEgg } from "../../interfaces/SaveFile";
import {
  EmptyStatObject,
  generateRandomStatObject,
} from "../../interfaces/StatObject";
import { AnimatedBar } from "../../uiComponents/AnimatedBar/AnimatedBar";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

export const Eggs = (): JSX.Element => {
  const navigate = useNavigate();
  const { addMultipleMessages } = useContext(MessageQueueContext);
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const gameData = useContext(GameDataContext);
  const hatchEgg = useCallback(
    async (egg: PokemonEgg) => {
      const data: Promise<PokemonData> = (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${egg.pokemon}`)
      ).json();

      const fetchedData = await data;

      const speciesData: Promise<PokemonSpeciesData> = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${deAlternate(egg.pokemon)}`,
      )
        .then((res) => {
          return res.json();
        })
        .catch(() => {
          return {
            capture_rate: 100,
            base_happiness: 70,
            growth_rate: { name: "medium" },
          };
        });

      const spd = await speciesData;

      const eggMoves: MoveName[] = fetchedData.moves
        .filter(
          (m) =>
            handledMoves.includes(m.move.name as MoveName) &&
            m.version_group_details.at(0)?.move_learn_method.name === "egg",
        )
        .map((move) => move.move.name as MoveName);

      const possibleAbilities = [
        ...fetchedData.abilities
          .map((a) => a.ability.name)
          .filter((name) => abilityNames.includes(name as AbilityName)),
      ] as AbilityName[];

      const onTeam =
        saveFile.pokemon.filter((p) => p.onTeam).length <
        getTeamSize(saveFile, gameData);

      const pokemon: OwnedPokemon = {
        gender: determineGender(spd.gender_rate),
        name: egg.pokemon,
        id: egg.id,
        damage: 0,
        ownerId: saveFile.playerId,
        xp: 125,
        ball: "poke-ball",
        shiny: Math.random() / 10 < shinyChance,
        nature: getRandomNature(),
        intrinsicValues: generateRandomStatObject(31),
        stepsWalked: egg.steps,
        happiness: 100,
        maxHp: 30,
        caughtOnMap: "camp",
        caughtAtDate: Date.now(),
        growthRate: "medium",
        ability: ArrayHelpers.getRandomEntry(possibleAbilities),
        ppBoostedMoves: [],
        effortValues: EmptyStatObject,
        firstMove: { name: eggMoves.at(0) ?? "tackle", usedPP: 0 },
        unlockedMoves: eggMoves,
        onTeam,
      };
      patchSaveFileReducer({
        pokemon: [...saveFile.pokemon, pokemon],
        eggs: (saveFile.eggs ?? []).filter((e) => e.id !== egg.id),
        mileStones: {
          ...saveFile.mileStones,
          hatchedEggTypes: [
            ...(saveFile.mileStones.hatchedEggTypes ?? []),
            egg.type,
          ],
        },
      });
      addMultipleMessages([
        {
          icon: (
            <PokemonSprite
              name={pokemon.name}
              config={{ shiny: pokemon.shiny }}
            />
          ),
          message: `A ${pokemon.name} hatched from the egg`,
        },
        {
          icon: (
            <PokemonSprite
              name={pokemon.name}
              config={{ shiny: pokemon.shiny }}
            />
          ),
          message: `${pokemon.name} ${onTeam ? "is added to the team" : "is sent to the Pokemon Storage"}`,
        },
      ]);
    },
    [addMultipleMessages, gameData, patchSaveFileReducer, saveFile],
  );
  return (
    <InGamePage
      headline="Your Pokemon Eggs"
      goBack={() => navigate("EGGS", "OVERWORLD")}
    >
      <Stack mode="column">
        <Card
          icon={
            <img height={battleSpriteSize / 1.5} src={`/typeIcons/fire.png`} />
          }
          content={
            <div>
              <h3 style={{ marginBottom: 0 }}>
                Pokemon with these abilities help eggs hatch faster:
              </h3>
              <p>
                <strong>flame-body</strong>
              </p>
              <p>
                <strong>magma-armor</strong>
              </p>
              <p>
                <strong>steam-engine</strong>
              </p>
            </div>
          }
          actionElements={[]}
        />
        {!saveFile.eggs && <h3>Pokemon Eggs can be found in the wild</h3>}
        {(saveFile.eggs ?? []).map((egg) => {
          const readyToHatch = isReadyToHatch(egg);
          return (
            <Card
              key={egg.id}
              icon={<img src={`/eggs/${egg.type}-egg.png`} />}
              content={
                <div>
                  <h3>A {egg.type} Type Egg</h3>
                  <AnimatedBar
                    hideText
                    color={typeColors[egg.type]}
                    max={egg.requiredSteps}
                    offset={egg.requiredSteps - egg.steps}
                  />
                </div>
              }
              actionElements={
                readyToHatch
                  ? [<button onClick={() => void hatchEgg(egg)}>hatch</button>]
                  : []
              }
            />
          );
        })}
      </Stack>
    </InGamePage>
  );
};

export const HudEggIcon = ({ stepsTaken }: { stepsTaken: number }) => {
  const { saveFile } = useContext(SaveFileContext);
  const navigate = useNavigate();
  const anyReadyToHatch = saveFile.eggs?.some(isReadyToHatch);

  if (!saveFile.eggs) {
    return <></>;
  }
  if (anyReadyToHatch) {
    return (
      <PiEggCrackLight
        className={"bouncing"}
        onClick={() => navigate("OVERWORLD", "EGGS", stepsTaken)}
        size={battleSpriteSize}
      />
    );
  }
  return (
    <PiEgg
      onClick={() => navigate("OVERWORLD", "EGGS", stepsTaken)}
      size={battleSpriteSize}
    />
  );
};
const isReadyToHatch = (egg: PokemonEgg) => {
  return egg.steps >= egg.requiredSteps;
};
