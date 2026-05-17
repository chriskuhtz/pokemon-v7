import { isEqual } from "lodash";
import { MoveName } from "../constants/movesCheckList";
import { BattlePokemon } from "../interfaces/BattlePokemon";
import {
  isPPBoostItem,
  isPPRestorationItem,
  ItemType,
} from "../interfaces/Item";
import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { CharacterTrait } from "../interfaces/Trait";
import { applyItemToPokemon } from "./applyItemToPokemon";
import { getMovesArray } from "./getMovesArray";

export function canBenefitFromItem<T extends OwnedPokemon | BattlePokemon>({
  pokemon,
  item,
  move,
  trait,
}: {
  pokemon: T;
  item: ItemType;
  move?: MoveName;
  trait: CharacterTrait | undefined;
}): boolean {
  if (
    isPPRestorationItem(item) &&
    getMovesArray(pokemon).some((m) => m.usedPP > 0)
  ) {
    return true;
  }
  if (!move && isPPBoostItem(item)) {
    return true;
  }
  const afterItemApplication = applyItemToPokemon({
    pokemon,
    item,
    addMessage: undefined,
    move,
    trait,
  });
  return (
    !isEqual(pokemon, afterItemApplication) ||
    !isEqual(pokemon.damage, afterItemApplication.damage)
  );
}
