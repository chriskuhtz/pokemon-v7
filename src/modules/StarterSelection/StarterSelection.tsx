import { useCallback, useContext, useMemo, useState } from "react";
import { v4 } from "uuid";
import { PokemonChoices } from "../../components/PokemonChoices/PokemonChoices";
import { SpeciesInfo } from "../../components/SpeciesInfo/SpeciesInfo";
import { Sprite } from "../../components/Sprite/Sprite";
import {
  CampUpgrade,
  campUpgradeNames,
} from "../../constants/gameData/campUpgrades";
import { shinyChance, testPokemon } from "../../constants/gameData/gameData";
import { PokemonName } from "../../constants/pokemonNames";
import { addPokemonToDex } from "../../functions/addPokemonToDex";
import { getRandomPokemonName } from "../../functions/getRandomPokemonId";
import { reduceBattlePokemonToOwnedPokemon } from "../../functions/reduceBattlePokemonToOwnedPokemon";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { badgeNames } from "../../interfaces/Badge";
import { BattlePokemon } from "../../interfaces/BattlePokemon";
import { CompleteInventory } from "../../interfaces/Inventory";
import { getRandomNature } from "../../interfaces/Natures";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import {
  EmptyStatObject,
  generateRandomStatObject,
} from "../../interfaces/StatObject";
import { LoadingScreen } from "../../uiComponents/LoadingScreen/LoadingScreen";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";
const defaultStarters: PokemonName[] = ["bulbasaur", "charmander", "squirtle"];
export const StarterSelection = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const options = useMemo(
    () =>
      saveFile.settings?.randomStarters
        ? [
            getRandomPokemonName(),
            getRandomPokemonName(),
            getRandomPokemonName(),
          ]
        : defaultStarters,
    [saveFile],
  );

  const { res: fullStarters } = useGetBattleTeam(
    options.map((o) => ({
      ...testPokemon,
      name: o,
      id: v4(),
      effortValues: EmptyStatObject,
      starter: true,
      shiny: Math.random() / 10 < shinyChance,
      nature: getRandomNature(),
      intrinsicValues: generateRandomStatObject(31),
    })),
    {
      assignLearnsetMoves: true,
      assignGender: true,
    },
  );
  const [chosenStarter, setChosenStarter] = useState<
    BattlePokemon | undefined
  >();
  const [name, setName] = useState<string | undefined>("");
  const [finished, setFinished] = useState<boolean>(false);

  const proceed = useCallback(() => {
    if (!name || !chosenStarter) {
      return;
    }
    const mon = reduceBattlePokemonToOwnedPokemon({
      ...chosenStarter,
      ownerId: name,
    });

    const pokedex = addPokemonToDex(saveFile.pokedex, mon.name, "camp", true);

    const devmode = !!window.localStorage.getItem("devmode");

    if (devmode) {
      patchSaveFileReducer({
        ...saveFile,
        playerId: name,
        pokemon: [
          {
            ...mon,
            xp: 1250000,
          },
        ],
        badges: [...badgeNames],
        storage: CompleteInventory,
        campUpgrades: Object.fromEntries(
          campUpgradeNames.map((key) => [key, true]),
        ) as Record<CampUpgrade, boolean>,
        meta: { activeTab: "OVERWORLD" },
        researchPoints: 20000,
        pokedex,
      });
    } else
      patchSaveFileReducer({
        ...saveFile,
        playerId: name,
        pokemon: [mon],
        meta: { activeTab: "OVERWORLD" },
        pokedex,
      });
  }, [chosenStarter, name, patchSaveFileReducer, saveFile]);

  if (!fullStarters) {
    return <LoadingScreen />;
  }

  if (finished && name && chosenStarter) {
    return <OakIntroduction name={name} proceed={proceed} />;
  }

  return (
    <Page headline="Intro:">
      <Stack mode="column" alignItems="center">
        {" "}
        <Stack mode="row" justifyContent="center">
          <h3>What is your name:</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />
        </Stack>
        <h3 style={{ margin: 0 }}>
          Which of these Pokemon did you bring with you:
        </h3>
        <PokemonChoices
          pokemon={fullStarters}
          choose={setChosenStarter}
          chosen={chosenStarter}
        />
        {chosenStarter && (
          <SpeciesInfo key={chosenStarter.name} name={chosenStarter.name} />
        )}
        <button
          disabled={!name || !chosenStarter}
          onClick={() => setFinished(true)}
        >
          Proceed
        </button>
      </Stack>
    </Page>
  );
};

const OakIntroduction = ({
  name,
  proceed,
}: {
  name: string;
  proceed: () => void;
}) => {
  return (
    <Page headline="">
      <Stack mode="column" alignItems="center">
        <BaseSizeProvider allowedBaseSizes={[64]}>
          <Sprite canvasKey={"oak"} id={SpriteEnum["oak"]} rotating={false} />
        </BaseSizeProvider>
        <h3>I see, so you are {name}.</h3>
        <h3>Thank you for accepting the position as my research assistant.</h3>
        <h3>My Name is Samuel Oak.</h3>
        <h3>I have devoted my life to studying pokemon in the Kanto Region.</h3>
        <h3>But now, it is time for a new Adventure.</h3>
        <h3>
          We are establishing a research outpost in the uninhabited Kuma Region.
        </h3>
        <h3>Our Goal is to learn everything about the pokemon here.</h3>
        <h3>We will start out with very limited resources.</h3>
        <h3>But if we achieve research breakthroughs...</h3>
        <h3>we will attract more attention and expand our research camp.</h3>
        <h3>Safe travels, I will meet you there.</h3>
        <button onClick={() => proceed()}>Continue</button>
      </Stack>
    </Page>
  );
};
