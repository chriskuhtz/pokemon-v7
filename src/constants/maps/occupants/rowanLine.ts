import { Occupant, OverworldNpc } from "../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../interfaces/SpriteEnum";

const rowanBase: Omit<
  OverworldNpc,
  "unhandledMessage" | "conditionFunction" | "id"
> = {
  x: 27,
  y: 6,
  orientation: "LEFT",
  type: "NPC",
  sprite: SpriteEnum.rowan,
};
export const rowanLine: Occupant[] = [
  {
    ...rowanBase,
    id: "rowan_1",

    unhandledMessage: [
      "My name is Professor Rowan",
      "I have travelled all across the world",
      "to study pokemon",
      "It is important to encounter pokemon from all regions",
      "Can you catch one from Kanto",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in kanto",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_2",

    unhandledMessage: ["Great", "Next, my travels took me to johto"],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in johto",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_3",

    unhandledMessage: [
      "If you ever plan on going to hoenn",
      "you better bring a boat",
      "So much water ...",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in hoenn",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_4",

    unhandledMessage: [
      "I once got lost in Mt. coronet for a week",
      "I did find some cranidos fossils though",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in sinnoh",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_5",

    unhandledMessage: [
      "Even though most of Unova is one big city",
      "there are still interesting pokemon to be found",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in unova",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_6",

    unhandledMessage: [
      "In Kalos, trainers use special stones",
      "To make their pokemon even stronger",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in kalos",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_7",

    unhandledMessage: [
      "The alola region is always worth a visit",
      "So many fascinating pokemon",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in alola",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_8",

    unhandledMessage: [
      "The best tea comes from galar",
      "They even have a pokemon that resembles a teacup",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in galar",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in galar"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_9",

    unhandledMessage: ["Paldea Region uniquely combines future and past"],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon orginally found in paldea",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in galar"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in paldea"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_10",

    unhandledMessage: [
      "Some pokemon have evolved over time",
      "in order to adjust to their environment",
      "The Alolan Isles have many examples of this",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon and its alolan variant",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in galar"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in paldea"] === "COLLECTED" &&
      s.quests["catch a pokemon and its alolan variant"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_11",

    unhandledMessage: ["The Galar region also has some interesting variants"],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon and its galarian variant",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in galar"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in paldea"] === "COLLECTED" &&
      s.quests["catch a pokemon and its alolan variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its galarian variant"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_12",

    unhandledMessage: [
      "The regional Hisui Pokemon branched off a long time ago",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon and its hisui variant",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in galar"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in paldea"] === "COLLECTED" &&
      s.quests["catch a pokemon and its alolan variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its galarian variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its hisui variant"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_13",

    unhandledMessage: [
      "The Paldea region also has some interesting regional variants",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch a pokemon and its paldea variant",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in galar"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in paldea"] === "COLLECTED" &&
      s.quests["catch a pokemon and its alolan variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its galarian variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its hisui variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its paldea variant"] !== "COLLECTED",
  },
  {
    ...rowanBase,
    id: "rowan_14",

    unhandledMessage: [
      "In Paldea, tauros has even split into multiple different species",
    ],
    handledMessage: ["How is the catching going"],
    quest: "catch all forms of tauros",
    conditionFunction: (s) =>
      s.campUpgrades["invite professor rowan"] &&
      s.quests["catch a pokemon orginally found in kanto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in johto"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in hoenn"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in sinnoh"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in unova"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in kalos"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in alola"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in galar"] === "COLLECTED" &&
      s.quests["catch a pokemon orginally found in paldea"] === "COLLECTED" &&
      s.quests["catch a pokemon and its alolan variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its galarian variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its hisui variant"] === "COLLECTED" &&
      s.quests["catch a pokemon and its paldea variant"] == "COLLECTED" &&
      s.quests["catch all forms of tauros"] !== "COLLECTED",
  },
];
