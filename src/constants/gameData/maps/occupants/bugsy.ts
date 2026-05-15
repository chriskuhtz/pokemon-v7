import { getHighestXpOnTeam } from "../../../../functions/getHighestXpOnTeam";
import { makeChallengerPokemon } from "../../../../functions/makeChallengerPokemon";
import { occupantHandled } from "../../../../functions/occupantHandled";
import {
  OverworldNpc,
  OverworldPokemon,
  OverworldTrainer,
} from "../../../../interfaces/Occupant";
import { SaveFile } from "../../../../interfaces/SaveFile";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";

export const bugsy: OverworldNpc = {
  type: "NPC",
  x: 27,
  y: 19,
  orientation: "LEFT",
  id: "bugsy",
  conditionFunction: (s) =>
    !!(s.mileStones.hasReportedBug && !occupantHandled(s, "bugsy")),
  sprite: SpriteEnum.bugsy,
  quest: "report a bug",
  unhandledMessage: [
    "Thank you for reporting a bug",
    "people like you make indie game development possible",
    "find me in orenji forest",
    "and we can have a battle",
  ],
};

export const bugsysScyther: OverworldPokemon = {
  type: "POKEMON",
  dialogue: ["scy scy"],
  x: 27,
  y: 20,
  orientation: "LEFT",
  dexId: 123,
  id: "bugsys-scyther",
  conditionFunction: (s) =>
    !!(s.mileStones.hasReportedBug && !occupantHandled(s, "bugsy")),
};

const bugsyTeam = (s: SaveFile) => {
  const xp = getHighestXpOnTeam(s.pokemon);
  const xpWithVariance = () => (0.7 + Math.random() * 0.3) * xp;
  return [
    makeChallengerPokemon({
      name: "scizor",
      xp: xpWithVariance(),
      heldItemName: "quick-claw",
      ability: "technician",
      fixedAbility: true,
    }),
    makeChallengerPokemon({
      name: "pinsir",
      xp: xpWithVariance(),
    }),
    makeChallengerPokemon({
      name: "heracross",
      xp: xpWithVariance(),
      heldItemName: "hard-stone",
    }),
    makeChallengerPokemon({
      name: "volcarona",
      xp: xpWithVariance(),
      heldItemName: "charcoal",
    }),
    makeChallengerPokemon({
      name: "scolipede",
      xp: xpWithVariance(),
      heldItemName: "sitrus-berry",
    }),
  ];
};
export const bugsyId = "Gym Leader Bugsy";
export const trainerBugsy: OverworldTrainer = {
  x: 27,
  y: 11,
  orientation: "DOWN",
  unhandledMessage: ["No One can fix this bug"],
  type: "TRAINER",
  id: bugsyId,
  conditionFunction: (s) =>
    s.quests["defeat bugsy"] === "ACTIVE" && !occupantHandled(s, bugsyId),
  team: bugsyTeam,
  sprite: SpriteEnum.bugsy,
  profilePicture:
    "https://archives.bulbagarden.net/media/upload/2/2a/VSBugsy.png",
  battleTeamConfig: {
    assignGender: true,
    assignHeldItem: false,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  },
};
