import { battleSpriteSize } from "../../constants/gameData/gameData";
import { getCurrentPP } from "../../functions/getCurrentPP";
import { BattleMove, BattlePokemon } from "../../interfaces/BattlePokemon";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

export const MoveCard = ({
  move,
  onClick,
  highlighted,
  pokemon,
}: {
  move: BattleMove;
  onClick: () => void;
  highlighted?: boolean;
  pokemon: BattlePokemon;
}) => {
  return (
    <Card
      highlighted={highlighted}
      disabled={getCurrentPP(pokemon, move) <= 0}
      onClick={onClick}
      icon={
        <img
          height={battleSpriteSize}
          src={`/typeIcons/${move.data.type.name}.png`}
        />
      }
      content={
        <Stack alignItems="center" mode="column">
          <h4>{move.name}</h4>
          <strong>
            ({move.data.power ? `${move.data.power} ` : ""}
            {move.data.damage_class.name.slice(0, 4)})
          </strong>
          <strong>
            PP: {getCurrentPP(pokemon, move)}/{move.data.pp}
          </strong>
        </Stack>
      }
      actionElements={[]}
    />
  );
};
