import { useCallback, useContext, useMemo, useState } from "react";
import { v4 } from "uuid";
import { PokemonChoices } from "../../components/PokemonChoices/PokemonChoices";
import { SpeciesInfo } from "../../components/SpeciesInfo/SpeciesInfo";
import { shinyChance } from "../../constants/baseConstants";
import {
  CampUpgrade,
  campUpgradeNames,
} from "../../constants/gameData/campUpgrades";
import { testPokemon } from "../../constants/gameData/gameData";
import { PokemonName } from "../../constants/pokemonNames";
import { addPokemonToDex } from "../../functions/addPokemonToDex";
import { getRandomPokemonName } from "../../functions/getRandomPokemonId";
import { reduceBattlePokemonToOwnedPokemon } from "../../functions/reduceBattlePokemonToOwnedPokemon";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { badgeNames } from "../../interfaces/Badge";
import { BattlePokemon } from "../../interfaces/BattlePokemon";
import { CompleteInventory } from "../../interfaces/Inventory";
import { getRandomNature } from "../../interfaces/Natures";
import { StartingRegion } from "../../interfaces/SaveFile";
import {
  EmptyStatObject,
  generateRandomStatObject,
} from "../../interfaces/StatObject";
import { LoadingScreen } from "../../uiComponents/LoadingScreen/LoadingScreen";
import { Page } from "../../uiComponents/Page/Page";
const defaultStarters: Record<StartingRegion, PokemonName[]> = {
  kanto: ["bulbasaur", "charmander", "squirtle"],
  johto: ["chikorita", "cyndaquil", "totodile"],
  hoenn: ["treecko", "torchic", "mudkip"],
  sinnoh: ["turtwig", "chimchar", "piplup"],
  unova: ["snivy", "tepig", "oshawott"],
  kalos: ["chespin", "fennekin", "froakie"],
  alola: ["rowlet", "litten", "popplio"],
  galar: ["grookey", "scorbunny", "sobble"],
  paldea: ["sprigatito", "fuecoco", "quaxly"],
};

export const StarterSelection = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const options = useMemo(() => {
    if (saveFile.settings?.randomStarters) {
      return [
        getRandomPokemonName(),
        getRandomPokemonName(),
        getRandomPokemonName(),
      ];
    }

    return defaultStarters[saveFile.startingRegion ?? "kanto"];
  }, [saveFile]);

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

  const proceed = useCallback(() => {
    if (!chosenStarter) {
      return;
    }
    const mon = reduceBattlePokemonToOwnedPokemon({
      ...chosenStarter,
      ownerId: saveFile.playerId,
    });

    const pokedex = addPokemonToDex(saveFile.pokedex, mon.name, "camp", true);

    const devmode = !!window.localStorage.getItem("devmode");

    if (devmode) {
      patchSaveFileReducer({
        ...saveFile,
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
        meta: { activeTab: "OAK_INTRO" },
        researchPoints: 20000,
        pokedex,
      });
    } else
      patchSaveFileReducer({
        ...saveFile,
        pokemon: [mon],
        meta: { activeTab: "OAK_INTRO" },
        pokedex,
      });
  }, [chosenStarter, patchSaveFileReducer, saveFile]);

  if (!fullStarters) {
    return <LoadingScreen />;
  }

  return (
    <Page headline="Which of these Pokemon did you bring with you:">
      <div
        style={{
          height: "90dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <PokemonChoices
            pokemon={fullStarters}
            choose={setChosenStarter}
            chosen={chosenStarter}
          />
          {chosenStarter && (
            <SpeciesInfo key={chosenStarter.name} name={chosenStarter.name} />
          )}
        </div>
        <button disabled={!chosenStarter} onClick={proceed}>
          Proceed
        </button>
      </div>
    </Page>
  );
};
