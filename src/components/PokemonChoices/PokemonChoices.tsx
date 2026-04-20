import { battleSpriteSize } from "../../constants/gameData/gameData";
import { typeColors } from "../../constants/typeColors";
import { getItemUrl } from "../../functions/getItemUrl";
import { BattlePokemon } from "../../interfaces/BattlePokemon";
import { Stack } from "../../uiComponents/Stack/Stack";
import { getPokemonSprite } from "../PokemonSprite/PokemonSprite";

export const PokemonChoices = ({
  pokemon,
  choose,
  chosen,
}: {
  chosen: BattlePokemon | undefined;
  pokemon: BattlePokemon[];
  choose: (x: BattlePokemon | undefined) => void;
}) => {
  return (
    <Stack mode="row" justifyContent="center" alignItems="center">
      {pokemon.map((o) => (
        <img
          role="button"
          tabIndex={0}
          key={o.id}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              choose(o);
            }
          }}
          style={{
            borderRadius: 9000,
            border:
              o === chosen ? `2px solid ${typeColors["dark"]}` : undefined,
          }}
          height={battleSpriteSize * (o === chosen ? 3 : 1.5)}
          width={battleSpriteSize * (o === chosen ? 3 : 1.5)}
          src={
            o === chosen
              ? getPokemonSprite(o.name, { shiny: o.shiny })
              : getItemUrl("poke-ball")
          }
          onClick={() => choose(o)}
        />
      ))}
    </Stack>
  );
};
