import React, { useContext, useMemo } from "react";
import { MoveName } from "../../../constants/movesCheckList";
import { calculateLevelData } from "../../../functions/calculateLevelData";
import { moveIsTeachable } from "../../../functions/moveIsAvailable";
import { GameDataContext } from "../../../hooks/useGameData";
import { useGetMoveData } from "../../../hooks/useGetMoveData";
import { LearnableMove } from "../../../hooks/useLearnableMoves";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { ItemType } from "../../../interfaces/Item";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { ItemSprite } from "../../ItemSprite/ItemSprite";
import { MoveDisplayEntry } from "../../MovesDisplay/components/MovesDisplayListEntry";

export const MoveEditorListEntry = ({
  m,
  ownedPokemon,
  moveToConfirm,
  setMoveToConfirm,
  unlockMove,
  missingPayment,
  payment,
  showOnlyAvailable,
}: {
  m: LearnableMove;
  ownedPokemon: OwnedPokemon;
  setMoveToConfirm: (m: MoveName) => void;
  moveToConfirm: MoveName | undefined;
  unlockMove: (m: MoveName, payment: ItemType) => void;
  missingPayment: boolean;
  payment: ItemType;
  showOnlyAvailable: boolean;
}): JSX.Element => {
  const gameData = useContext(GameDataContext);
  const { saveFile } = useContext(SaveFileContext);
  const highEnoughLevel = moveIsTeachable(
    m,
    calculateLevelData(ownedPokemon.xp, ownedPokemon.growthRate).level,
  );

  const { res: moveData } = useGetMoveData(m.move.name as MoveName);

  const { learnable: unlockable, message } = moveData
    ? gameData.isMoveLearnable(moveData, saveFile)
    : { learnable: false, message: "No data" };

  const additionalInfo = useMemo(() => {
    if (m.learnable && moveToConfirm === m.move.name) {
      return <div>Confirm</div>;
    }
    if (!highEnoughLevel) {
      return (
        <div>{`available at Lvl ${m.version_group_details[0].level_learned_at}`}</div>
      );
    }
    if (!unlockable) {
      return <div>{message}</div>;
    }
    if (missingPayment) {
      return <div>{` ${payment} required`}</div>;
    }
  }, [
    highEnoughLevel,
    m.learnable,
    m.move.name,
    m.version_group_details,
    message,
    missingPayment,
    moveToConfirm,
    payment,
    unlockable,
  ]);

  if (!moveData) {
    return <></>;
  }

  //moves can be disabled for the following reasons:
  // missing payment item
  // level too low
  // not enough badges
  const available = highEnoughLevel && unlockable && !missingPayment;

  if (!available && showOnlyAvailable) {
    return <React.Fragment key={m.move.name}></React.Fragment>;
  }
  return (
    <MoveDisplayEntry
      disabled={!available}
      moveName={moveData.name as MoveName}
      typeName={moveData.type.name}
      additionalInfo={additionalInfo}
      additionalIcons={[
        <ItemSprite
          item={payment}
          grayscale={!(m.learnable && highEnoughLevel && unlockable)}
        />,
      ]}
      onClick={
        m.learnable && moveToConfirm === m.move.name
          ? () => unlockMove(m.move.name as MoveName, payment)
          : () => setMoveToConfirm(m.move.name as MoveName)
      }
    />
  );
};
