import { BsBackpack4, BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdCatchingPokemon } from "react-icons/md";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

import { useContext, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { IoMdExit, IoMdSettings } from "react-icons/io";
import { BugReportButton } from "../../components/BugReport/BugReport";
import { IdeaButton } from "../../components/IdeaReport/IdeaReport";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";

import React from "react";
import { RiBookShelfLine } from "react-icons/ri";
import { ExportSnapshotCard } from "../../components/SnapshotCard/ExportSnapshotCard";
import { ImportSnapshotCard } from "../../components/SnapshotCard/ImportSnapshotCard";
import { ResetSnapshotCard } from "../../components/SnapshotCard/ResetSnapshotCard";
import { TrainerCard } from "../../components/TrainerCard/TrainerCard";
import { battleSpriteSize, portraitMode } from "../../constants/baseConstants";
import { customItemDescriptions } from "../../constants/customItemDescriptions";
import { mapsRecord } from "../../constants/gameData/maps/mapsRecord";
import { fullyHealPokemon } from "../../functions/fullyHealPokemon";
import {
  cleanUpSpecificEvent,
  getCurrentLure,
  getCurrentRepel,
  startLure,
  startRepel,
  stopLure,
  stopRepel,
} from "../../functions/TimedEvent";
import { LocationContext } from "../../hooks/LocationProvider";
import { GameDataContext } from "../../hooks/useGameData";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { useQuests } from "../../hooks/useQuests";
import { useReset } from "../../hooks/useReset";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { useTeleport } from "../../hooks/useTeleport";
import { EmptyInventory } from "../../interfaces/Inventory";
import { lures, repels } from "../../interfaces/Item";
import { HudEggIcon } from "../Eggs/Eggs";
export const MainMenu = ({ goBack }: { goBack: () => void }): JSX.Element => {
  return (
    <InGamePage headline="Main Menu:" goBack={goBack}>
      <Stack mode="column">
        <TrainerCard />
        <TeleportButton />
        <FlyingButton />
        <LeaveChallengeFieldButton />
        <RepelButton />
        <LureButton />
        <ExpShareButton />
        <BagCard />
        <TeamCard />
        <EggCard />
        <QuestCard />
        <NotesCard />
        <DexCard />
        <WikiCard />
        <SettingsCard />
        <SnapshotCards />
        <ResetButton />
        <BugReportButton />
        <IdeaButton />
        {window.localStorage.getItem("devmode") && <TimedEventLog />}
      </Stack>
    </InGamePage>
  );
};

const ResetButton = () => {
  const reset = useReset();
  const [resetConfirmationInProgress, setRCIP] = useState<boolean>(false);
  const { addMessage } = useContext(MessageQueueContext);

  if (resetConfirmationInProgress) {
    return (
      <button
        onClick={() =>
          addMessage({
            message: "Resetting Your Save File",
            onRemoval: () => reset(),
            needsNoConfirmation: true,
          })
        }
        style={{ backgroundColor: "darkred", color: "white" }}
      >
        <h3>Are you sure? Click again to confirm</h3>
      </button>
    );
  }

  return (
    <button
      onClick={() => setRCIP(true)}
      style={{ backgroundColor: "darkred", color: "white" }}
    >
      Delete Savefile and reset
    </button>
  );
};

const SnapshotCards = () => {
  const gameData = useContext(GameDataContext);

  if (!gameData.features.snapShotExportAvailable) {
    return <></>;
  }

  return (
    <>
      <ExportSnapshotCard />
      <ImportSnapshotCard />
      <ResetSnapshotCard />
    </>
  );
};

const SettingsCard = () => {
  const gameData = useContext(GameDataContext);
  const navigate = useNavigate();

  if (Object.keys(gameData.features.settingsEditableDuringGame).length === 0) {
    return <></>;
  }
  return (
    <Card
      onClick={() => navigate("MAIN", "SETTINGS_IN_GAME")}
      content={<h4>SETTINGS</h4>}
      icon={<IoMdSettings size={battleSpriteSize} />}
      actionElements={[]}
    />
  );
};

const WikiCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("MAIN", "WIKI")}
      content={<h4>Wiki</h4>}
      icon={<FaSearch size={battleSpriteSize} />}
      actionElements={[]}
    />
  );
};
const EggCard = () => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("MAIN", "EGGS")}
      content={<h4>Eggs</h4>}
      icon={<HudEggIcon stepsTaken={0} />}
      actionElements={[]}
    />
  );
};

const DexCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("MAIN", "INTERNAL_DEX")}
      content={<h4>Pokedex</h4>}
      icon={<RiBookShelfLine size={battleSpriteSize} />}
      actionElements={[]}
    />
  );
};

const NotesCard = () => {
  const { saveFile } = useContext(SaveFileContext);
  const navigate = useNavigate();
  if (saveFile.trainerNotes?.at(0)) {
    return <></>;
  }
  return (
    <Card
      onClick={() => navigate("MAIN", "TRAINER_NOTES")}
      content={<h4>Notes</h4>}
      icon={
        <div style={{ display: "flex", gap: ".5rem" }}>
          <BsFillJournalBookmarkFill size={battleSpriteSize} />
        </div>
      }
      actionElements={[]}
    />
  );
};

const QuestCard = () => {
  const { map } = useContext(LocationContext);
  const { numberOfUncollected } = useQuests();
  const navigate = useNavigate();

  if (!map.questMenuAvailable) {
    return <></>;
  }

  return (
    <Card
      onClick={() => navigate("MAIN", "QUESTS")}
      content={<h4>Quests</h4>}
      icon={<GoTasklist size={battleSpriteSize} />}
      actionElements={
        numberOfUncollected > 0
          ? [<strong>Uncollected: {numberOfUncollected}</strong>]
          : []
      }
    />
  );
};
const TeamCard = () => {
  const { saveFile } = useContext(SaveFileContext);
  const team = useMemo(
    () => saveFile.pokemon.filter((p) => p.onTeam),
    [saveFile.pokemon],
  );
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("MAIN", "TEAM")}
      content={<h4>Team</h4>}
      icon={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "grid",
              gap: ".5rem",
              gridTemplateColumns: portraitMode
                ? Array.from({ length: team.length ?? 0 })
                    .map(() => "1fr")
                    .join(" ")
                : "1fr 1fr 1fr",
            }}
          >
            {team.map((t) => (
              <MdCatchingPokemon key={t.id} size={battleSpriteSize} />
            ))}
          </div>
        </div>
      }
      actionElements={[]}
    />
  );
};

const BagCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("MAIN", "BAG")}
      content={<h4>Bag</h4>}
      icon={<BsBackpack4 size={battleSpriteSize} />}
      actionElements={[]}
    />
  );
};

const TeleportButton = () => {
  const { teleporter, teleportHome } = useTeleport();

  if (!teleporter) {
    return <></>;
  }
  return (
    <Card
      onClick={() => teleportHome()}
      content={<h4>Teleport back to camp</h4>}
      icon={
        <PokemonSprite
          name={teleporter.name}
          config={{ officalArtwork: true, shiny: teleporter.shiny }}
        />
      }
      actionElements={[]}
    />
  );
};
const ExpShareButton = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  if (saveFile.bag["exp-share"] <= 0 && saveFile.storage["exp-share"] <= 0) {
    return <></>;
  }
  return (
    <Card
      icon={<ItemSprite item={"exp-share"} />}
      onClick={() => {
        patchSaveFileReducer({
          settings: {
            ...saveFile.settings,
            expShareActive: !saveFile.settings?.expShareActive,
          },
        });
      }}
      content={
        <h3>
          {saveFile.settings?.expShareActive
            ? "Every Pokemon on team gets Xp"
            : "Only pokemon that battled get Xp"}
        </h3>
      }
      actionElements={[
        <strong>
          {saveFile.settings?.expShareActive
            ? "Xp Share is ON"
            : "Xp Share is Off"}
        </strong>,
      ]}
    />
  );
};
const RepelButton = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const currentRepel = getCurrentRepel(saveFile);
  if (currentRepel) {
    return (
      <Card
        icon={<ItemSprite item={currentRepel.repelType} />}
        content={
          <h3>
            {currentRepel.type} active until{" "}
            {new Date(currentRepel.removeAt).toLocaleTimeString()}
          </h3>
        }
        actionElements={[
          <button onClick={() => patchSaveFileReducer(stopRepel(saveFile))}>
            Stop current Repel
          </button>,
        ]}
      />
    );
  }
  return (
    <>
      {repels.map((thisrepel) =>
        saveFile.bag[thisrepel] > 0 ? (
          <Card
            key={thisrepel}
            icon={<ItemSprite item={thisrepel} />}
            onClick={() => {
              patchSaveFileReducer(startRepel(saveFile, thisrepel));
            }}
            content={<h3>{customItemDescriptions[thisrepel]}</h3>}
            actionElements={[]}
          />
        ) : (
          <React.Fragment key={thisrepel}></React.Fragment>
        ),
      )}
    </>
  );
};
const LureButton = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const currentLure = getCurrentLure(saveFile);

  if (currentLure) {
    return (
      <Card
        icon={<ItemSprite item={currentLure.lureType} />}
        content={
          <h3>
            {currentLure.type} active until{" "}
            {new Date(currentLure.removeAt).toLocaleTimeString()}
          </h3>
        }
        actionElements={[
          <button onClick={() => patchSaveFileReducer(stopLure(saveFile))}>
            Stop Lure
          </button>,
        ]}
      />
    );
  }
  return (
    <>
      {lures.map((thisLure) =>
        saveFile.bag[thisLure] > 0 ? (
          <Card
            key={thisLure}
            icon={<ItemSprite item={thisLure} />}
            onClick={() => {
              patchSaveFileReducer(startLure(saveFile, thisLure));
            }}
            content={<h3>{customItemDescriptions[thisLure]}</h3>}
            actionElements={[]}
          />
        ) : (
          <React.Fragment key={thisLure}></React.Fragment>
        ),
      )}
    </>
  );
};
const FlyingButton = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { map } = useContext(LocationContext);

  if (!saveFile.campUpgrades["pidgeot rider certification"]) {
    return <></>;
  }

  const devmode = !!window.localStorage.getItem("devmode");
  if (map.area !== "OPEN" && !devmode) {
    return (
      <Card
        disabled
        content={<h4>Can only fly in the open</h4>}
        icon={
          <PokemonSprite name={"pidgeot"} config={{ officalArtwork: true }} />
        }
        actionElements={[]}
      />
    );
  }
  return (
    <>
      {saveFile.flying ? (
        <Card
          onClick={() => patchSaveFileReducer({ flying: false })}
          content={<h4>Stop flying</h4>}
          icon={
            <PokemonSprite name={"pidgeot"} config={{ officalArtwork: true }} />
          }
          actionElements={[]}
        />
      ) : (
        <Card
          onClick={() => patchSaveFileReducer({ flying: true })}
          content={<h4>Fly on Pidgeot</h4>}
          icon={
            <PokemonSprite name={"pidgeot"} config={{ officalArtwork: true }} />
          }
          actionElements={[]}
        />
      )}
    </>
  );
};
const LeaveChallengeFieldButton = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { location, setLocation } = useContext(LocationContext);
  const { startingLocation } = useContext(GameDataContext);
  if (
    location.mapId == mapsRecord.challengeField.id ||
    location.mapId == mapsRecord.randomField.id
  ) {
    return (
      <Card
        onClick={() => {
          setLocation(startingLocation);
          patchSaveFileReducer({
            bag: EmptyInventory,
            meta: { ...saveFile.meta, activeTab: "OVERWORLD" },

            pokemon: saveFile.pokemon.map((p) => {
              if (p.onTeam) {
                return fullyHealPokemon(p);
              }

              return p;
            }),
          });
        }}
        content={<h4>Leave the challenge field</h4>}
        icon={<IoMdExit size={battleSpriteSize} />}
        actionElements={[]}
      />
    );
  }

  return <></>;
};
const TimedEventLog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>();
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const filteredEvents = useMemo(() => {
    return (saveFile.timedEvents ?? []).filter((event) => {
      if (!search) {
        return true;
      }

      return (
        event.id.toLocaleLowerCase().includes(search) ||
        event.type.toLocaleLowerCase().includes(search)
      );
    });
  }, [saveFile.timedEvents, search]);

  if (!open) {
    return <button onClick={() => setOpen(true)}>Show Timed Event Log</button>;
  }

  return (
    <Stack mode="column">
      <input
        placeholder="search timed events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      {filteredEvents.map((event) => (
        <Card
          onClick={() =>
            patchSaveFileReducer(cleanUpSpecificEvent(saveFile, event.id))
          }
          content={
            <div>
              <h3>{event.id}</h3>
              <p>{event.type}</p>
              <p>{new Date(event?.removeAt ?? 0).toLocaleTimeString()}</p>
            </div>
          }
          icon={undefined}
          actionElements={[]}
        />
      ))}
    </Stack>
  );
};
