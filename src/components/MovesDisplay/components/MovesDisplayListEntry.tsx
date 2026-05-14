import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { battleSpriteSize } from "../../../constants/baseConstants";
import { MoveName } from "../../../constants/movesCheckList";
import { getCurrentPP } from "../../../functions/getCurrentPP";
import { getMovesArray } from "../../../functions/getMovesArray";
import { BattleMove, BattlePokemon } from "../../../interfaces/BattlePokemon";
import { PokemonType } from "../../../interfaces/PokemonType";
import { Card } from "../../../uiComponents/Card/Card";
import { MoveInfoButton } from "../../MoveInfoButton/MoveInfoButton";
export const MovesDisplayListEntry = ({
  o,
  onlyCurrent,
  currentMoves,
  reorder,
  activateMove,
  deActivateMove,
  battlePokemon,
  small,
}: {
  o: MoveName;
  battlePokemon: BattlePokemon;
  onlyCurrent: boolean;
  currentMoves: MoveName[];
  reorder: (dir: "UP" | "DOWN") => void;
  activateMove: () => void;
  deActivateMove: () => void;
  small: boolean;
}) => {
  const battleMove = getMovesArray(battlePokemon).find((b) => b.name === o);
  if (!battleMove) {
    return <></>;
  }
  const currentPP = getCurrentPP(battlePokemon, battleMove);

  if (small) {
    return (
      <SmallMoveDisplayEntry
        typeName={battleMove.data.type.name}
        moveName={o}
      />
    );
  }
  return (
    <BigMoveDisplayEntry
      battleMove={battleMove}
      o={o}
      onlyCurrent={onlyCurrent}
      currentMoves={currentMoves}
      reorder={reorder}
      activateMove={activateMove}
      deActivateMove={deActivateMove}
      currentPP={currentPP}
    />
  );
};

export const SmallMoveDisplayEntry = ({
  moveName,
  typeName,
  onClick,
  additionalInfo,
  additionalIcon,
}: {
  moveName: MoveName;
  typeName: PokemonType;
  onClick?: () => void;
  additionalInfo?: React.JSX.Element;
  additionalIcon?: React.JSX.Element;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <img height={battleSpriteSize} src={`/typeIcons/${typeName}.png`} />
        {additionalIcon}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <strong>
            {moveName}
            {additionalInfo ? ":" : ""}
          </strong>
          {additionalInfo}
        </div>
      </div>

      <MoveInfoButton movename={moveName} />
    </div>
  );
};

const BigMoveDisplayEntry = ({
  o,
  onlyCurrent,
  currentMoves,
  reorder,
  activateMove,
  deActivateMove,
  battleMove,
  currentPP,
}: {
  o: MoveName;
  battleMove: BattleMove;
  onlyCurrent: boolean;
  currentMoves: MoveName[];
  reorder: (dir: "UP" | "DOWN") => void;
  activateMove: () => void;
  deActivateMove: () => void;
  currentPP: number;
}) => {
  return (
    <div
      key={o}
      style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {onlyCurrent || currentMoves.length === 1
          ? []
          : [
              <FaArrowUp
                key={`${o}UP`}
                onClick={(e) => {
                  e.stopPropagation();
                  reorder("UP");
                }}
              />,
              <FaArrowDown
                key={`${o}DOWN`}
                onClick={(e) => {
                  e.stopPropagation();
                  reorder("DOWN");
                }}
              />,
            ]}
      </div>
      <div style={{ flexGrow: 1 }}>
        <Card
          key={o}
          actionElements={[
            <img
              height={battleSpriteSize}
              src={`/typeIcons/${battleMove.data.type.name}.png`}
            />,
          ]}
          disabled={!currentMoves.includes(o) && currentMoves.length === 4}
          icon={<MdOutlineRadioButtonChecked />}
          onClick={() => {
            if (onlyCurrent) {
              return;
            }
            if (currentMoves.includes(o)) {
              if (currentMoves.length === 1) {
                return;
              } else deActivateMove();
            }
            if (!currentMoves.includes(o)) {
              if (currentMoves.length === 4) {
                return;
              } else activateMove();
            }
          }}
          content={
            <div>
              <h4>
                {battleMove.name} (
                {battleMove.data.power ? `${battleMove.data.power} ` : ""}
                {battleMove.data.damage_class.name.slice(0, 4)})
              </h4>

              <div>
                <strong>
                  PP: {currentPP}/{battleMove.data.pp}
                </strong>
              </div>
            </div>
          }
        />
      </div>
      <MoveInfoButton movename={o} />
    </div>
  );
};
