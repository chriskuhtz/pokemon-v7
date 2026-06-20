import { battleSpriteSize } from "../../../constants/baseConstants";
import { MoveName } from "../../../constants/movesCheckList";
import { typeColors } from "../../../constants/typeColors";
import { hexToRgb } from "../../../functions/hexToRGB";
import { MoveDto } from "../../../interfaces/Move";
import { PokemonType } from "../../../interfaces/PokemonType";
import { ListItem } from "../../../uiComponents/ListItem/ListItem";
import { MoveInfoButton } from "../../MoveInfoButton/MoveInfoButton";

export const MoveDisplayEntry = ({
  moveName,
  typeName,
  onClick,
  additionalInfo,
  additionalIcons,
  disabled,
}: {
  moveName: MoveName;
  typeName: PokemonType;
  onClick?: () => void;
  additionalInfo?: React.JSX.Element;
  additionalIcons?: React.JSX.Element[];
  disabled?: boolean;
}) => {
  return (
    <ListItem
      disabled={disabled}
      onClick={onClick}
      backgroundColor={hexToRgb(typeColors[typeName], 0.7)}
      primaryIcon={
        <img height={battleSpriteSize} src={`/typeIcons/${typeName}.png`} />
      }
      content={moveName}
      additionalContent={additionalInfo}
      additionalIcons={additionalIcons}
      infoButton={<MoveInfoButton movename={moveName} />}
    />
  );
};

export const PPAndStrengthSection = ({
  data,
  currentPP,
}: {
  data: MoveDto;
  currentPP: number;
}) => {
  return (
    <div>
      <strong>
        {data.damage_class.name.slice(0, 4)} Move
        {data.power ? `: ${data.power} Power` : ""}
      </strong>
      <br />
      <strong>
        {" "}
        PP: {currentPP}/{data.pp}
      </strong>
    </div>
  );
};
