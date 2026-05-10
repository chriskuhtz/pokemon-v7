import {
  Occupant,
  OverworldNpc,
  TeleporterNpc,
} from "../../../../interfaces/Occupant";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";

const lookerNpcBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 15,
  y: 16,
  orientation: "DOWN",
  type: "NPC",
  sprite: SpriteEnum.looker,
};
const lookerTeleporterBase: Omit<
  TeleporterNpc,
  "dialogue" | "conditionFunction" | "id" | "to"
> = {
  x: 15,
  y: 16,
  orientation: "DOWN",
  type: "TELEPORTER_NPC",
  sprite: SpriteEnum.looker,
};
export const lookerLine: Occupant[] = [
  {
    ...lookerNpcBase,
    id: "looker_npc_1",
    unhandledMessage: [
      "Ah, so you are the new ranger",
      "My name is Looker",
      "i work for the Pokemon Police",
      "For now, you can use the ranger radar",
      "to scan the nearby routes.",
      "After some successful missions",
      "I will have more challenging tasks for you",
    ],
    conditionFunction: (s) =>
      s.campUpgrades["ranger certification"] &&
      s.quests["clear out the rocket camp"] === "INACTIVE" &&
      (s.rangerLevel ?? 0) <= 2,
  },
  {
    ...lookerNpcBase,
    id: "looker_npc_2",
    orientation: "UP",
    unhandledMessage: [
      "Ranger",
      "I could use your assistance",
      "I have found a team rocket hideout in this area",
      "will you help me defeat them?",
      "Let me know when you are ready",
    ],
    quest: "clear out the rocket camp",
    conditionFunction: (s) =>
      s.quests["clear out the rocket camp"] === "INACTIVE" &&
      (s.rangerLevel ?? 0) > 2,
  },
  {
    ...lookerTeleporterBase,
    id: "looker_router_1",
    dialogue: ["lets go", "i hope you prepared for a fight"],
    to: {
      mapId: "rocketCamp",
      x: 11,
      y: 19,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
    conditionFunction: (s) =>
      s.quests["clear out the rocket camp"] === "ACTIVE",
  },
  {
    ...lookerNpcBase,
    id: "looker_npc_3",
    orientation: "UP",
    unhandledMessage: [
      "Ranger, i have a new mission",
      "There are reports that",
      "team galactic is looking for something",
      "in ilex forest, in the johto region",
      "Please assess the situation",
      "here is your dragonite ticket",
    ],
    gifts: { "ilex-ticket": 1 },
    quest: "defeat team galactic in ilex forest",
    conditionFunction: (s) =>
      s.campUpgrades["dragonite taxi"] &&
      s.quests["clear out the rocket camp"] === "FULFILLED" &&
      s.quests["defeat team galactic in ilex forest"] === "INACTIVE",
  },
];
