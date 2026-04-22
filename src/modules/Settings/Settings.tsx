import { useContext, useState } from "react";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { getRandomBall, getRandomItem } from "../../interfaces/Item";
import { SettingsObject } from "../../interfaces/SettingsObject";
import { Page } from "../../uiComponents/Page/Page";
import { ToggleRow } from "../../uiComponents/ToggleRow/ToggleRow";
import { KumaQuestsRecord } from "../../versions/kuma/questsRecord";

export const randomQuestRewards = "randomQuestRewards";

const settingsLabels: Record<keyof SettingsObject, string> = {
  fasterDays: "Should Days take 4 hours instead of 24?",
  doubleXpRates: "Double Xp Rates",
  minimalGrindingMode: "Minimal Grinding Mode",
  hideMovementButtons: "Hide Movement Buttons",
  seekOutEncounters: "Seek Encounters",
  unlimitedPathfindingRange: "Unlimited Pathfinder",
  smarterOpponents: '"Smarter" Opponents:',
  rogueLike: "Roguelike mode:",
  releaseFaintedPokemon: "Defeated Pokemon are released into the wild:",
  noItemsInBattle: "No Healing Items allowed in Battle:",
  noRunningFromBattle: "No Running from wild Pokemon:",
  randomStarters: "Would you like random starter pokemon choices:",
  randomOverworldItems: "Random Overworld Items:",
  randomQuestRewards: "Random Quest Rewards:",
  randomSwarms: "Random Pokemon Swarms:",
  randomHeldItems: "Random Held Items:",
  randomAbilities: "Random Abilities:",
  randomLearnSets: "Random Learnable Moves:",
  randomEncounters: "Random Wild Pokemon:",
  randomEvolution: "Random Evolution:",
  expShareActive: "Exp Share Active", // Assuming a label since not in ToggleRow
  teamSelectionBeforeBattle:
    "Choose your Team or attempt escape before each battle",
};

const settingsDescriptions: Record<keyof SettingsObject, string | undefined> = {
  fasterDays:
    "Does not reduce growing etc. times, just changes time of day more often",
  doubleXpRates: undefined,
  minimalGrindingMode:
    "Effort- and Individual Stats are ignored for you and opponents",
  hideMovementButtons: undefined,
  seekOutEncounters: "Choose the movement path with the most wild pokemon",
  unlimitedPathfindingRange:
    "Walk through the entire map with one click, otherwise limited to ~15 fields",
  smarterOpponents:
    "Double Battle Opponents can reconsider their moves during the turn",
  rogueLike: "Losing a battle completely resets your save file",
  releaseFaintedPokemon:
    "Losing a battle also completely resets your save file",
  noItemsInBattle: undefined,
  noRunningFromBattle: undefined,
  randomStarters: "can make 1 questline impossible",
  randomOverworldItems: undefined,
  randomQuestRewards: undefined,
  randomSwarms: "can be weird: e.g. swarms of mewtwo",
  randomHeldItems: undefined,
  randomAbilities: undefined,
  randomLearnSets: undefined,
  randomEncounters: "makes many quests very unlikely",
  randomEvolution: "could be good, could be bad",
  expShareActive: undefined,
  teamSelectionBeforeBattle: undefined,
};
export const Settings = ({
  atGameStart,
  editableSettings,
}: {
  atGameStart: boolean;
  editableSettings: SettingsObject;
}): JSX.Element => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);

  const [state, setState] = useState<SettingsObject>(saveFile.settings ?? {});

  const proceed = () => {
    if (state.randomQuestRewards) {
      window.localStorage.setItem(
        randomQuestRewards,
        JSON.stringify(
          Object.fromEntries(
            Object.entries(KumaQuestsRecord).map(([name, quest]) => {
              return [
                name,
                {
                  ...quest,
                  rewardItems: {
                    [getRandomItem()]: Math.floor(1 + Math.random() * 9),
                    [getRandomBall()]: Math.floor(1 + Math.random() * 4),
                  },
                },
              ];
            }),
          ),
        ),
      );
    } else window.localStorage.removeItem(randomQuestRewards);

    if (state.fasterDays) {
      window.localStorage.setItem("fasterDays", "true");
    } else window.localStorage.removeItem("fasterDays");
    patchSaveFileReducer({
      settings: state,
      meta: {
        activeTab: atGameStart ? saveFile.meta.activeTab : "MAIN",
      },
    });
  };
  return (
    <Page
      goBack={
        atGameStart
          ? undefined
          : () => {
              proceed();
            }
      }
      headline={
        atGameStart ? "Settings: (many cant be changed later)" : "Settings:"
      }
    >
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "8fr 1fr",
            rowGap: "1rem",
            columnGap: ".5rem",
            alignItems: "center",
          }}
        >
          {Object.keys(settingsLabels).map((s) => {
            const setting = s as keyof SettingsObject;

            return (
              <ToggleRow
                key={setting}
                disabled={!editableSettings[setting]}
                value={!!state[setting]}
                setValue={(x) => setState({ ...state, [setting]: x })}
                label={settingsLabels[setting]}
                description={settingsDescriptions[setting]}
              />
            );
          })}
        </div>
        <br />
        <br />
        <button style={{ width: "100%" }} onClick={() => proceed()}>
          Lets go
        </button>
      </div>
    </Page>
  );
};
