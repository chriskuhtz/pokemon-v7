import { BattlePokemon } from "../interfaces/BattlePokemon";
import { MoveDto } from "../interfaces/Move";
import { MoveName } from "./movesCheckList";

export const struggle: MoveDto = {
  accuracy: 100,
  damage_class: {
    name: "physical",
    url: "https://pokeapi.co/api/v2/move-damage-class/2/",
  },
  effect_chance: null,
  effect_changes: [],
  effect_entries: [
    {
      effect:
        "Inflicts typeless regular damage.  User takes 1/4 its max HP in recoil.  Ignores accuracy and evasion modifiers.\n\nThis move is used automatically when a Pokémon cannot use any other move legally, e.g., due to having no PP remaining or being under the effect of both encore and torment at the same time.\n\nThis move’s recoil is not treated as recoil for the purposes of anything that affects recoil, such as the ability rock head.  It also is not prevented by magic guard.\n\nThis move cannot be copied by mimic, mirror move, or sketch, nor selected by assist or metronome, nor forced by encore.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      short_effect: "User takes 1/4 its max HP in recoil.",
    },
  ],
  flavor_text_entries: [
    {
      flavor_text: "Used only if all\nPP are exhausted.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
    },
  ],
  id: 165,
  machines: [],
  meta: {
    ailment: { name: "none", url: "https://pokeapi.co/api/v2/move-ailment/0/" },
    ailment_chance: 0,
    category: {
      name: "damage",
      url: "https://pokeapi.co/api/v2/move-category/0/",
    },
    crit_rate: 0,
    drain: -25,
    flinch_chance: 0,
    healing: 0,
    max_hits: null,
    max_turns: null,
    min_hits: null,
    min_turns: null,
    stat_chance: 0,
  },
  name: "struggle",
  power: 50,
  pp: 1,
  priority: 0,
  stat_changes: [],
  target: {
    name: "random-opponent",
  },
  type: { name: "normal" },
};

export const struggleMove: BattlePokemon["firstMove"] = {
  name: "struggle",
  usedPP: 0,
  data: struggle,
};

export const customMoves: Partial<Record<MoveName, MoveDto>> = {
  struggle: struggle,
};
