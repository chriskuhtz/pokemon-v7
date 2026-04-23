import { useState } from "react";
import { SaveFile } from "../../interfaces/SaveFile";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";
import { kumaGameData } from "../../versions/kuma/Kuma";
import { PokemonSprite } from "../PokemonSprite/PokemonSprite";

export const RecoveryTool = () => {
  const [status, setStatus] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Card
      onClick={() => setOpen(true)}
      icon={
        <PokemonSprite config={{ officalArtwork: true }} name={"blissey"} />
      }
      content={
        <Stack mode="column">
          <h3>Recovery Tool</h3>
          <h4>Some Options if you get stuck due to bugs or changes</h4>

          {open && (
            <>
              <h4 style={{ color: "orangeRed" }}>{status}</h4>
              <button
                onClick={() => {
                  const localSaveFile = window.localStorage.getItem(
                    kumaGameData.saveFileId,
                  );
                  const locationEntry = window.localStorage.getItem(
                    kumaGameData.locationId,
                  );
                  const saveFile = localSaveFile
                    ? (JSON.parse(localSaveFile) as SaveFile)
                    : undefined;

                  const location = locationEntry
                    ? (JSON.parse(locationEntry) as SaveFile)
                    : undefined;

                  if (saveFile && location) {
                    const edited: SaveFile = {
                      ...saveFile,
                      meta: { activeTab: "OVERWORLD" },
                    };
                    window.localStorage.setItem(
                      kumaGameData.saveFileId,
                      JSON.stringify(edited),
                    );
                    window.localStorage.setItem(
                      kumaGameData.locationId,
                      JSON.stringify(kumaGameData.startingLocation),
                    );
                    setStatus(
                      "Transported back to camp: please try the game again",
                    );
                  } else {
                    setStatus(
                      "could not restore saveFile or Location: Unfortunately, you have to start over",
                    );
                  }
                }}
              >
                Kuma: Reset to Overworld, center of camp
              </button>

              <button
                onClick={() => {
                  const local = window.localStorage.getItem(
                    kumaGameData.saveFileId,
                  );

                  const saveFile = local
                    ? (JSON.parse(local) as SaveFile)
                    : undefined;

                  if (saveFile) {
                    saveFile.handledOccupants.forEach((h) => {
                      window.localStorage.removeItem(h.id);
                    });
                  }

                  window.localStorage.removeItem(kumaGameData.saveFileId);
                  window.localStorage.removeItem(kumaGameData.locationId);
                  setStatus(
                    "Kuma Savefile reset, have fun on your new Playthrough, sorry for the inconvenience",
                  );
                }}
              >
                Kuma: Reset entire Save File (you have to start over)
              </button>

              <button
                onClick={() => {
                  const local = window.localStorage.getItem(
                    "pokemonLabyrinthSaveFile",
                  );

                  const saveFile = local
                    ? (JSON.parse(local) as SaveFile)
                    : undefined;

                  if (saveFile) {
                    saveFile.handledOccupants.forEach((h) => {
                      window.localStorage.removeItem(h.id);
                    });
                  }

                  window.localStorage.removeItem("pokemonLabyrinthSaveFile");
                  window.localStorage.removeItem("pokemonLabyrinthLocation");
                  setStatus(
                    "Labyrinth Savefile reset, have fun on your new Playthrough, sorry for the inconvenience",
                  );
                }}
              >
                Labyrinth: Reset entire Save File (you have to start over)
              </button>
            </>
          )}
        </Stack>
      }
      actionElements={[]}
    ></Card>
  );
};
