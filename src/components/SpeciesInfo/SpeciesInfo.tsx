import { useFetch } from "@potfisch-industries-npm/usefetch";
import { PokemonName } from "../../constants/pokemonNames";
import { PokemonSpeciesData } from "../../interfaces/PokemonSpeciesData";

export const SpeciesInfo = ({ name }: { name: PokemonName }) => {
  const { res } = useFetch<PokemonSpeciesData>(async () => {
    return (
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    ).json();
  });

  return (
    <div>
      <h3>
        {name}: The {res?.genera.find((g) => g.language.name === "en")?.genus}
      </h3>
      <p>
        {
          res?.flavor_text_entries.find((g) => g.language.name === "en")
            ?.flavor_text
        }
      </p>
    </div>
  );
};
