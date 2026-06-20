import { PokemonType } from "../interfaces/PokemonType";
import { MoveName } from "./movesCheckList";

export interface MoveBaseData {
  name: MoveName;
  move_damage_class_id: 1 | 2 | 3;
  power: number | null;
  type: { name: PokemonType };
}
export const movesBaseData: {
  name: string;
  move_damage_class_id: 1 | 2 | 3;
  power: number | null;
  type: { name: PokemonType };
}[] = [
  {
    name: "pound",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "karate-chop",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "fighting",
    },
  },
  {
    name: "double-slap",
    move_damage_class_id: 2,
    power: 15,
    type: {
      name: "normal",
    },
  },
  {
    name: "comet-punch",
    move_damage_class_id: 2,
    power: 18,
    type: {
      name: "normal",
    },
  },
  {
    name: "mega-punch",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "pay-day",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "fire-punch",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "fire",
    },
  },
  {
    name: "ice-punch",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "ice",
    },
  },
  {
    name: "thunder-punch",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "electric",
    },
  },
  {
    name: "scratch",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "vice-grip",
    move_damage_class_id: 2,
    power: 55,
    type: {
      name: "normal",
    },
  },
  {
    name: "guillotine",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "razor-wind",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "swords-dance",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "cut",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "normal",
    },
  },
  {
    name: "gust",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "flying",
    },
  },
  {
    name: "wing-attack",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "flying",
    },
  },
  {
    name: "whirlwind",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "fly",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "flying",
    },
  },
  {
    name: "bind",
    move_damage_class_id: 2,
    power: 15,
    type: {
      name: "normal",
    },
  },
  {
    name: "slam",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "vine-whip",
    move_damage_class_id: 2,
    power: 45,
    type: {
      name: "grass",
    },
  },
  {
    name: "stomp",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "normal",
    },
  },
  {
    name: "double-kick",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "fighting",
    },
  },
  {
    name: "mega-kick",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "normal",
    },
  },
  {
    name: "jump-kick",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fighting",
    },
  },
  {
    name: "rolling-kick",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "fighting",
    },
  },
  {
    name: "sand-attack",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "headbutt",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "horn-attack",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "normal",
    },
  },
  {
    name: "fury-attack",
    move_damage_class_id: 2,
    power: 15,
    type: {
      name: "normal",
    },
  },
  {
    name: "horn-drill",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "tackle",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "body-slam",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "normal",
    },
  },
  {
    name: "wrap",
    move_damage_class_id: 2,
    power: 15,
    type: {
      name: "normal",
    },
  },
  {
    name: "take-down",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "normal",
    },
  },
  {
    name: "thrash",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "normal",
    },
  },
  {
    name: "double-edge",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "normal",
    },
  },
  {
    name: "tail-whip",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "poison-sting",
    move_damage_class_id: 2,
    power: 15,
    type: {
      name: "poison",
    },
  },
  {
    name: "twineedle",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "bug",
    },
  },
  {
    name: "pin-missile",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "bug",
    },
  },
  {
    name: "leer",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "bite",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "dark",
    },
  },
  {
    name: "growl",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "roar",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "sing",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "supersonic",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "sonic-boom",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "disable",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "acid",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "poison",
    },
  },
  {
    name: "ember",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "fire",
    },
  },
  {
    name: "flamethrower",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "fire",
    },
  },
  {
    name: "mist",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ice",
    },
  },
  {
    name: "water-gun",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "water",
    },
  },
  {
    name: "hydro-pump",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "water",
    },
  },
  {
    name: "surf",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "water",
    },
  },
  {
    name: "ice-beam",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "ice",
    },
  },
  {
    name: "blizzard",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "ice",
    },
  },
  {
    name: "psybeam",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "psychic",
    },
  },
  {
    name: "bubble-beam",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "water",
    },
  },
  {
    name: "aurora-beam",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "ice",
    },
  },
  {
    name: "hyper-beam",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "normal",
    },
  },
  {
    name: "peck",
    move_damage_class_id: 2,
    power: 35,
    type: {
      name: "flying",
    },
  },
  {
    name: "drill-peck",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "flying",
    },
  },
  {
    name: "submission",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "fighting",
    },
  },
  {
    name: "low-kick",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "counter",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "seismic-toss",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "strength",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "absorb",
    move_damage_class_id: 3,
    power: 20,
    type: {
      name: "grass",
    },
  },
  {
    name: "mega-drain",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "grass",
    },
  },
  {
    name: "leech-seed",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "growth",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "razor-leaf",
    move_damage_class_id: 2,
    power: 55,
    type: {
      name: "grass",
    },
  },
  {
    name: "solar-beam",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "grass",
    },
  },
  {
    name: "poison-powder",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "stun-spore",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "sleep-powder",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "petal-dance",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "grass",
    },
  },
  {
    name: "string-shot",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "dragon-rage",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "dragon",
    },
  },
  {
    name: "fire-spin",
    move_damage_class_id: 3,
    power: 35,
    type: {
      name: "fire",
    },
  },
  {
    name: "thunder-shock",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "electric",
    },
  },
  {
    name: "thunderbolt",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "electric",
    },
  },
  {
    name: "thunder-wave",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "thunder",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "electric",
    },
  },
  {
    name: "rock-throw",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "rock",
    },
  },
  {
    name: "earthquake",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "ground",
    },
  },
  {
    name: "fissure",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "dig",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "ground",
    },
  },
  {
    name: "toxic",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "confusion",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "psychic",
    },
  },
  {
    name: "psychic",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "psychic",
    },
  },
  {
    name: "hypnosis",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "meditate",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "agility",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "quick-attack",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "rage",
    move_damage_class_id: 2,
    power: 20,
    type: {
      name: "normal",
    },
  },
  {
    name: "teleport",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "night-shade",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "mimic",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "screech",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "double-team",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "recover",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "harden",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "minimize",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "smokescreen",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "confuse-ray",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "withdraw",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "defense-curl",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "barrier",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "light-screen",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "haze",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ice",
    },
  },
  {
    name: "reflect",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "focus-energy",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "bide",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "metronome",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "mirror-move",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "flying",
    },
  },
  {
    name: "self-destruct",
    move_damage_class_id: 2,
    power: 200,
    type: {
      name: "normal",
    },
  },
  {
    name: "egg-bomb",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "normal",
    },
  },
  {
    name: "lick",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "ghost",
    },
  },
  {
    name: "smog",
    move_damage_class_id: 3,
    power: 30,
    type: {
      name: "poison",
    },
  },
  {
    name: "sludge",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "poison",
    },
  },
  {
    name: "bone-club",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "ground",
    },
  },
  {
    name: "fire-blast",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "fire",
    },
  },
  {
    name: "waterfall",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "water",
    },
  },
  {
    name: "clamp",
    move_damage_class_id: 2,
    power: 35,
    type: {
      name: "water",
    },
  },
  {
    name: "swift",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "normal",
    },
  },
  {
    name: "skull-bash",
    move_damage_class_id: 2,
    power: 130,
    type: {
      name: "normal",
    },
  },
  {
    name: "spike-cannon",
    move_damage_class_id: 2,
    power: 20,
    type: {
      name: "normal",
    },
  },
  {
    name: "constrict",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "normal",
    },
  },
  {
    name: "amnesia",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "kinesis",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "soft-boiled",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "high-jump-kick",
    move_damage_class_id: 2,
    power: 130,
    type: {
      name: "fighting",
    },
  },
  {
    name: "glare",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "dream-eater",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "psychic",
    },
  },
  {
    name: "poison-gas",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "barrage",
    move_damage_class_id: 2,
    power: 15,
    type: {
      name: "normal",
    },
  },
  {
    name: "leech-life",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "bug",
    },
  },
  {
    name: "lovely-kiss",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "sky-attack",
    move_damage_class_id: 2,
    power: 140,
    type: {
      name: "flying",
    },
  },
  {
    name: "transform",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "bubble",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "water",
    },
  },
  {
    name: "dizzy-punch",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "spore",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "flash",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "psywave",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "splash",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "acid-armor",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "crabhammer",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "water",
    },
  },
  {
    name: "explosion",
    move_damage_class_id: 2,
    power: 250,
    type: {
      name: "normal",
    },
  },
  {
    name: "fury-swipes",
    move_damage_class_id: 2,
    power: 18,
    type: {
      name: "normal",
    },
  },
  {
    name: "bonemerang",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "ground",
    },
  },
  {
    name: "rest",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "rock-slide",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "rock",
    },
  },
  {
    name: "hyper-fang",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "sharpen",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "conversion",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "tri-attack",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "super-fang",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "slash",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "substitute",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "struggle",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "normal",
    },
  },
  {
    name: "sketch",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "triple-kick",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "fighting",
    },
  },
  {
    name: "thief",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "dark",
    },
  },
  {
    name: "spider-web",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "mind-reader",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "nightmare",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "flame-wheel",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "fire",
    },
  },
  {
    name: "snore",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "normal",
    },
  },
  {
    name: "curse",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "flail",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "conversion-2",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "aeroblast",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "flying",
    },
  },
  {
    name: "cotton-spore",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "reversal",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "spite",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "powder-snow",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "ice",
    },
  },
  {
    name: "protect",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "mach-punch",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "fighting",
    },
  },
  {
    name: "scary-face",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "feint-attack",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "dark",
    },
  },
  {
    name: "sweet-kiss",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "belly-drum",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "sludge-bomb",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "poison",
    },
  },
  {
    name: "mud-slap",
    move_damage_class_id: 3,
    power: 20,
    type: {
      name: "ground",
    },
  },
  {
    name: "octazooka",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "water",
    },
  },
  {
    name: "spikes",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "zap-cannon",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "electric",
    },
  },
  {
    name: "foresight",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "destiny-bond",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "perish-song",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "icy-wind",
    move_damage_class_id: 3,
    power: 55,
    type: {
      name: "ice",
    },
  },
  {
    name: "detect",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "bone-rush",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "ground",
    },
  },
  {
    name: "lock-on",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "outrage",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "dragon",
    },
  },
  {
    name: "sandstorm",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "rock",
    },
  },
  {
    name: "giga-drain",
    move_damage_class_id: 3,
    power: 75,
    type: {
      name: "grass",
    },
  },
  {
    name: "endure",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "charm",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "rollout",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "rock",
    },
  },
  {
    name: "false-swipe",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "swagger",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "milk-drink",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "spark",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "electric",
    },
  },
  {
    name: "fury-cutter",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "bug",
    },
  },
  {
    name: "steel-wing",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "steel",
    },
  },
  {
    name: "mean-look",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "attract",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "sleep-talk",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "heal-bell",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "return",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "present",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "frustration",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "safeguard",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "pain-split",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "sacred-fire",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fire",
    },
  },
  {
    name: "magnitude",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "dynamic-punch",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fighting",
    },
  },
  {
    name: "megahorn",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "bug",
    },
  },
  {
    name: "dragon-breath",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "dragon",
    },
  },
  {
    name: "baton-pass",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "encore",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "pursuit",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "dark",
    },
  },
  {
    name: "rapid-spin",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "normal",
    },
  },
  {
    name: "sweet-scent",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "iron-tail",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "steel",
    },
  },
  {
    name: "metal-claw",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "steel",
    },
  },
  {
    name: "vital-throw",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "fighting",
    },
  },
  {
    name: "morning-sun",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "synthesis",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "moonlight",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "hidden-power",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "normal",
    },
  },
  {
    name: "cross-chop",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fighting",
    },
  },
  {
    name: "twister",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "dragon",
    },
  },
  {
    name: "rain-dance",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "sunny-day",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fire",
    },
  },
  {
    name: "crunch",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "dark",
    },
  },
  {
    name: "mirror-coat",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "psych-up",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "extreme-speed",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "ancient-power",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "rock",
    },
  },
  {
    name: "shadow-ball",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "ghost",
    },
  },
  {
    name: "future-sight",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "psychic",
    },
  },
  {
    name: "rock-smash",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "fighting",
    },
  },
  {
    name: "whirlpool",
    move_damage_class_id: 3,
    power: 35,
    type: {
      name: "water",
    },
  },
  {
    name: "beat-up",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "fake-out",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "uproar",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "normal",
    },
  },
  {
    name: "stockpile",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "spit-up",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "swallow",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "heat-wave",
    move_damage_class_id: 3,
    power: 95,
    type: {
      name: "fire",
    },
  },
  {
    name: "hail",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ice",
    },
  },
  {
    name: "torment",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "flatter",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "will-o-wisp",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fire",
    },
  },
  {
    name: "memento",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "facade",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "focus-punch",
    move_damage_class_id: 2,
    power: 150,
    type: {
      name: "fighting",
    },
  },
  {
    name: "smelling-salts",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "follow-me",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "nature-power",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "charge",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "taunt",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "helping-hand",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "trick",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "role-play",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "wish",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "assist",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "ingrain",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "superpower",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "fighting",
    },
  },
  {
    name: "magic-coat",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "recycle",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "revenge",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "fighting",
    },
  },
  {
    name: "brick-break",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "fighting",
    },
  },
  {
    name: "yawn",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "knock-off",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "dark",
    },
  },
  {
    name: "endeavor",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "eruption",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "fire",
    },
  },
  {
    name: "skill-swap",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "imprison",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "refresh",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "grudge",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "snatch",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "secret-power",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "dive",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "water",
    },
  },
  {
    name: "arm-thrust",
    move_damage_class_id: 2,
    power: 15,
    type: {
      name: "fighting",
    },
  },
  {
    name: "camouflage",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "tail-glow",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "luster-purge",
    move_damage_class_id: 3,
    power: 95,
    type: {
      name: "psychic",
    },
  },
  {
    name: "mist-ball",
    move_damage_class_id: 3,
    power: 95,
    type: {
      name: "psychic",
    },
  },
  {
    name: "feather-dance",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "flying",
    },
  },
  {
    name: "teeter-dance",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "blaze-kick",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "fire",
    },
  },
  {
    name: "mud-sport",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "ice-ball",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "ice",
    },
  },
  {
    name: "needle-arm",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "grass",
    },
  },
  {
    name: "slack-off",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "hyper-voice",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "normal",
    },
  },
  {
    name: "poison-fang",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "poison",
    },
  },
  {
    name: "crush-claw",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "normal",
    },
  },
  {
    name: "blast-burn",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "fire",
    },
  },
  {
    name: "hydro-cannon",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "water",
    },
  },
  {
    name: "meteor-mash",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "steel",
    },
  },
  {
    name: "astonish",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "ghost",
    },
  },
  {
    name: "weather-ball",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "normal",
    },
  },
  {
    name: "aromatherapy",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "fake-tears",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "air-cutter",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "flying",
    },
  },
  {
    name: "overheat",
    move_damage_class_id: 3,
    power: 130,
    type: {
      name: "fire",
    },
  },
  {
    name: "odor-sleuth",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "rock-tomb",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "rock",
    },
  },
  {
    name: "silver-wind",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "bug",
    },
  },
  {
    name: "metal-sound",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "grass-whistle",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "tickle",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "cosmic-power",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "water-spout",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "water",
    },
  },
  {
    name: "signal-beam",
    move_damage_class_id: 3,
    power: 75,
    type: {
      name: "bug",
    },
  },
  {
    name: "shadow-punch",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "ghost",
    },
  },
  {
    name: "extrasensory",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "sky-uppercut",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "fighting",
    },
  },
  {
    name: "sand-tomb",
    move_damage_class_id: 2,
    power: 35,
    type: {
      name: "ground",
    },
  },
  {
    name: "sheer-cold",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "ice",
    },
  },
  {
    name: "muddy-water",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "water",
    },
  },
  {
    name: "bullet-seed",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "grass",
    },
  },
  {
    name: "aerial-ace",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "flying",
    },
  },
  {
    name: "icicle-spear",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "ice",
    },
  },
  {
    name: "iron-defense",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "block",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "howl",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "dragon-claw",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "dragon",
    },
  },
  {
    name: "frenzy-plant",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "grass",
    },
  },
  {
    name: "bulk-up",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "bounce",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "flying",
    },
  },
  {
    name: "mud-shot",
    move_damage_class_id: 3,
    power: 55,
    type: {
      name: "ground",
    },
  },
  {
    name: "poison-tail",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "poison",
    },
  },
  {
    name: "covet",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "normal",
    },
  },
  {
    name: "volt-tackle",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "electric",
    },
  },
  {
    name: "magical-leaf",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "grass",
    },
  },
  {
    name: "water-sport",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "calm-mind",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "leaf-blade",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "grass",
    },
  },
  {
    name: "dragon-dance",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dragon",
    },
  },
  {
    name: "rock-blast",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "rock",
    },
  },
  {
    name: "shock-wave",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "electric",
    },
  },
  {
    name: "water-pulse",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "water",
    },
  },
  {
    name: "doom-desire",
    move_damage_class_id: 3,
    power: 140,
    type: {
      name: "steel",
    },
  },
  {
    name: "psycho-boost",
    move_damage_class_id: 3,
    power: 140,
    type: {
      name: "psychic",
    },
  },
  {
    name: "roost",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "flying",
    },
  },
  {
    name: "gravity",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "miracle-eye",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "wake-up-slap",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "fighting",
    },
  },
  {
    name: "hammer-arm",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fighting",
    },
  },
  {
    name: "gyro-ball",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "healing-wish",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "brine",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "water",
    },
  },
  {
    name: "natural-gift",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "feint",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "normal",
    },
  },
  {
    name: "pluck",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "flying",
    },
  },
  {
    name: "tailwind",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "flying",
    },
  },
  {
    name: "acupressure",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "metal-burst",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "u-turn",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "bug",
    },
  },
  {
    name: "close-combat",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "fighting",
    },
  },
  {
    name: "payback",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "dark",
    },
  },
  {
    name: "assurance",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "dark",
    },
  },
  {
    name: "embargo",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "fling",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "psycho-shift",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "trump-card",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "heal-block",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "wring-out",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "power-trick",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "gastro-acid",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "lucky-chant",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "me-first",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "copycat",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "power-swap",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "guard-swap",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "punishment",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "last-resort",
    move_damage_class_id: 2,
    power: 140,
    type: {
      name: "normal",
    },
  },
  {
    name: "worry-seed",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "sucker-punch",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "dark",
    },
  },
  {
    name: "toxic-spikes",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "heart-swap",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "aqua-ring",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "magnet-rise",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "flare-blitz",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "fire",
    },
  },
  {
    name: "force-palm",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "fighting",
    },
  },
  {
    name: "aura-sphere",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "fighting",
    },
  },
  {
    name: "rock-polish",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "rock",
    },
  },
  {
    name: "poison-jab",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "poison",
    },
  },
  {
    name: "dark-pulse",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "dark",
    },
  },
  {
    name: "night-slash",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "dark",
    },
  },
  {
    name: "aqua-tail",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "water",
    },
  },
  {
    name: "seed-bomb",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "grass",
    },
  },
  {
    name: "air-slash",
    move_damage_class_id: 3,
    power: 75,
    type: {
      name: "flying",
    },
  },
  {
    name: "x-scissor",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "bug",
    },
  },
  {
    name: "bug-buzz",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "bug",
    },
  },
  {
    name: "dragon-pulse",
    move_damage_class_id: 3,
    power: 85,
    type: {
      name: "dragon",
    },
  },
  {
    name: "dragon-rush",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "dragon",
    },
  },
  {
    name: "power-gem",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "rock",
    },
  },
  {
    name: "drain-punch",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "fighting",
    },
  },
  {
    name: "vacuum-wave",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "fighting",
    },
  },
  {
    name: "focus-blast",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "fighting",
    },
  },
  {
    name: "energy-ball",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "grass",
    },
  },
  {
    name: "brave-bird",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "flying",
    },
  },
  {
    name: "earth-power",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "ground",
    },
  },
  {
    name: "switcheroo",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "giga-impact",
    move_damage_class_id: 2,
    power: 150,
    type: {
      name: "normal",
    },
  },
  {
    name: "nasty-plot",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "bullet-punch",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "steel",
    },
  },
  {
    name: "avalanche",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "ice",
    },
  },
  {
    name: "ice-shard",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "ice",
    },
  },
  {
    name: "shadow-claw",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "ghost",
    },
  },
  {
    name: "thunder-fang",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "electric",
    },
  },
  {
    name: "ice-fang",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "ice",
    },
  },
  {
    name: "fire-fang",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "fire",
    },
  },
  {
    name: "shadow-sneak",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "ghost",
    },
  },
  {
    name: "mud-bomb",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "ground",
    },
  },
  {
    name: "psycho-cut",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "psychic",
    },
  },
  {
    name: "zen-headbutt",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "mirror-shot",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "steel",
    },
  },
  {
    name: "flash-cannon",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "steel",
    },
  },
  {
    name: "rock-climb",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "normal",
    },
  },
  {
    name: "defog",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "flying",
    },
  },
  {
    name: "trick-room",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "draco-meteor",
    move_damage_class_id: 3,
    power: 130,
    type: {
      name: "dragon",
    },
  },
  {
    name: "discharge",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "electric",
    },
  },
  {
    name: "lava-plume",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "fire",
    },
  },
  {
    name: "leaf-storm",
    move_damage_class_id: 3,
    power: 130,
    type: {
      name: "grass",
    },
  },
  {
    name: "power-whip",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "grass",
    },
  },
  {
    name: "rock-wrecker",
    move_damage_class_id: 2,
    power: 150,
    type: {
      name: "rock",
    },
  },
  {
    name: "cross-poison",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "poison",
    },
  },
  {
    name: "gunk-shot",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "poison",
    },
  },
  {
    name: "iron-head",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "steel",
    },
  },
  {
    name: "magnet-bomb",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "steel",
    },
  },
  {
    name: "stone-edge",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "rock",
    },
  },
  {
    name: "captivate",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "stealth-rock",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "rock",
    },
  },
  {
    name: "grass-knot",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "chatter",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "flying",
    },
  },
  {
    name: "judgment",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "normal",
    },
  },
  {
    name: "bug-bite",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "bug",
    },
  },
  {
    name: "charge-beam",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "electric",
    },
  },
  {
    name: "wood-hammer",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "grass",
    },
  },
  {
    name: "aqua-jet",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "water",
    },
  },
  {
    name: "attack-order",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "bug",
    },
  },
  {
    name: "defend-order",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "heal-order",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "head-smash",
    move_damage_class_id: 2,
    power: 150,
    type: {
      name: "rock",
    },
  },
  {
    name: "double-hit",
    move_damage_class_id: 2,
    power: 35,
    type: {
      name: "normal",
    },
  },
  {
    name: "roar-of-time",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "dragon",
    },
  },
  {
    name: "spacial-rend",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "dragon",
    },
  },
  {
    name: "lunar-dance",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "crush-grip",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "magma-storm",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "fire",
    },
  },
  {
    name: "dark-void",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "seed-flare",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "grass",
    },
  },
  {
    name: "ominous-wind",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "ghost",
    },
  },
  {
    name: "shadow-force",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "ghost",
    },
  },
  {
    name: "hone-claws",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "wide-guard",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "rock",
    },
  },
  {
    name: "guard-split",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "power-split",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "wonder-room",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "psyshock",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "venoshock",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "poison",
    },
  },
  {
    name: "autotomize",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "rage-powder",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "telekinesis",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "magic-room",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "smack-down",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "rock",
    },
  },
  {
    name: "storm-throw",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "fighting",
    },
  },
  {
    name: "flame-burst",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "fire",
    },
  },
  {
    name: "sludge-wave",
    move_damage_class_id: 3,
    power: 95,
    type: {
      name: "poison",
    },
  },
  {
    name: "quiver-dance",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "heavy-slam",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "synchronoise",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "psychic",
    },
  },
  {
    name: "electro-ball",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "soak",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "flame-charge",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "fire",
    },
  },
  {
    name: "coil",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "low-sweep",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "fighting",
    },
  },
  {
    name: "acid-spray",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "poison",
    },
  },
  {
    name: "foul-play",
    move_damage_class_id: 2,
    power: 95,
    type: {
      name: "dark",
    },
  },
  {
    name: "simple-beam",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "entrainment",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "after-you",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "round",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "normal",
    },
  },
  {
    name: "echoed-voice",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "chip-away",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "clear-smog",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "poison",
    },
  },
  {
    name: "stored-power",
    move_damage_class_id: 3,
    power: 20,
    type: {
      name: "psychic",
    },
  },
  {
    name: "quick-guard",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "ally-switch",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "scald",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "water",
    },
  },
  {
    name: "shell-smash",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "heal-pulse",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "hex",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "ghost",
    },
  },
  {
    name: "sky-drop",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "flying",
    },
  },
  {
    name: "shift-gear",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "circle-throw",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "fighting",
    },
  },
  {
    name: "incinerate",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "fire",
    },
  },
  {
    name: "quash",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "acrobatics",
    move_damage_class_id: 2,
    power: 55,
    type: {
      name: "flying",
    },
  },
  {
    name: "reflect-type",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "retaliate",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "normal",
    },
  },
  {
    name: "final-gambit",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "bestow",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "inferno",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "fire",
    },
  },
  {
    name: "water-pledge",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "water",
    },
  },
  {
    name: "fire-pledge",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "fire",
    },
  },
  {
    name: "grass-pledge",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "grass",
    },
  },
  {
    name: "volt-switch",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "electric",
    },
  },
  {
    name: "struggle-bug",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "bug",
    },
  },
  {
    name: "bulldoze",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "ground",
    },
  },
  {
    name: "frost-breath",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "ice",
    },
  },
  {
    name: "dragon-tail",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "dragon",
    },
  },
  {
    name: "work-up",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "electroweb",
    move_damage_class_id: 3,
    power: 55,
    type: {
      name: "electric",
    },
  },
  {
    name: "wild-charge",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "electric",
    },
  },
  {
    name: "drill-run",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "ground",
    },
  },
  {
    name: "dual-chop",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "dragon",
    },
  },
  {
    name: "heart-stamp",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "psychic",
    },
  },
  {
    name: "horn-leech",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "grass",
    },
  },
  {
    name: "sacred-sword",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "fighting",
    },
  },
  {
    name: "razor-shell",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "water",
    },
  },
  {
    name: "heat-crash",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fire",
    },
  },
  {
    name: "leaf-tornado",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "grass",
    },
  },
  {
    name: "steamroller",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "bug",
    },
  },
  {
    name: "cotton-guard",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "night-daze",
    move_damage_class_id: 3,
    power: 85,
    type: {
      name: "dark",
    },
  },
  {
    name: "psystrike",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "psychic",
    },
  },
  {
    name: "tail-slap",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "normal",
    },
  },
  {
    name: "hurricane",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "flying",
    },
  },
  {
    name: "head-charge",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "normal",
    },
  },
  {
    name: "gear-grind",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "steel",
    },
  },
  {
    name: "searing-shot",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "fire",
    },
  },
  {
    name: "techno-blast",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "normal",
    },
  },
  {
    name: "relic-song",
    move_damage_class_id: 3,
    power: 75,
    type: {
      name: "normal",
    },
  },
  {
    name: "secret-sword",
    move_damage_class_id: 3,
    power: 85,
    type: {
      name: "fighting",
    },
  },
  {
    name: "glaciate",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "ice",
    },
  },
  {
    name: "bolt-strike",
    move_damage_class_id: 2,
    power: 130,
    type: {
      name: "electric",
    },
  },
  {
    name: "blue-flare",
    move_damage_class_id: 3,
    power: 130,
    type: {
      name: "fire",
    },
  },
  {
    name: "fiery-dance",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "fire",
    },
  },
  {
    name: "freeze-shock",
    move_damage_class_id: 2,
    power: 140,
    type: {
      name: "ice",
    },
  },
  {
    name: "ice-burn",
    move_damage_class_id: 3,
    power: 140,
    type: {
      name: "ice",
    },
  },
  {
    name: "snarl",
    move_damage_class_id: 3,
    power: 55,
    type: {
      name: "dark",
    },
  },
  {
    name: "icicle-crash",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "ice",
    },
  },
  {
    name: "v-create",
    move_damage_class_id: 2,
    power: 180,
    type: {
      name: "fire",
    },
  },
  {
    name: "fusion-flare",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "fire",
    },
  },
  {
    name: "fusion-bolt",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "electric",
    },
  },
  {
    name: "flying-press",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fighting",
    },
  },
  {
    name: "mat-block",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "belch",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "poison",
    },
  },
  {
    name: "rototiller",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "sticky-web",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "fell-stinger",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "bug",
    },
  },
  {
    name: "phantom-force",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "ghost",
    },
  },
  {
    name: "trick-or-treat",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "noble-roar",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "ion-deluge",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "parabolic-charge",
    move_damage_class_id: 3,
    power: 65,
    type: {
      name: "electric",
    },
  },
  {
    name: "forests-curse",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "petal-blizzard",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "grass",
    },
  },
  {
    name: "freeze-dry",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "ice",
    },
  },
  {
    name: "disarming-voice",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "fairy",
    },
  },
  {
    name: "parting-shot",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "topsy-turvy",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "draining-kiss",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "fairy",
    },
  },
  {
    name: "crafty-shield",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "flower-shield",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "grassy-terrain",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "misty-terrain",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "electrify",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "play-rough",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "fairy",
    },
  },
  {
    name: "fairy-wind",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "fairy",
    },
  },
  {
    name: "moonblast",
    move_damage_class_id: 3,
    power: 95,
    type: {
      name: "fairy",
    },
  },
  {
    name: "boomburst",
    move_damage_class_id: 3,
    power: 140,
    type: {
      name: "normal",
    },
  },
  {
    name: "fairy-lock",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "kings-shield",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "play-nice",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "confide",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "diamond-storm",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "rock",
    },
  },
  {
    name: "steam-eruption",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "water",
    },
  },
  {
    name: "hyperspace-hole",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "water-shuriken",
    move_damage_class_id: 3,
    power: 15,
    type: {
      name: "water",
    },
  },
  {
    name: "mystical-fire",
    move_damage_class_id: 3,
    power: 75,
    type: {
      name: "fire",
    },
  },
  {
    name: "spiky-shield",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "aromatic-mist",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "eerie-impulse",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "venom-drench",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "powder",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "geomancy",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "magnetic-flux",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "happy-hour",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "electric-terrain",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "dazzling-gleam",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "fairy",
    },
  },
  {
    name: "celebrate",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "hold-hands",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "baby-doll-eyes",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "nuzzle",
    move_damage_class_id: 2,
    power: 20,
    type: {
      name: "electric",
    },
  },
  {
    name: "hold-back",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "normal",
    },
  },
  {
    name: "infestation",
    move_damage_class_id: 3,
    power: 20,
    type: {
      name: "bug",
    },
  },
  {
    name: "power-up-punch",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "fighting",
    },
  },
  {
    name: "oblivion-wing",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "flying",
    },
  },
  {
    name: "thousand-arrows",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "ground",
    },
  },
  {
    name: "thousand-waves",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "ground",
    },
  },
  {
    name: "lands-wrath",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "ground",
    },
  },
  {
    name: "light-of-ruin",
    move_damage_class_id: 3,
    power: 140,
    type: {
      name: "fairy",
    },
  },
  {
    name: "origin-pulse",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "water",
    },
  },
  {
    name: "precipice-blades",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "ground",
    },
  },
  {
    name: "dragon-ascent",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "flying",
    },
  },
  {
    name: "hyperspace-fury",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "dark",
    },
  },
  {
    name: "breakneck-blitz--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "breakneck-blitz--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "all-out-pummeling--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "all-out-pummeling--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "supersonic-skystrike--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "flying",
    },
  },
  {
    name: "supersonic-skystrike--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "flying",
    },
  },
  {
    name: "acid-downpour--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "acid-downpour--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "tectonic-rage--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "tectonic-rage--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "continental-crush--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "rock",
    },
  },
  {
    name: "continental-crush--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "rock",
    },
  },
  {
    name: "savage-spin-out--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "savage-spin-out--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "bug",
    },
  },
  {
    name: "never-ending-nightmare--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "never-ending-nightmare--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "ghost",
    },
  },
  {
    name: "corkscrew-crash--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "corkscrew-crash--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "inferno-overdrive--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fire",
    },
  },
  {
    name: "inferno-overdrive--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "fire",
    },
  },
  {
    name: "hydro-vortex--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "hydro-vortex--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "bloom-doom--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "bloom-doom--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "gigavolt-havoc--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "gigavolt-havoc--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "shattered-psyche--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "shattered-psyche--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "subzero-slammer--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "ice",
    },
  },
  {
    name: "subzero-slammer--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "ice",
    },
  },
  {
    name: "devastating-drake--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "dragon",
    },
  },
  {
    name: "devastating-drake--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "dragon",
    },
  },
  {
    name: "black-hole-eclipse--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "black-hole-eclipse--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "twinkle-tackle--physical",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "twinkle-tackle--special",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "catastropika",
    move_damage_class_id: 2,
    power: 210,
    type: {
      name: "electric",
    },
  },
  {
    name: "shore-up",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ground",
    },
  },
  {
    name: "first-impression",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "bug",
    },
  },
  {
    name: "baneful-bunker",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "spirit-shackle",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "ghost",
    },
  },
  {
    name: "darkest-lariat",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "dark",
    },
  },
  {
    name: "sparkling-aria",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "water",
    },
  },
  {
    name: "ice-hammer",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "ice",
    },
  },
  {
    name: "floral-healing",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "high-horsepower",
    move_damage_class_id: 2,
    power: 95,
    type: {
      name: "ground",
    },
  },
  {
    name: "strength-sap",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "solar-blade",
    move_damage_class_id: 2,
    power: 125,
    type: {
      name: "grass",
    },
  },
  {
    name: "leafage",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "grass",
    },
  },
  {
    name: "spotlight",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "toxic-thread",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "laser-focus",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "gear-up",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "steel",
    },
  },
  {
    name: "throat-chop",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "dark",
    },
  },
  {
    name: "pollen-puff",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "bug",
    },
  },
  {
    name: "anchor-shot",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "steel",
    },
  },
  {
    name: "psychic-terrain",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "lunge",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "bug",
    },
  },
  {
    name: "fire-lash",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "fire",
    },
  },
  {
    name: "power-trip",
    move_damage_class_id: 2,
    power: 20,
    type: {
      name: "dark",
    },
  },
  {
    name: "burn-up",
    move_damage_class_id: 3,
    power: 130,
    type: {
      name: "fire",
    },
  },
  {
    name: "speed-swap",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "smart-strike",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "steel",
    },
  },
  {
    name: "purify",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "revelation-dance",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "normal",
    },
  },
  {
    name: "core-enforcer",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "dragon",
    },
  },
  {
    name: "trop-kick",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "grass",
    },
  },
  {
    name: "instruct",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "beak-blast",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "flying",
    },
  },
  {
    name: "clanging-scales",
    move_damage_class_id: 3,
    power: 110,
    type: {
      name: "dragon",
    },
  },
  {
    name: "dragon-hammer",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "dragon",
    },
  },
  {
    name: "brutal-swing",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "dark",
    },
  },
  {
    name: "aurora-veil",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "ice",
    },
  },
  {
    name: "sinister-arrow-raid",
    move_damage_class_id: 2,
    power: 180,
    type: {
      name: "ghost",
    },
  },
  {
    name: "malicious-moonsault",
    move_damage_class_id: 2,
    power: 180,
    type: {
      name: "dark",
    },
  },
  {
    name: "oceanic-operetta",
    move_damage_class_id: 3,
    power: 195,
    type: {
      name: "water",
    },
  },
  {
    name: "guardian-of-alola",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "soul-stealing-7-star-strike",
    move_damage_class_id: 2,
    power: 195,
    type: {
      name: "ghost",
    },
  },
  {
    name: "stoked-sparksurfer",
    move_damage_class_id: 3,
    power: 175,
    type: {
      name: "electric",
    },
  },
  {
    name: "pulverizing-pancake",
    move_damage_class_id: 2,
    power: 210,
    type: {
      name: "normal",
    },
  },
  {
    name: "extreme-evoboost",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "genesis-supernova",
    move_damage_class_id: 3,
    power: 185,
    type: {
      name: "psychic",
    },
  },
  {
    name: "shell-trap",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "fire",
    },
  },
  {
    name: "fleur-cannon",
    move_damage_class_id: 3,
    power: 130,
    type: {
      name: "fairy",
    },
  },
  {
    name: "psychic-fangs",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "psychic",
    },
  },
  {
    name: "stomping-tantrum",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "ground",
    },
  },
  {
    name: "shadow-bone",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "ghost",
    },
  },
  {
    name: "accelerock",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "rock",
    },
  },
  {
    name: "liquidation",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "water",
    },
  },
  {
    name: "prismatic-laser",
    move_damage_class_id: 3,
    power: 160,
    type: {
      name: "psychic",
    },
  },
  {
    name: "spectral-thief",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "ghost",
    },
  },
  {
    name: "sunsteel-strike",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "steel",
    },
  },
  {
    name: "moongeist-beam",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "ghost",
    },
  },
  {
    name: "tearful-look",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "zing-zap",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "electric",
    },
  },
  {
    name: "natures-madness",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "multi-attack",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "normal",
    },
  },
  {
    name: "10-000-000-volt-thunderbolt",
    move_damage_class_id: 3,
    power: 195,
    type: {
      name: "electric",
    },
  },
  {
    name: "mind-blown",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "fire",
    },
  },
  {
    name: "plasma-fists",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "electric",
    },
  },
  {
    name: "photon-geyser",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "psychic",
    },
  },
  {
    name: "light-that-burns-the-sky",
    move_damage_class_id: 3,
    power: 200,
    type: {
      name: "psychic",
    },
  },
  {
    name: "searing-sunraze-smash",
    move_damage_class_id: 2,
    power: 200,
    type: {
      name: "steel",
    },
  },
  {
    name: "menacing-moonraze-maelstrom",
    move_damage_class_id: 3,
    power: 200,
    type: {
      name: "ghost",
    },
  },
  {
    name: "lets-snuggle-forever",
    move_damage_class_id: 2,
    power: 190,
    type: {
      name: "fairy",
    },
  },
  {
    name: "splintered-stormshards",
    move_damage_class_id: 2,
    power: 190,
    type: {
      name: "rock",
    },
  },
  {
    name: "clangorous-soulblaze",
    move_damage_class_id: 3,
    power: 185,
    type: {
      name: "dragon",
    },
  },
  {
    name: "zippy-zap",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "electric",
    },
  },
  {
    name: "splishy-splash",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "water",
    },
  },
  {
    name: "floaty-fall",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "flying",
    },
  },
  {
    name: "pika-papow",
    move_damage_class_id: 3,
    power: null,
    type: {
      name: "electric",
    },
  },
  {
    name: "bouncy-bubble",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "water",
    },
  },
  {
    name: "buzzy-buzz",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "electric",
    },
  },
  {
    name: "sizzly-slide",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "fire",
    },
  },
  {
    name: "glitzy-glow",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "baddy-bad",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "dark",
    },
  },
  {
    name: "sappy-seed",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "grass",
    },
  },
  {
    name: "freezy-frost",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "ice",
    },
  },
  {
    name: "sparkly-swirl",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "fairy",
    },
  },
  {
    name: "veevee-volley",
    move_damage_class_id: 2,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "double-iron-bash",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "steel",
    },
  },
  {
    name: "max-guard",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "dynamax-cannon",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "dragon",
    },
  },
  {
    name: "snipe-shot",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "water",
    },
  },
  {
    name: "jaw-lock",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "dark",
    },
  },
  {
    name: "stuff-cheeks",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "no-retreat",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "tar-shot",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "rock",
    },
  },
  {
    name: "magic-powder",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "psychic",
    },
  },
  {
    name: "dragon-darts",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "dragon",
    },
  },
  {
    name: "teatime",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "octolock",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "bolt-beak",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "electric",
    },
  },
  {
    name: "fishious-rend",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "water",
    },
  },
  {
    name: "court-change",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "normal",
    },
  },
  {
    name: "max-flare",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fire",
    },
  },
  {
    name: "max-flutterby",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "bug",
    },
  },
  {
    name: "max-lightning",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "electric",
    },
  },
  {
    name: "max-strike",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "normal",
    },
  },
  {
    name: "max-knuckle",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "fighting",
    },
  },
  {
    name: "max-phantasm",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "ghost",
    },
  },
  {
    name: "max-hailstorm",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "ice",
    },
  },
  {
    name: "max-ooze",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "poison",
    },
  },
  {
    name: "max-geyser",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "water",
    },
  },
  {
    name: "max-airstream",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "flying",
    },
  },
  {
    name: "max-starfall",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "fairy",
    },
  },
  {
    name: "max-wyrmwind",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "dragon",
    },
  },
  {
    name: "max-mindstorm",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "psychic",
    },
  },
  {
    name: "max-rockfall",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "rock",
    },
  },
  {
    name: "max-quake",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "ground",
    },
  },
  {
    name: "max-darkness",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "dark",
    },
  },
  {
    name: "max-overgrowth",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "grass",
    },
  },
  {
    name: "max-steelspike",
    move_damage_class_id: 2,
    power: 10,
    type: {
      name: "steel",
    },
  },
  {
    name: "clangorous-soul",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dragon",
    },
  },
  {
    name: "body-press",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "fighting",
    },
  },
  {
    name: "decorate",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fairy",
    },
  },
  {
    name: "drum-beating",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "grass",
    },
  },
  {
    name: "snap-trap",
    move_damage_class_id: 2,
    power: 35,
    type: {
      name: "grass",
    },
  },
  {
    name: "pyro-ball",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "fire",
    },
  },
  {
    name: "behemoth-blade",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "steel",
    },
  },
  {
    name: "behemoth-bash",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "steel",
    },
  },
  {
    name: "aura-wheel",
    move_damage_class_id: 2,
    power: 110,
    type: {
      name: "electric",
    },
  },
  {
    name: "breaking-swipe",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "dragon",
    },
  },
  {
    name: "branch-poke",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "grass",
    },
  },
  {
    name: "overdrive",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "electric",
    },
  },
  {
    name: "apple-acid",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "grass",
    },
  },
  {
    name: "grav-apple",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "grass",
    },
  },
  {
    name: "spirit-break",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "fairy",
    },
  },
  {
    name: "strange-steam",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "fairy",
    },
  },
  {
    name: "life-dew",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "water",
    },
  },
  {
    name: "obstruct",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "dark",
    },
  },
  {
    name: "false-surrender",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "dark",
    },
  },
  {
    name: "meteor-assault",
    move_damage_class_id: 2,
    power: 150,
    type: {
      name: "fighting",
    },
  },
  {
    name: "eternabeam",
    move_damage_class_id: 3,
    power: 160,
    type: {
      name: "dragon",
    },
  },
  {
    name: "steel-beam",
    move_damage_class_id: 3,
    power: 140,
    type: {
      name: "steel",
    },
  },
  {
    name: "expanding-force",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "steel-roller",
    move_damage_class_id: 2,
    power: 130,
    type: {
      name: "steel",
    },
  },
  {
    name: "scale-shot",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "dragon",
    },
  },
  {
    name: "meteor-beam",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "rock",
    },
  },
  {
    name: "shell-side-arm",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "poison",
    },
  },
  {
    name: "misty-explosion",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "fairy",
    },
  },
  {
    name: "grassy-glide",
    move_damage_class_id: 2,
    power: 55,
    type: {
      name: "grass",
    },
  },
  {
    name: "rising-voltage",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "electric",
    },
  },
  {
    name: "terrain-pulse",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "normal",
    },
  },
  {
    name: "skitter-smack",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "bug",
    },
  },
  {
    name: "burning-jealousy",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "fire",
    },
  },
  {
    name: "lash-out",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "dark",
    },
  },
  {
    name: "poltergeist",
    move_damage_class_id: 2,
    power: 110,
    type: {
      name: "ghost",
    },
  },
  {
    name: "corrosive-gas",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "poison",
    },
  },
  {
    name: "coaching",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "fighting",
    },
  },
  {
    name: "flip-turn",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "water",
    },
  },
  {
    name: "triple-axel",
    move_damage_class_id: 2,
    power: 20,
    type: {
      name: "ice",
    },
  },
  {
    name: "dual-wingbeat",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "flying",
    },
  },
  {
    name: "scorching-sands",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "ground",
    },
  },
  {
    name: "jungle-healing",
    move_damage_class_id: 1,
    power: null,
    type: {
      name: "grass",
    },
  },
  {
    name: "wicked-blow",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "dark",
    },
  },
  {
    name: "surging-strikes",
    move_damage_class_id: 2,
    power: 25,
    type: {
      name: "water",
    },
  },
  {
    name: "thunder-cage",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "electric",
    },
  },
  {
    name: "dragon-energy",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "dragon",
    },
  },
  {
    name: "freezing-glare",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "psychic",
    },
  },
  {
    name: "fiery-wrath",
    move_damage_class_id: 3,
    power: 90,
    type: {
      name: "dark",
    },
  },
  {
    name: "thunderous-kick",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "fighting",
    },
  },
  {
    name: "glacial-lance",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "ice",
    },
  },
  {
    name: "astral-barrage",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "ghost",
    },
  },
  {
    name: "eerie-spell",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "dire-claw",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "poison",
    },
  },
  {
    name: "psyshield-bash",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "psychic",
    },
  },
  {
    name: "power-shift",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "normal",
    },
  },
  {
    name: "stone-axe",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "rock",
    },
  },
  {
    name: "springtide-storm",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "fairy",
    },
  },
  {
    name: "mystical-power",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "psychic",
    },
  },
  {
    name: "raging-fury",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "fire",
    },
  },
  {
    name: "wave-crash",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "water",
    },
  },
  {
    name: "chloroblast",
    move_damage_class_id: 3,
    power: 150,
    type: {
      name: "grass",
    },
  },
  {
    name: "mountain-gale",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "ice",
    },
  },
  {
    name: "victory-dance",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "fighting",
    },
  },
  {
    name: "headlong-rush",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "ground",
    },
  },
  {
    name: "barb-barrage",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "poison",
    },
  },
  {
    name: "esper-wing",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "bitter-malice",
    move_damage_class_id: 3,
    power: 75,
    type: {
      name: "ghost",
    },
  },
  {
    name: "shelter",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "steel",
    },
  },
  {
    name: "triple-arrows",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "fighting",
    },
  },
  {
    name: "infernal-parade",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "ghost",
    },
  },
  {
    name: "ceaseless-edge",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "dark",
    },
  },
  {
    name: "bleakwind-storm",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "flying",
    },
  },
  {
    name: "wildbolt-storm",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "electric",
    },
  },
  {
    name: "sandsear-storm",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "ground",
    },
  },
  {
    name: "lunar-blessing",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "psychic",
    },
  },
  {
    name: "take-heart",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "psychic",
    },
  },
  {
    name: "tera-blast",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "normal",
    },
  },
  {
    name: "silk-trap",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "bug",
    },
  },
  {
    name: "axe-kick",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "fighting",
    },
  },
  {
    name: "last-respects",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "ghost",
    },
  },
  {
    name: "lumina-crash",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "order-up",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "dragon",
    },
  },
  {
    name: "jet-punch",
    move_damage_class_id: 2,
    power: 60,
    type: {
      name: "water",
    },
  },
  {
    name: "spicy-extract",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "grass",
    },
  },
  {
    name: "spin-out",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "steel",
    },
  },
  {
    name: "population-bomb",
    move_damage_class_id: 2,
    power: 20,
    type: {
      name: "normal",
    },
  },
  {
    name: "ice-spinner",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "ice",
    },
  },
  {
    name: "glaive-rush",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "dragon",
    },
  },
  {
    name: "revival-blessing",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "normal",
    },
  },
  {
    name: "salt-cure",
    move_damage_class_id: 2,
    power: 40,
    type: {
      name: "rock",
    },
  },
  {
    name: "triple-dive",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "water",
    },
  },
  {
    name: "mortal-spin",
    move_damage_class_id: 2,
    power: 30,
    type: {
      name: "poison",
    },
  },
  {
    name: "doodle",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "normal",
    },
  },
  {
    name: "fillet-away",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "normal",
    },
  },
  {
    name: "kowtow-cleave",
    move_damage_class_id: 2,
    power: 85,
    type: {
      name: "dark",
    },
  },
  {
    name: "flower-trick",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "grass",
    },
  },
  {
    name: "torch-song",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "fire",
    },
  },
  {
    name: "aqua-step",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "water",
    },
  },
  {
    name: "raging-bull",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "normal",
    },
  },
  {
    name: "make-it-rain",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "steel",
    },
  },
  {
    name: "psyblade",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "psychic",
    },
  },
  {
    name: "hydro-steam",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "water",
    },
  },
  {
    name: "ruination",
    move_damage_class_id: 3,
    power: 1,
    type: {
      name: "dark",
    },
  },
  {
    name: "collision-course",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fighting",
    },
  },
  {
    name: "electro-drift",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "electric",
    },
  },
  {
    name: "shed-tail",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "normal",
    },
  },
  {
    name: "chilly-reception",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "ice",
    },
  },
  {
    name: "tidy-up",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "normal",
    },
  },
  {
    name: "snowscape",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "ice",
    },
  },
  {
    name: "pounce",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "bug",
    },
  },
  {
    name: "trailblaze",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "grass",
    },
  },
  {
    name: "chilling-water",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "water",
    },
  },
  {
    name: "hyper-drill",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "normal",
    },
  },
  {
    name: "twin-beam",
    move_damage_class_id: 3,
    power: 40,
    type: {
      name: "psychic",
    },
  },
  {
    name: "rage-fist",
    move_damage_class_id: 2,
    power: 50,
    type: {
      name: "ghost",
    },
  },
  {
    name: "armor-cannon",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "fire",
    },
  },
  {
    name: "bitter-blade",
    move_damage_class_id: 2,
    power: 90,
    type: {
      name: "fire",
    },
  },
  {
    name: "double-shock",
    move_damage_class_id: 2,
    power: 120,
    type: {
      name: "electric",
    },
  },
  {
    name: "gigaton-hammer",
    move_damage_class_id: 2,
    power: 160,
    type: {
      name: "steel",
    },
  },
  {
    name: "comeuppance",
    move_damage_class_id: 2,
    power: 1,
    type: {
      name: "dark",
    },
  },
  {
    name: "aqua-cutter",
    move_damage_class_id: 2,
    power: 70,
    type: {
      name: "water",
    },
  },
  {
    name: "blazing-torque",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "fire",
    },
  },
  {
    name: "wicked-torque",
    move_damage_class_id: 2,
    power: 80,
    type: {
      name: "dark",
    },
  },
  {
    name: "noxious-torque",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "poison",
    },
  },
  {
    name: "combat-torque",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fighting",
    },
  },
  {
    name: "magical-torque",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "fairy",
    },
  },
  {
    name: "blood-moon",
    move_damage_class_id: 3,
    power: 140,
    type: {
      name: "normal",
    },
  },
  {
    name: "matcha-gotcha",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "grass",
    },
  },
  {
    name: "syrup-bomb",
    move_damage_class_id: 3,
    power: 60,
    type: {
      name: "grass",
    },
  },
  {
    name: "ivy-cudgel",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "grass",
    },
  },
  {
    name: "electro-shot",
    move_damage_class_id: 3,
    power: 130,
    type: {
      name: "electric",
    },
  },
  {
    name: "tera-starstorm",
    move_damage_class_id: 3,
    power: 120,
    type: {
      name: "normal",
    },
  },
  {
    name: "fickle-beam",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "dragon",
    },
  },
  {
    name: "burning-bulwark",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "fire",
    },
  },
  {
    name: "thunderclap",
    move_damage_class_id: 3,
    power: 70,
    type: {
      name: "electric",
    },
  },
  {
    name: "mighty-cleave",
    move_damage_class_id: 2,
    power: 95,
    type: {
      name: "rock",
    },
  },
  {
    name: "tachyon-cutter",
    move_damage_class_id: 3,
    power: 50,
    type: {
      name: "steel",
    },
  },
  {
    name: "hard-press",
    move_damage_class_id: 2,
    power: 0,
    type: {
      name: "steel",
    },
  },
  {
    name: "dragon-cheer",
    move_damage_class_id: 1,
    power: 0,
    type: {
      name: "dragon",
    },
  },
  {
    name: "alluring-voice",
    move_damage_class_id: 3,
    power: 80,
    type: {
      name: "fairy",
    },
  },
  {
    name: "temper-flare",
    move_damage_class_id: 2,
    power: 75,
    type: {
      name: "fire",
    },
  },
  {
    name: "supercell-slam",
    move_damage_class_id: 2,
    power: 100,
    type: {
      name: "electric",
    },
  },
  {
    name: "psychic-noise",
    move_damage_class_id: 3,
    power: 75,
    type: {
      name: "psychic",
    },
  },
  {
    name: "upper-hand",
    move_damage_class_id: 2,
    power: 65,
    type: {
      name: "fighting",
    },
  },
  {
    name: "malignant-chain",
    move_damage_class_id: 3,
    power: 100,
    type: {
      name: "poison",
    },
  },
];
