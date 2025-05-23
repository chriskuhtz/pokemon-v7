import { EncounterMap } from "../encounters";

export const routeS1Encounters: EncounterMap = {
  WATER: [
    { name: "cramorant", minXp: 15625, maxXp: 27000, rarity: "rare" },
    { name: "tentacool", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "mantine", minXp: 15625, maxXp: 27000, rarity: "medium" },
    { name: "wailmer", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "veluza", minXp: 15625, maxXp: 27000, rarity: "rare" },
    { name: "horsea", minXp: 15625, maxXp: 27000, rarity: "medium" },
    { name: "seadra", minXp: 20000, maxXp: 35000, rarity: "rare" },
    { name: "wailord", minXp: 27000, maxXp: 125000, rarity: "ultra-rare" },
    { name: "carvanha", minXp: 15625, maxXp: 27000, rarity: "medium" },
    { name: "magikarp", minXp: 125, maxXp: 125, rarity: "rare" },
  ],
  BASE: [
    { name: "krabby", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "kingler", minXp: 20000, maxXp: 35000, rarity: "rare" },
    { name: "grimer", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "muk", minXp: 20000, maxXp: 35000, rarity: "rare" },
    { name: "wingull", minXp: 15625, maxXp: 27000, rarity: "common" },
  ],
  MORNING: [
    { name: "dewpider", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "araquanid", minXp: 20000, maxXp: 35000, rarity: "rare" },
  ],
  DAY: [
    { name: "marill", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "azumarill", minXp: 20000, maxXp: 35000, rarity: "rare" },
  ],
  EVENING: [
    { name: "slowpoke", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "slowbro", minXp: 20000, maxXp: 35000, rarity: "rare" },
    { name: "grimer-alola", minXp: 15625, maxXp: 27000, rarity: "rare" },
  ],
  NIGHT: [
    { name: "frillish", minXp: 15625, maxXp: 27000, rarity: "common" },
    { name: "jellicent", minXp: 20000, maxXp: 35000, rarity: "rare" },
    { name: "slowpoke-galar", minXp: 15625, maxXp: 27000, rarity: "rare" },
  ],
};
