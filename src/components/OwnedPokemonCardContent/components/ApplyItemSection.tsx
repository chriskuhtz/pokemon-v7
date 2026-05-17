import { useContext } from "react";
import { canBenefitFromItem } from "../../../functions/canBenefitFromItem";
import { getHeldItem } from "../../../functions/getHeldItem";
import { getMovesArray } from "../../../functions/getMovesArray";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { ItemType } from "../../../interfaces/Item";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { PokemonData } from "../../../interfaces/PokemonData";
import { Stack } from "../../../uiComponents/Stack/Stack";
import { ItemSelectionOption } from "../../ItemSelectionOption/ItemSelectionOption";
import { DetailsCard } from "./DetailsCard";

export const ApplyItemSection = ({
  ownedPokemon,
  data,
}: {
  ownedPokemon: OwnedPokemon;
  data: PokemonData;
}) => {
  const heldItem = getHeldItem(ownedPokemon);
  const {
    saveFile: { bag, trait },
    applyItemToPokemonReducer,
  } = useContext(SaveFileContext);

  return (
    <Stack mode="column">
      <DetailsCard detailed={false} ownedPokemon={ownedPokemon} data={data} />

      {Object.entries(bag)
        .filter(
          ([item, amount]) =>
            amount > 0 &&
            canBenefitFromItem({
              pokemon: ownedPokemon,
              item: item as ItemType,
              trait,
            }),
        )
        .map(([item]) => item)
        .filter((s) => s !== undefined && s !== heldItem)
        .map((item) => {
          if (
            item === "ether" ||
            item === "max-ether" ||
            item === "leppa-berry"
          ) {
            const moves = getMovesArray(ownedPokemon);

            return moves
              .filter((m) => m.usedPP > 0)
              .map((m) => (
                <ItemSelectionOption
                  key={ownedPokemon.id + m.name + item}
                  item={item as ItemType}
                  isSelected={item === heldItem}
                  label={`Apply ${item} to ${ownedPokemon.name}'s ${m.name}`}
                  onClick={() =>
                    applyItemToPokemonReducer(
                      ownedPokemon,
                      item as ItemType,
                      m.name,
                    )
                  }
                />
              ));
          }
          if (item === "pp-max" || item === "pp-up") {
            const moves = getMovesArray(ownedPokemon);

            return moves.map((m) => (
              <ItemSelectionOption
                key={ownedPokemon.id + m.name + item}
                item={item as ItemType}
                isSelected={item === heldItem}
                label={`Apply ${item} to ${ownedPokemon.name}'s ${m.name}`}
                onClick={() =>
                  applyItemToPokemonReducer(
                    ownedPokemon,
                    item as ItemType,
                    m.name,
                  )
                }
              />
            ));
          }
          return (
            <ItemSelectionOption
              key={ownedPokemon.id + item}
              item={item as ItemType}
              isSelected={item === heldItem}
              label={`Apply ${item} to ${ownedPokemon.name}`}
              onClick={() =>
                applyItemToPokemonReducer(ownedPokemon, item as ItemType)
              }
            />
          );
        })}
    </Stack>
  );
};
