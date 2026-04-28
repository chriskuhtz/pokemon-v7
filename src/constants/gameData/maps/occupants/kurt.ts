import { calculateLevelData } from "../../../../functions/calculateLevelData";
import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { OverworldTrainer } from "../../../../interfaces/Occupant";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";

export const clearingKurt: OverworldTrainer = {
  type: "TRAINER",
  team: (s) => {
    const highestXpOnTeam = getHighestXpOnTeam(s.pokemon);
    const { level } = calculateLevelData(highestXpOnTeam, "medium");

    const xpOfTeam = level * level * level;
    return [
      makeChallengerPokemon({ name: "drampa", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "electrode", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "exeggutor", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "steelix", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "sirfetchd", xp: xpOfTeam }),
      makeChallengerPokemon({ name: "slowbro", xp: xpOfTeam }),
    ];
  },
  battleTeamConfig: {
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
    assignGender: true,
    assignHeldItem: true,
  },
  orientation: "DOWN",
  x: 12,
  y: 7,
  unhandledMessage: [
    "Ahh, you finally made it",
    "I had a feeling you were worthy",
    "of the secret apricorn",
    "Now prove it in a battle",
  ],
  sprite: SpriteEnum["kurt"],
  id: "smith kurt",
  conditionFunction: (s) => !occupantHandled(s, "smith kurt"),
};
