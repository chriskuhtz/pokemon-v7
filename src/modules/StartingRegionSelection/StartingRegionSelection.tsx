import { useCallback, useContext } from "react";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { StartingRegion, startingRegions } from "../../interfaces/SaveFile";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

export const StartingRegionSelection = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const proceed = useCallback(
    (region: StartingRegion) => {
      patchSaveFileReducer({
        ...saveFile,
        startingRegion: region,
      });
    },
    [patchSaveFileReducer, saveFile],
  );

  return (
    <Page headline="What is your favorite Pokemon Region:">
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
          gap={1}
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
    </Page>
  );
};
