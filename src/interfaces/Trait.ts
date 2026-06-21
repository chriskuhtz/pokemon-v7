import { PokemonName } from "../constants/pokemonNames";
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
  "entomologist", //"New route: hiwairo swamp",,
  "nurse",
  "tinkerer",
  "maker",
] as const;
export type CharacterTrait = (typeof traits)[number];

export const traitResearchBoni: Record<
  CharacterTrait,
  Partial<Record<QuestCategory, number>>
> = {
  chef: { RESEARCH: 1.1 },
  gardener: { RESEARCH: 1.1 },
  competitor: { "TRAVELLING TRAINER": 1.1, BATTLE: 1.1, "GYM LEADER": 1.1 },
  nurse: { "TRAVELLING TRAINER": 1.1, BATTLE: 1.1, "GYM LEADER": 1.1 },
  collector: { POKEDEX: 1.1 },
  explorer: { EXPLORATION: 1.05 },
  rogue: { EXPLORATION: 1.05 },
  "gym bro": { TRAINING: 1.1 },
  archaeologist: { EXPLORATION: 1.05 },
  entomologist: { POKEDEX: 1.1 },
  tinkerer: { RESEARCH: 1.1 },
  maker: { RESEARCH: 1.1 },
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
  entomologist: "bug",
  nurse: "fairy",
  tinkerer: "electric",
  maker: "steel",
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
  entomologist: hexToRgb(typeColors[traitTypes.entomologist], 0.5),
  nurse: hexToRgb(typeColors[traitTypes.nurse], 0.5),
  tinkerer: hexToRgb(typeColors[traitTypes.tinkerer], 0.5),
  maker: hexToRgb(typeColors[traitTypes.maker], 0.5),
};

export const traitBonusExplanations: Record<CharacterTrait, string[]> = {
  chef: [
    "Chefs rarely fail at cooking and can sometimes stretch cooked snacks into multiple portions",
    `A Chef's calm energy makes their ${traitTypes["chef"]} type pokemon slightly stronger`,
  ],
  gardener: [
    "Gardeners can harvest more plants than others and they seem to grow back faster",
    `A Gardener's encouraging energy makes their ${traitTypes["gardener"]} type pokemon slightly stronger`,
  ],
  competitor: [
    "Competitors are expert trainers, making their pokemon grow faster",
    `A Competitor's fierce energy makes their ${traitTypes["competitor"]} type pokemon slightly stronger`,
  ],
  collector: [
    "Collectors have better chances at catching pokemon and finding shiny pokemon ",
    `A Collector's concentration makes their ${traitTypes["collector"]} type pokemon slightly stronger`,
  ],
  explorer: [
    "Explorers often find more items than others and lose fewer Items when they retreat",
    `An Eplorer's courage makes their ${traitTypes["explorer"]} type pokemon slightly stronger`,
  ],
  rogue: [
    "Rogues have better chances of escaping from battle and find more loot than others",
    `A Rogue's mischievous energy makes their ${traitTypes["rogue"]} type pokemon slightly stronger`,
  ],
  "gym bro": [
    "A Gym Bro's knowledge of Supplements makes their Pokemon gain Effort Values faster",
    `A Gym Bro's discipline makes their ${traitTypes["gym bro"]} type pokemon slightly stronger`,
  ],
  archaeologist: [
    "Archaeologists have a higher chance of finding pokemon or items in the earth",
    "Their connection to the museum gets them more rewards for valuable items",
    `An Archaeologists connection to the earth makes their ${traitTypes.archaeologist} type pokemon slightly stronger`,
  ],
  entomologist: [
    "Entomologists encounter pokemon with increased IVs if they have caught the species before",
    "The more of the species they have, the stronger the specimen will be",
    `An Entomologists multi faceted perspective makes their ${traitTypes.entomologist} type pokemon slightly stronger`,
  ],
  nurse: [
    "Nurses have a chance to heal their Pokemon after winning a battle",
    `A nurses caring energy makes their ${traitTypes.nurse} type pokemon slightly stronger`,
  ],
  tinkerer: [
    "Tinkerers can craft Tms out of fewer parts and with higher success rate",
    `A tinkerers curiosity makes their ${traitTypes.tinkerer} type pokemon slightly stronger`,
  ],
  maker: [
    "Maker can sometimes reuse tms and have a chance to craft better pokeballs from gray apricorns",
    `A Makers knowledge of materials makes their ${traitTypes.maker} type pokemon slightly stronger`,
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
  entomologist: {
    storage: joinInventories(EmptyInventory, {
      "net-ball": 10,
      "nest-ball": 10,
      "berry-juice": 5,
      lure: 1,
      "black-augurite": 1,
      "metal-coat": 1,
      "silver-powder": 1,
    }),
  },
  nurse: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 5,
      "full-heal": 3,
      "moomoo-milk": 5,
      "pixie-plate": 1,
      leftovers: 1,
      "big-root": 1,
    }),
  },
  tinkerer: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 5,
      magnet: 1,
      "electric-gem": 5,
      calcium: 1,
      zinc: 1,
    }),
  },
  maker: {
    storage: joinInventories(EmptyInventory, {
      "poke-ball": 20,
      "berry-juice": 5,
      "metal-coat": 1,
      "steel-gem": 5,
      calcium: 1,
      zinc: 1,
    }),
  },
};

export const traitStarter: Record<CharacterTrait, PokemonName> = {
  chef: "marill",
  gardener: "applin",
  collector: "munchlax",
  explorer: "rufflet",
  competitor: "vulpix",
  rogue: "sneasel",
  "gym bro": "machop",
  archaeologist: "trapinch",
  entomologist: "yanma",
  nurse: "ralts",
  tinkerer: "elekid",
  maker: "cufant",
};
