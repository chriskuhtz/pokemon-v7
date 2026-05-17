import { useCallback, useContext, useState } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { Stack } from "../../uiComponents/Stack/Stack";

export const NameSelection = (): JSX.Element => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

  const [name, setName] = useState<string | undefined>("");

  const proceed = useCallback(() => {
    if (!name) {
      return;
    }

    patchSaveFileReducer({
      ...saveFile,
      playerId: name,
    });
  }, [name, patchSaveFileReducer, saveFile]);

  return (
    <InGamePage headline="What is your name:">
      <div
        style={{
          height: "90dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack mode="column" alignItems="center" justifyContent="center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />
          <button disabled={!name} onClick={proceed}>
            Proceed
          </button>
        </Stack>
      </div>
    </InGamePage>
  );
};
