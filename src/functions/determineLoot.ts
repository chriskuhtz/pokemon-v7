import { LeaveBattlePayload } from "../hooks/useLeaveBattle";
import {
  EmptyInventory,
  Inventory,
  joinInventories,
} from "../interfaces/Inventory";
import {
  berries,
  cookingBerries,
  evoStones,
  expCandies,
  herbs,
  ItemType,
  moveUnlockPayments,
  mulches,
  ppBoostItemTypes,
  ppRestorationItemTypes,
  superEffectiveSaveTable,
} from "../interfaces/Item";
import { ArrayHelpers } from "./ArrayHelpers";
import { calculateLevelData } from "./calculateLevelData";
import { getTotalInventoryAmount } from "./getBagLimit";
import { getHighestXpOnTeam } from "./getHighestXpOnTeam";

export const determineLoot = ({
  lootPossible,
  defeatedPokemon,
  isRogue,
}: LeaveBattlePayload & { isRogue: boolean }): Inventory | undefined => {
  if (!lootPossible) {
    return undefined;
  }
  let loot = { ...EmptyInventory };

  const lootChance = isRogue ? 0.8 : 0.9;
  const xp = getHighestXpOnTeam(defeatedPokemon);

  const { level } = calculateLevelData(xp, "medium");

  const heldItems: ItemType[] = defeatedPokemon
    .map((d) => d.heldItemName)
    .filter((h) => h !== undefined);
  //always a chance to get a held item
  heldItems.forEach((h) => {
    if (Math.random() * 2 > lootChance) {
      loot = joinInventories(loot, {
        [h]: 1,
      });
    }
  });
  //under level 20: up to 5 lower tier items
  if (level < 20) {
    Array.from({ length: 5 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(lowTierLoot)]: 1,
        });
      }
    });
  }
  //under level 30: up to 4 lower tier items + 2 mid tier items
  else if (level < 30) {
    Array.from({ length: 4 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(lowTierLoot)]: 1,
        });
      }
    });
    Array.from({ length: 2 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(midTierLoot)]: 1,
        });
      }
    });
  }
  //under level 40: up to 2 lower tier items + 3 mid tier items + 1 high tier items
  else if (level < 40) {
    Array.from({ length: 2 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(lowTierLoot)]: 1,
        });
      }
    });
    Array.from({ length: 3 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(midTierLoot)]: 1,
        });
      }
    });
    Array.from({ length: 1 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(highTierLoot)]: 1,
        });
      }
    });
  }
  //under level 50: up to 4 mid tier items + 2 high tier items
  else if (level < 50) {
    Array.from({ length: 4 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(midTierLoot)]: 1,
        });
      }
    });
    Array.from({ length: 2 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(highTierLoot)]: 1,
        });
      }
    });
  }
  //over level 50: up to 5 mid tier + 5 high tier items
  else if (level >= 50) {
    Array.from({ length: 4 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(midTierLoot)]: 1,
        });
      }
    });
    Array.from({ length: 2 }).forEach(() => {
      if (Math.random() > lootChance) {
        loot = joinInventories(loot, {
          [ArrayHelpers.getRandomEntry<ItemType>(highTierLoot)]: 1,
        });
      }
    });
  }

  if (getTotalInventoryAmount(loot) <= 0) {
    return undefined;
  }
  return loot;
};

const lowTierLoot: ItemType[] = [
  "poke-ball",
  "great-ball",
  "red-apricorn",
  "blue-apricorn",
  "yellow-apricorn",
  "green-apricorn",
  "pink-apricorn",
  "white-apricorn",
  "black-apricorn",
  "orange-apricorn",
  "oran-berry",
  "cheri-berry",
  "chesto-berry",
  "pecha-berry",
  "sitrus-berry",
  "fire-gem",
  "water-gem",
  "electric-gem",
  "grass-gem",
  "ice-gem",
  "fighting-gem",
  "poison-gem",
  "ground-gem",
  "flying-gem",
  "psychic-gem",
  "bug-gem",
  "rock-gem",
  "ghost-gem",
  "dark-gem",
  "steel-gem",
  "dragon-gem",
  "normal-gem",
  "fairy-gem",
  "potion",
  "repel",
  "exp-candy-xs",
  "exp-candy-s",
  ...mulches,
  ...cookingBerries,
];
const midTierLoot: ItemType[] = [
  "ultra-ball",
  "super-potion",
  "moomoo-milk",
  "quick-ball",
  "exp-candy-m",
  ...herbs,
  ...ppRestorationItemTypes,
  ...expCandies,
  ...berries.filter((b) => b !== "enigma-berry" && cookingBerries.includes(b)),
  ...moveUnlockPayments,
];
const highTierLoot: ItemType[] = [
  ...ppBoostItemTypes,
  ...evoStones,
  ...(Object.keys(superEffectiveSaveTable) as ItemType[]),
  "exp-candy-l",
  "exp-candy-xl",
  "rare-candy",
];
