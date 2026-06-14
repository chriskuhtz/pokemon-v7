import { typeColors } from "../constants/typeColors";
import { hexToRgb } from "../functions/hexToRGB";
import { PokemonType } from "../interfaces/PokemonType";
import { EmptyInventory, Inventory, joinInventories } from "./Inventory";
import { QuestCategory } from "./Quest";

export const traits = [
  "collector",
  "chef",
  "gardener",
  "competitor",
  "explorer",
  "rogue",
  "gym bro",
  "archaeologist",
  //"entomologist" "New route: hiwairo swamp",,
  //"nurse"
] as const;
export type CharacterTrait = (typeof traits)[number];

export const traitResearchBoni: Record<
  CharacterTrait,
  Partial<Record<QuestCategory, number>>
> = {
  chef: { RESEARCH: 1.1 },
  gardener: { RESEARCH: 1.1 },
  competitor: { "TRAVELLING TRAINER": 1.1, BATTLE: 1.1, "GYM LEADER": 1.1 },
  collector: { POKEDEX: 1.1 },
  explorer: { EXPLORATION: 1.05 },
  rogue: { EXPLORATION: 1.05 },
  "gym bro": { TRAINING: 1.1 },
  archaeologist: { EXPLORATION: 1.1 },
};
export const traitTypes: Record<CharacterTrait, PokemonType> = {
  chef: "water",
  gardener: "grass",
  collector: "normal",
  explorer: "flying",
  competitor: "fire",
  rogue: "dark",
  "gym bro": "fighting",
  archaeologist: "ground",
};

export const traitColors: Record<CharacterTrait, string> = {
  chef: hexToRgb(typeColors[traitTypes.chef], 0.5),
  gardener: hexToRgb(typeColors[traitTypes.gardener], 0.5),
  collector: hexToRgb(typeColors[traitTypes.collector], 0.5),
  competitor: hexToRgb(typeColors[traitTypes.competitor], 0.5),
  explorer: hexToRgb(typeColors[traitTypes.explorer], 0.5),
  rogue: hexToRgb(typeColors[traitTypes.rogue], 0.5),
  "gym bro": hexToRgb(typeColors[traitTypes["gym bro"]], 0.5),
  archaeologist: hexToRgb(typeColors[traitTypes.archaeologist], 0.5),
};

export const traitBonusExplanations: Record<CharacterTrait, string[]> = {
  chef: [
    "Chefs rarely fail at cooking and can sometimes stretch cooked snacks into multiple portions",
    `A Chef's calm energy makes his ${traitTypes["chef"]} type pokemon slightly stronger`,
  ],
  gardener: [
    "Gardeners can harvest more plants than others and they seem to grow back faster",
    `A Gardener's encouraging energy makes his ${traitTypes["gardener"]} type pokemon slightly stronger`,
  ],
  competitor: [
    "Competitors are expert trainers, making their pokemon grow faster",
    `A Competitor's fierce energy makes his ${traitTypes["competitor"]} type pokemon slightly stronger`,
  ],
  collector: [
    "Collectors have better chances at catching pokemon and finding shiny pokemon ",
    `A Collector's concentration makes his ${traitTypes["collector"]} type pokemon slightly stronger`,
  ],
  explorer: [
    "Explorers often find more items than others and lose fewer Items when they retreat",
    `An Eplorer's courage makes his ${traitTypes["explorer"]} type pokemon slightly stronger`,
  ],
  rogue: [
    "Rogues have better chances of escaping from battle and find more loot than others",
    `A Rogue's mischievous energy makes his ${traitTypes["rogue"]} type pokemon slightly stronger`,
  ],
  "gym bro": [
    "A Gym Bro's knowledge of Supplements makes his Pokemon gain Effort Values faster",
    `A Gym Bro's discipline makes his ${traitTypes["gym bro"]} type pokemon slightly stronger`,
  ],
  archaeologist: [
    "Archaeologists have a higher chance of finding pokemon or more/better items in the earth",
    "Their connection to the museum gets them more rewards for valuable items",
    `An Archaeologists connection to the earth makes his ${traitTypes.archaeologist} type pokemon slightly stronger`,
  ],
};

export const traitLoadOuts: Record<CharacterTrait, { storage: Inventory }> = {
  chef: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 5,
      "big-malasada": 1,
      "old-gateau": 1,
      casteliacone: 1,
      "rage-candy-bar": 1,
      "pewter-crunchies": 1,
      "moomoo-cheese": 1,
      "lumiose-galette": 1,
      "lava-cookie": 1,
      "mystic-water": 1,
    }),
  },
  gardener: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "sitrus-berry": 5,
      "lum-berry": 5,
      "shuca-berry": 1,
      "hondew-berry": 1,
      honey: 3,
      "big-root": 1,
      "miracle-seed": 1,
      "surprise-mulch": 5,
    }),
  },
  competitor: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "scope-lens": 1,
      "expert-belt": 1,
      "shell-bell": 1,
      "wide-lens": 1,
      "choice-band": 1,
      "choice-specs": 1,
      charcoal: 1,
    }),
  },
  collector: {
    storage: joinInventories(EmptyInventory, {
      "nest-ball": 10,
      "net-ball": 10,
      "quick-ball": 10,
      lure: 5,
      "silk-scarf": 1,
    }),
  },
  explorer: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 10,
      repel: 5,
      "super-repel": 1,
      lure: 5,
      "super-lure": 1,
      "sharp-beak": 1,
    }),
  },
  rogue: {
    storage: joinInventories(EmptyInventory, {
      "escape-rope": 2,
      "fluffy-tail": 1,
      "berry-juice": 5,
      repel: 5,
      "poke-ball": 15,
      "dusk-ball": 5,
      "black-glasses": 1,
    }),
  },
  "gym bro": {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 5,
      "moomoo-milk": 5,
      "hp-up": 2,
      calcium: 2,
      zinc: 2,
      iron: 2,
      protein: 2,
      carbos: 2,
      "macho-brace": 1,
      "black-belt": 1,
    }),
  },
  archaeologist: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 5,
      "kings-rock": 1,
      "razor-fang": 1,
      "moon-stone": 1,
      "soft-sand": 1,
      "escape-rope": 1,
    }),
  },
};
