import { useCallback, useContext } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { StartingRegion, startingRegions } from "../../interfaces/SaveFile";
import { Stack } from "../../uiComponents/Stack/Stack";

export const StartingRegionSelection = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const proceed = useCallback(
    (region: StartingRegion) => {
      patchSaveFileReducer({
        ...saveFile,
        startingRegion: region,
        meta:
          saveFile.pokemon.length > 0
            ? { activeTab: "OVERWORLD" }
            : saveFile.meta,
      });
    },
    [patchSaveFileReducer, saveFile],
  );

  return (
    <InGamePage headline="What is your favorite Pokemon Region:">
      <div
        style={{
          height: "90dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          mode="column"
          alignItems="stretch"
          justifyContent="center"
          gapInRem={1}
        >
          <button onClick={() => proceed("kanto")}>
            I have never played pokemon before
          </button>
          {startingRegions.map((region) => (
            <button key={region} onClick={() => proceed(region)}>
              {region}
            </button>
          ))}
        </Stack>
      </div>
    </InGamePage>
  );
};
