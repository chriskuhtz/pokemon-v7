import { makeRandomTeam } from "../../../../functions/makeRandomTeam";
import { occupantHandled } from "../../../../functions/occupantHandled";
import { OverworldTrainer } from "../../../../interfaces/Occupant";
import { OverworldMap } from "../../../../interfaces/OverworldMap";
import { SpriteEnum } from "../../../../interfaces/SpriteEnum";

export const randomChallengeFieldOccupants: OverworldMap["occupants"] = [
  {
    type: "NPC",
    sprite: SpriteEnum.aceFemale,
    x: 1,
    y: 1,
    id: "challengeField_explainer",
    orientation: "RIGHT",
    conditionFunction: () => true,
    unhandledMessage: [
      "Welcome to the challenge field",
      "Rule 1:",
      "If you beat a trainer,you can progress",
      "Rule 2:",
      "These trainers use random pokemon and each one is stronger than the next",
      "Rule 3:",
      "you dont get to keep any items you find",
      "so dont hesitate to use them",
      "Rule 4:",
      "You can always leave through the main menu",
    ],
  },
  ...Array.from({ length: 100 }).map((_, index) => {
    const x = () => {
      const offset = Math.floor(index / 9) * 4;
      return 2 + offset;
    };
    const y = () => {
      const offset = Math.floor(index / 9);

      const factor = index - 9 * offset;
      return 4 + 4 * factor;
    };

    const ori = [2, 10, 18, 26, 34, 42].includes(x()) ? "UP" : "DOWN";

    const challengeFieldRank =
      ori === "UP" ? 1 + index : 10 + Math.floor((9 * (x() - 2)) / 4 - y() / 4);

    const factor = challengeFieldRank;
    const xp = factor * factor * factor;
    const id = `randomField_${challengeFieldRank}`;

    const assembled: OverworldTrainer = {
      type: "TRAINER",
      x: x(),
      y: y(),
      orientation: ori,
      id,
      battleTeamConfig: {
        assignGender: true,
        assignHeldItem: false,
        assignLearnsetMoves: true,
        assignNaturalAbility: true,
      },
      conditionFunction: (s) => !occupantHandled(s, id),
      sprite: Object.values(SpriteEnum)[index],
      unhandledMessage: [".", "..", "..."],
      team: () => makeRandomTeam({ xp }),
      challengeFieldRank,
    };
    return assembled;
  }),
  {
    type: "ITEM",
    x: 1,
    y: 39,
    id: `randomField_item1`,
    item: "super-potion",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item1`),
  },
  {
    type: "ITEM",
    x: 2,
    y: 39,
    id: `randomField_item2`,
    item: "full-heal",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item2`),
  },
  {
    type: "ITEM",
    x: 3,
    y: 39,
    id: `randomField_item3`,
    item: "potion",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item3`),
  },
  {
    type: "ITEM",
    x: 9,
    y: 39,
    id: `randomField_item4`,
    item: "moomoo-milk",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item4`),
  },
  {
    type: "ITEM",
    x: 10,
    y: 39,
    id: `randomField_item5`,
    item: "elixir",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item5`),
  },
  {
    type: "ITEM",
    x: 11,
    y: 39,
    id: `randomField_item6`,
    item: "full-heal",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item6`),
  },
  {
    type: "ITEM",
    x: 17,
    y: 39,
    id: `randomField_item7`,
    item: "full-restore",
    amount: 3,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item7`),
  },
  {
    type: "ITEM",
    x: 18,
    y: 39,
    id: `randomField_item8`,
    item: "moomoo-milk",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item8`),
  },
  {
    type: "ITEM",
    x: 19,
    y: 39,
    id: `randomField_item9`,
    item: "elixir",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item9`),
  },
  {
    type: "ITEM",
    x: 25,
    y: 39,
    id: `randomField_item10`,
    item: "full-restore",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item10`),
  },
  {
    type: "ITEM",
    x: 26,
    y: 39,
    id: `randomField_item11`,
    item: "moomoo-milk",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item11`),
  },
  {
    type: "ITEM",
    x: 27,
    y: 39,
    id: `randomField_item9`,
    item: "elixir",
    amount: 5,
    conditionFunction: (s) => !occupantHandled(s, `randomField_item12`),
  },
];
