import { ONE_HOUR } from "../constants/baseConstants";
import { mapsRecord } from "../constants/gameData/maps/mapsRecord";
import { OverworldTrainer } from "../interfaces/Occupant";
import { PokemonType } from "../interfaces/PokemonType";
import { SaveFile, StaticTrainer } from "../interfaces/SaveFile";
import { SpriteEnum } from "../interfaces/SpriteEnum";
import { getHighestXpOnTeam } from "./getHighestXpOnTeam";
import { getRandomOrientation } from "./getNextClockwiseDirection";
import { getRandomAvailableRoute } from "./getRandomAvailableRoute";
import { getRandomPokemonType } from "./getRandomPokemonId";
import { getRandomPosition } from "./getRandomPosition";
import { makeRandomTeam } from "./makeRandomTeam";
import { occupantHandled } from "./occupantHandled";

export const trainerPresets: Record<
  PokemonType,
  { unhandledMessage: string[]; sprite: string; name: string }
> = {
  water: {
    sprite: SpriteEnum.sailor,
    unhandledMessage: ["My team and I are making a splash!"],
    name: "Sailor Thornton",
  },
  fire: {
    sprite: SpriteEnum.funky,
    unhandledMessage: [
      "Feel the burning passion!",
      "My flames are unstoppable!",
    ],
    name: "Blaze Breaker",
  },
  grass: {
    sprite: SpriteEnum.lass,
    unhandledMessage: [
      "My pokemon are one with nature!",
      "Let's grow together!",
    ],
    name: "Nature Girl Mia",
  },
  electric: {
    sprite: SpriteEnum.mechanic,
    unhandledMessage: ["Ready to shock you!", "Feel the electric power!"],
    name: "georg ohm",
  },
  ghost: {
    sprite: SpriteEnum.possessed,
    unhandledMessage: ["Have you seen a ghost?", "The shadows whisper..."],
    name: "Possessed Grandma",
  },
  dark: {
    sprite: SpriteEnum.gangster,
    unhandledMessage: ["In darkness we trust!", "Embrace the shadows!"],
    name: "Shifty Stan",
  },
  psychic: {
    sprite: SpriteEnum.psychic,
    unhandledMessage: ["I sense your thoughts...", "The future is clear to me"],
    name: "Seer Sylvia",
  },
  rock: {
    sprite: SpriteEnum.hiker,
    unhandledMessage: ["Solid as a rock!", "My pokemon are tough as stone!"],
    name: "Hiker Rodrigo",
  },
  ground: {
    sprite: SpriteEnum.explorer,
    unhandledMessage: ["Stay grounded!", "Earth beats fire every time!"],
    name: "Explorer Mitch",
  },
  steel: {
    sprite: SpriteEnum.builder,
    unhandledMessage: ["Built to last!", "My pokemon are ironclad!"],
    name: "Steely Dan",
  },
  ice: {
    sprite: SpriteEnum.earmuffs,
    unhandledMessage: ["Chill out!", "Frozen solid!"],
    name: "Frosty Frank",
  },
  dragon: {
    sprite: SpriteEnum.dame,
    unhandledMessage: [
      "Dragons never surrender!",
      "Ancient power flows through me!",
    ],
    name: "Ms. Drake",
  },
  fighting: {
    sprite: SpriteEnum.karateMale,
    unhandledMessage: ["Strike First", "Strike Hard", "No Mercy"],
    name: "Johnny Lawrence",
  },
  flying: {
    sprite: SpriteEnum.aceMale,
    unhandledMessage: ["Soar through the skies!", "The wind guides us!"],
    name: "The Hawk",
  },
  poison: {
    sprite: SpriteEnum.baldy,
    unhandledMessage: ["Deadly to the core!", "One drop is all it takes..."],
    name: "Filthy Frank",
  },
  bug: {
    sprite: SpriteEnum.bugCatcher,
    unhandledMessage: ["Bugging out!", "My pokemon are endless in number!"],
    name: "Bug Catcher Peter",
  },
  fairy: {
    sprite: SpriteEnum.beauty1,
    unhandledMessage: ["Magical and cute!", "Sparkle and shine!"],
    name: "Fairy Faye",
  },
  normal: {
    sprite: SpriteEnum.trackSuit,
    unhandledMessage: [
      "Just a normal battle!",
      "Nothing special, just pokemon!",
    ],
    name: "Normal Nate",
  },
  typeless: {
    sprite: SpriteEnum.gentleman,
    unhandledMessage: ["very good...", "we shell battle, indeed"],
    name: "Alfred",
  },
};

export const makeOverworldTrainerfromStaticTrainer = (
  staticTrainer: StaticTrainer,
): OverworldTrainer => {
  return {
    type: "TRAINER",
    conditionFunction: (s) => !occupantHandled(s, staticTrainer.id),
    team: () =>
      makeRandomTeam({
        xp: staticTrainer.xp,
        type: staticTrainer.pokemonType,
      }),
    battleTeamConfig: {
      assignLearnsetMoves: true,
      assignNaturalAbility: true,
      assignGender: true,
      assignHeldItem: true,
    },
    ...staticTrainer,
    ...trainerPresets[staticTrainer.pokemonType],
  };
};

export const addStaticTrainerToSaveFile = (s: SaveFile): SaveFile => {
  const updated = { ...s };

  const route = getRandomAvailableRoute(s, []);

  if (!route) {
    console.error("could not find available route to place static encounter");
    return updated;
  }

  const pokemonType = getRandomPokemonType();
  const { x, y } = getRandomPosition(mapsRecord[route]);
  const now = new Date().getTime();
  const staticTrainer: StaticTrainer = {
    id: trainerPresets[pokemonType].name,
    pokemonType,
    mapId: route,
    x,
    y,
    resetAt: now + ONE_HOUR * 1,
    xp: Math.floor(getHighestXpOnTeam(s.pokemon) * 0.9),
    orientation: getRandomOrientation(),
  };

  return {
    ...updated,
    randomTrainers: [...(updated.randomTrainers ?? []), staticTrainer],
  };
};
