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
      onClick={onClick}
      backgroundColor={disabled ? "gray" : hexToRgb(typeColors[typeName], 0.7)}
      primaryIcon={
        <img height={battleSpriteSize} src={`/typeIcons/${typeName}.png`} />
      }
      content={moveName}
      additionalContent={additionalInfo}
      additionalIcons={additionalIcons}
      infoButton={<MoveInfoButton movename={moveName} />}
    />
  );
  return (
    <div
      onClick={onClick}
      style={{
        padding: ".25rem 0",
        backgroundColor: hexToRgb(typeColors[typeName], 0.7),
        borderRadius: 4,
        borderTopLeftRadius: 16,
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
          paddingLeft: "0.25rem",
        }}
      >
        <img height={battleSpriteSize} src={`/typeIcons/${typeName}.png`} />{" "}
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          paddingRight: "0.25rem",
        }}
      >
        {additionalIcons?.map((a) => a)}
        <MoveInfoButton movename={moveName} />
      </div>
    </div>
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
