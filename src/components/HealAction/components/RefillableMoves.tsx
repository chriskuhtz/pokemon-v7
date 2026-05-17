import { MoveName } from "../../../constants/movesCheckList";
import { canBenefitFromItem } from "../../../functions/canBenefitFromItem";
import { getMovesArray } from "../../../functions/getMovesArray";
import { ItemType } from "../../../interfaces/Item";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { CharacterTrait } from "../../../interfaces/Trait";
import { Banner } from "../../../uiComponents/Banner/Banner";

export const RefillableMoves = ({
  cancel,
  applyItem,
  selectedPokemon,
  item,
  trait,
}: {
  cancel: () => void;
  applyItem: (pokemon: OwnedPokemon, item: ItemType, move?: MoveName) => void;
  selectedPokemon: OwnedPokemon;
  item: ItemType;
  trait: CharacterTrait | undefined;
}): JSX.Element => {
  return (
    <Banner>
      <strong onClick={cancel}>X</strong>
      <h3>For which Move should {item} be used:</h3>
      {getMovesArray(selectedPokemon)
        .filter((m) =>
          canBenefitFromItem({
            pokemon: selectedPokemon,
            item,
            move: m.name,
            trait,
          }),
        )
        .map((m) => (
          <button
            style={{ backgroundColor: "white" }}
            key={m.name}
            onClick={() => {
              applyItem(selectedPokemon, item, m.name);
            }}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                applyItem(selectedPokemon, item, m.name);
              }
            }}
          >
            {m.name}
          </button>
        ))}
    </Banner>
  );
};
