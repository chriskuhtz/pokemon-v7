import React, { useContext } from "react";
import { MoveName } from "../../constants/movesCheckList";
import { getCostForLearnMethod } from "../../functions/getCostForLearnMethod";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { Stack } from "../../uiComponents/Stack/Stack";
import { ToggleRow } from "../../uiComponents/ToggleRow/ToggleRow";
import { MoveEditorListEntry } from "./components/MoveEditorListEntry";
import { useMoveEditor } from "./hooks/useMoveEditor";

export const MoveEditor = ({
  ownedPokemon,
}: {
  ownedPokemon: OwnedPokemon;
}) => {
  const {
    onlyLearnable,
    setOnlyLearnable,
    options,
    unlockMove,
    moveToConfirm,
    setMoveToConfirm,
  } = useMoveEditor({ ownedPokemon });
  const { saveFile } = useContext(SaveFileContext);

  return (
    <Stack mode={"column"}>
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
        <ToggleRow
          label="Show only learnable"
          value={onlyLearnable}
          setValue={() => setOnlyLearnable(!onlyLearnable)}
          disabled={false}
        />
      </div>
      {options.map((m) => {
        const payment = getCostForLearnMethod(
          m.move.name as MoveName,
          m.version_group_details[0].move_learn_method.name,
        );
        if (onlyLearnable && !m.learnable) {
          return <React.Fragment key={m.move.name}></React.Fragment>;
        }
        return (
          <MoveEditorListEntry
            key={m.move.name}
            m={m}
            payment={payment}
            ownedPokemon={ownedPokemon}
            missingPayment={saveFile.bag[payment] < 1}
            unlockMove={unlockMove}
            moveToConfirm={moveToConfirm}
            setMoveToConfirm={setMoveToConfirm}
          />
        );
      })}
    </Stack>
  );
};
