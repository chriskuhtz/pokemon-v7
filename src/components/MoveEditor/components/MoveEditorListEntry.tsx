import { useContext } from "react";
import { MoveName } from "../../../constants/movesCheckList";
import { calculateLevelData } from "../../../functions/calculateLevelData";
import { moveIsTeachable } from "../../../functions/moveIsAvailable";
import { GameDataContext } from "../../../hooks/useGameData";
import { useGetMoveData } from "../../../hooks/useGetMoveData";
import { LearnableMove } from "../../../hooks/useLearnableMoves";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { ItemType } from "../../../interfaces/Item";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { Card } from "../../../uiComponents/Card/Card";
import { ItemSprite } from "../../ItemSprite/ItemSprite";
import { MoveInfoButton } from "../../MoveInfoButton/MoveInfoButton";

export const MoveEditorListEntry = ({
  m,
  ownedPokemon,
  moveToConfirm,
  setMoveToConfirm,
  unlockMove,
  missingPayment,
  payment,
}: {
  m: LearnableMove;
  ownedPokemon: OwnedPokemon;
  setMoveToConfirm: (m: MoveName) => void;
  moveToConfirm: MoveName | undefined;
  unlockMove: (m: MoveName, payment: ItemType) => void;
  missingPayment: boolean;
  payment: ItemType;
}): JSX.Element => {
  const gameData = useContext(GameDataContext);
  const { saveFile } = useContext(SaveFileContext);
  const available = moveIsTeachable(
    m,
    calculateLevelData(ownedPokemon.xp, ownedPokemon.growthRate).level,
  );

  const { res: moveData } = useGetMoveData(m.move.name as MoveName);

  const { learnable: unlockable, message } = moveData
    ? gameData.isMoveLearnable(moveData, saveFile)
    : { learnable: false, message: "No data" };

  return (
    <div
      key={m.move.name}
      style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
    >
      <div style={{ flexGrow: 1 }}>
        <Card
          key={m.move.name}
          onClick={() => setMoveToConfirm(m.move.name as MoveName)}
          actionElements={
            m.learnable && moveToConfirm === m.move.name
              ? [
                  <strong
                    onClick={() => unlockMove(m.move.name as MoveName, payment)}
                  >
                    Confirm
                  </strong>,
                ]
              : []
          }
          icon={<ItemSprite item={payment} />}
          disabled={!m.learnable || !unlockable}
          content={
            <>
              {available && <strong>{m.move.name}</strong>}
              {!available && (
                <strong>{`${m.move.name} available at Lvl ${m.version_group_details[0].level_learned_at}`}</strong>
              )}
              <br />
              {!unlockable && <strong>{message}</strong>}

              <strong>{missingPayment && ` : ${payment} required`}</strong>
            </>
          }
        />{" "}
      </div>
      <MoveInfoButton movename={m.move.name as MoveName} />
    </div>
  );
};
