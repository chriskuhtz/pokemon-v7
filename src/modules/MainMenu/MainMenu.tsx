import { BsBackpack4, BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdCatchingPokemon } from "react-icons/md";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

import { useContext, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { IoMdExit, IoMdSettings } from "react-icons/io";
import { RiBookShelfLine } from "react-icons/ri";
import { BadgesCard } from "../../components/BadgesCard/BadgesCard";
import { BugReportButton } from "../../components/BugReport/BugReport";
import { IdeaButton } from "../../components/IdeaReport/IdeaReport";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";

import React from "react";
import { ExportSnapshotCard } from "../../components/SnapshotCard/ExportSnapshotCard";
import { ImportSnapshotCard } from "../../components/SnapshotCard/ImportSnapshotCard";
import { ResetSnapshotCard } from "../../components/SnapshotCard/ResetSnapshotCard";
import { TrainerCard } from "../../components/TrainerCard/TrainerCard";
import { battleSpriteSize } from "../../constants/baseConstants";
import { customItemDescriptions } from "../../constants/customItemDescriptions";
import { mapsRecord } from "../../constants/gameData/maps/mapsRecord";
import { fullyHealPokemon } from "../../functions/fullyHealPokemon";
import { questMenuAvailable } from "../../functions/questMenuAvailable";
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
import { RoutesType } from "../../interfaces/Routing";
export const MainMenu = ({ goBack }: { goBack: () => void }): JSX.Element => {
  const { saveFile } = useContext(SaveFileContext);
  const { location } = useContext(LocationContext);
  const team = useMemo(
    () => saveFile.pokemon.filter((p) => p.onTeam),
    [saveFile.pokemon],
  );

  const gameData = useContext(GameDataContext);
  const reset = useReset();
  const [resetConfirmationInProgress, setRCIP] = useState<boolean>(false);
  const { numberOfUncollected } = useQuests();
  const navigate = useNavigate();
  const { addMessage } = useContext(MessageQueueContext);
  const { teleporter, teleportHome } = useTeleport();

  return (
    <Page headline="Main Menu:" goBack={goBack}>
      <Stack mode="column">
        <TrainerCard />
        <BadgesCard />
        {teleporter && (
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
        )}
        <FlyingButton />
        <LeaveChallengeFieldButton />
        <RepelButton />
        <LureButton />
        <ExpShareButton />
        <Card
          onClick={() => navigate("MAIN", "BAG")}
          content={<h4>Bag</h4>}
          icon={<BsBackpack4 size={battleSpriteSize} />}
          actionElements={[]}
        />
        <Card
          onClick={() => navigate("MAIN", "TEAM")}
          content={<h4>Team</h4>}
          icon={
            <div style={{ display: "flex", gap: ".5rem" }}>
              {team.map((t) => (
                <MdCatchingPokemon key={t.id} size={battleSpriteSize} />
              ))}
            </div>
          }
          actionElements={[]}
        />
        {questMenuAvailable(location.mapId, gameData) && (
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
        )}
        {saveFile.trainerNotes?.at(0) && (
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
        )}
        <Card
          onClick={() => navigate("MAIN", "INTERNAL_DEX")}
          content={<h4>Pokedex</h4>}
          icon={<RiBookShelfLine size={battleSpriteSize} />}
          actionElements={[]}
        />
        <Card
          onClick={() => navigate("MAIN", "WIKI")}
          content={<h4>Wiki</h4>}
          icon={<FaSearch size={battleSpriteSize} />}
          actionElements={[]}
        />
        {Object.keys(gameData.features.settingsEditableDuringGame).length >
          0 && (
          <Card
            onClick={() => navigate("MAIN", "SETTINGS_IN_GAME")}
            content={<h4>SETTINGS</h4>}
            icon={<IoMdSettings size={battleSpriteSize} />}
            actionElements={[]}
          />
        )}
        {gameData.features.snapShotExportAvailable && (
          <>
            <ExportSnapshotCard />
            <ImportSnapshotCard />
            <ResetSnapshotCard />
          </>
        )}

        {resetConfirmationInProgress ? (
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
        ) : (
          <button
            onClick={() => setRCIP(true)}
            style={{ backgroundColor: "darkred", color: "white" }}
          >
            Delete Savefile and reset
          </button>
        )}
        <BugReportButton />
        <IdeaButton />
        {window.localStorage.getItem("devmode") && <TimedEventLog />}

        {window.localStorage.getItem("devmode") &&
          Object.keys(mapsRecord).map((m) => (
            <Card
              key={m}
              onClick={() => navigate("MAIN", `MAP_MAKER_${m}` as RoutesType)}
              content={<h4>Map Maker {m}</h4>}
              icon={<GoTasklist size={battleSpriteSize} />}
              actionElements={[]}
            />
          ))}
      </Stack>
    </Page>
  );
};

export const ExpShareButton = () => {
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
export const RepelButton = () => {
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
export const LureButton = () => {
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
export const FlyingButton = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { location } = useContext(LocationContext);

  if (!saveFile.campUpgrades["pidgeot rider certification"]) {
    return <></>;
  }

  const devmode = !!window.localStorage.getItem("devmode");
  if (mapsRecord[location.mapId].area !== "OPEN" && !devmode) {
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
export const LeaveChallengeFieldButton = () => {
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
export const TimedEventLog = () => {
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
