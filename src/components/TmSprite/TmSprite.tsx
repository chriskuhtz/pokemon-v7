import { battleSpriteSize } from "../../constants/baseConstants";
import { PokemonType } from "../../interfaces/PokemonType";

export const TmSprite = ({
  type,
  sizeFactor,
  grayscale,
  onClick,
}: {
  type: PokemonType;
  sizeFactor?: number;
  grayscale?: boolean;
  onClick?: () => void;
}) => {
  return (
    <img
      title={`tm_${type}`}
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${type}.png`}
      height={battleSpriteSize * (sizeFactor ?? 1)}
      width={battleSpriteSize * (sizeFactor ?? 1)}
      style={grayscale ? { filter: "grayscale(1)" } : undefined}
      onClick={onClick}
    />
  );
};
