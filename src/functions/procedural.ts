import {
  highBstPokemon,
  lowBstPokemon,
  midBstPokemon,
  ultraHighBstPokemon,
} from "../constants/baseStatRecord";
import { PokemonName } from "../constants/pokemonNames";
import { BattleTeamConfig } from "../hooks/useGetBattleTeam";
import {
  evoStones,
  expCandyPackage,
  gemTable,
  heldItems,
  ItemType,
  moveUnlockPayments,
  smallExpCandyPackage,
  superEffectiveSaveTable,
} from "../interfaces/Item";
import { getRandomNature } from "../interfaces/Natures";
import { Occupant } from "../interfaces/Occupant";
import { OverworldMap } from "../interfaces/OverworldMap";
import { OwnedPokemon } from "../interfaces/OwnedPokemon";
import { CharacterLocationData } from "../interfaces/SaveFile";
import { SpriteEnum } from "../interfaces/SpriteEnum";
import { ArrayHelpers } from "./ArrayHelpers";
import { defaultShaderMap } from "./getTimeOfDay";
import { makeChallengerPokemon } from "./makeChallengerPokemon";
import { makeOverworldItem } from "./makeOverworldItem";

const baseTile = { yOffset: -416, xOffset: -224 };
const obstacleTile = { yOffset: -64, xOffset: -32 };

const baseItems: ItemType[] = [
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "poke-ball",
  "nest-ball",
  "nest-ball",
  "nest-ball",
  "nest-ball",
  "nest-ball",
  "nest-ball",
  "nest-ball",
  "nest-ball",
  "nest-ball",
  "potion",
  "potion",
  "potion",
  "potion",
  "potion",
  "potion",
  "potion",
  "potion",
  "potion",
  "potion",
  "pecha-berry",
  "leppa-berry",
  "cheri-berry",
  "chesto-berry",
  "rawst-berry",
  ...(Object.keys(gemTable) as ItemType[]),
  ...(Object.keys(smallExpCandyPackage) as ItemType[]),
  ...moveUnlockPayments,
  ...moveUnlockPayments,
  ...moveUnlockPayments,
];
const overLevel20Items: ItemType[] = [
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "quick-ball",
  "super-potion",
  "super-potion",
  "super-potion",
  "super-potion",
  "super-potion",
  "super-potion",
  "elixir",
  "ether",
  ...heldItems,
  ...(Object.keys(expCandyPackage) as ItemType[]),
];
const overLevel30Items: ItemType[] = [
  "hyper-potion",
  "moomoo-milk",
  "max-elixir",
  "max-ether",
  ...evoStones,
  ...Object.values(superEffectiveSaveTable),
];
const overLevel50Items: ItemType[] = ["full-restore", "full-heal"];

const generateRandomPath = (
  width: number,
  height: number,
): { x: number; y: number }[] => {
  const open = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false),
  );

  const shuffle = <T>(items: T[]) => {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  };

  const cellWidth = Math.ceil(width / 2);
  const cellHeight = Math.ceil(height / 2);
  const visited = Array.from({ length: cellHeight }, () =>
    Array.from({ length: cellWidth }, () => false),
  );

  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  const carveMaze = (cellX: number, cellY: number) => {
    visited[cellY][cellX] = true;

    const nextDirections = shuffle([...directions]);
    for (const direction of nextDirections) {
      const nextX = cellX + direction.x;
      const nextY = cellY + direction.y;

      if (
        nextX < 0 ||
        nextX >= cellWidth ||
        nextY < 0 ||
        nextY >= cellHeight ||
        visited[nextY][nextX]
      ) {
        continue;
      }

      const fullX = cellX * 2;
      const fullY = cellY * 2;
      const nextFullX = nextX * 2;
      const nextFullY = nextY * 2;

      open[fullY][fullX] = true;
      open[(fullY + nextFullY) / 2][(fullX + nextFullX) / 2] = true;
      open[nextFullY][nextFullX] = true;

      carveMaze(nextX, nextY);
    }
  };

  if (width > 0 && height > 0) {
    open[0][0] = true;
    carveMaze(0, 0);
  }

  const targetX = width - 1;
  const targetY = height - 1;
  const lastMazeX = (cellWidth - 1) * 2;
  const lastMazeY = (cellHeight - 1) * 2;

  if (!open[targetY][targetX]) {
    let connectorX = lastMazeX;
    let connectorY = lastMazeY;

    const carveAxis = () => {
      if (connectorX !== targetX) {
        connectorX += connectorX < targetX ? 1 : -1;
        open[connectorY][connectorX] = true;
      }
      if (connectorY !== targetY) {
        connectorY += connectorY < targetY ? 1 : -1;
        open[connectorY][connectorX] = true;
      }
    };

    if (Math.random() < 0.5) {
      while (connectorX !== targetX) carveAxis();
      while (connectorY !== targetY) carveAxis();
    } else {
      while (connectorY !== targetY) carveAxis();
      while (connectorX !== targetX) carveAxis();
    }
  }

  const path: { x: number; y: number }[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (open[y][x]) {
        path.push({ x, y });
      }
    }
  }

  return path;
};

const getRandomItem = (level: number): ItemType => {
  const options = [...baseItems];

  if (level > 50) {
    options.push(...overLevel50Items);
    options.push(...overLevel50Items);
    options.push(...overLevel50Items);
    options.push(...overLevel50Items);
    options.push(...overLevel50Items);
    options.push(...overLevel50Items);
    options.push(...overLevel50Items);
  }
  if (level > 30) {
    options.push(...overLevel30Items);
  }
  if (level > 20) {
    options.push(...overLevel20Items);
  }
  return ArrayHelpers.getRandomEntry(options);
};

export const getEncounterForStrangeDimension = (
  level: number,
): { team: OwnedPokemon[]; battleTeamConfig: BattleTeamConfig } => {
  const battleTeamConfig: BattleTeamConfig = {
    assignGender: true,
    assignHeldItem: true,
    assignLearnsetMoves: true,
    assignNaturalAbility: true,
  };
  const baseXp = level * level * level;

  let name = ArrayHelpers.getRandomEntry(
    Object.keys(lowBstPokemon),
  ) as PokemonName;

  if (level > 15 && Math.random() > 0.8) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(midBstPokemon),
    ) as PokemonName;
  }
  if (level > 20 && Math.random() > 0.4) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(midBstPokemon),
    ) as PokemonName;
  }
  if (level > 25) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(midBstPokemon),
    ) as PokemonName;
  }
  if (level > 30 && Math.random() > 0.8) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(highBstPokemon),
    ) as PokemonName;
  }
  if (level > 35 && Math.random() > 0.4) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(highBstPokemon),
    ) as PokemonName;
  }
  if (level > 40) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(highBstPokemon),
    ) as PokemonName;
  }
  if (level > 50 && Math.random() > 0.8) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(ultraHighBstPokemon),
    ) as PokemonName;
  }
  if (level > 70 && Math.random() > 0.4) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(ultraHighBstPokemon),
    ) as PokemonName;
  }
  if (level > 90) {
    name = ArrayHelpers.getRandomEntry(
      Object.keys(ultraHighBstPokemon),
    ) as PokemonName;
  }
  const encounter: OwnedPokemon[] = [
    makeChallengerPokemon({
      name,
      nature: getRandomNature(),
      xp: Math.floor(baseXp - Math.random() * baseXp * 0.3),
    }),
  ];
  return { team: encounter, battleTeamConfig };
};
export const generateStrangeDimension = (
  x: number,
  y: number,
  startingLocation: CharacterLocationData,
  strangeDimensionLevel: number,
): OverworldMap => {
  const tileMap: OverworldMap["tileMap"] = {
    waterLayer: Array.from({ length: y }).map(() => []),
    encounterLayer: Array.from({ length: y }).map(() => []),
    foregroundLayer: Array.from({ length: y }).map(() => []),
    decorationLayer: Array.from({ length: y }).map(() => []),
    obstacleLayer: Array.from({ length: y }).map(() => []),
    baseLayer: Array.from({ length: y }).map(() => []),
  };

  const path = generateRandomPath(x, y);

  //fill entire map
  Array.from({ length: y }).forEach((_, yLevel) => {
    Array.from({ length: x }).forEach((_, xLevel) => {
      tileMap.waterLayer[yLevel][xLevel] = null;
      tileMap.decorationLayer[yLevel][xLevel] = null;
      tileMap.foregroundLayer[yLevel][xLevel] = null;
      tileMap.encounterLayer[yLevel][xLevel] = baseTile;
      tileMap.baseLayer[yLevel][xLevel] = baseTile;
      tileMap.obstacleLayer[yLevel][xLevel] = path.some(
        (p) => p.x === xLevel && p.y === yLevel,
      )
        ? null
        : obstacleTile;
    });
  });

  const occs: Occupant[] = [
    strangeDimensionLevel === 100
      ? {
          type: "TELEPORTER_NPC",
          x: x - 1,
          y: y - 1,
          orientation: "DOWN",
          id: "procedural-end",
          dialogue: ["Done already?"],
          to: startingLocation,
          conditionFunction: undefined,
          sprite: SpriteEnum.possessed,
        }
      : {
          type: "ROUTER_NPC",
          x: x - 1,
          y: y - 1,
          orientation: "DOWN",
          id: `procedural-continue`,
          dialogue: ["Dare to continue?"],
          to: "PROCEDURAL_CONTINUE",
          conditionFunction: undefined,
          sprite: SpriteEnum.possessed,
        },
  ];

  Array.from({ length: y }).forEach((_, yLevel) => {
    Array.from({ length: x }).forEach((_, xLevel) => {
      if (
        Math.random() > 0.97 &&
        path.some((p) => p.x === xLevel && p.y === yLevel) &&
        yLevel !== y - 1 &&
        xLevel !== x - 1
      ) {
        occs.push(
          makeOverworldItem({
            x: xLevel,
            y: yLevel,
            amount: 1,
            mapId: "procedural",
            item: getRandomItem(strangeDimensionLevel),
          }),
        );
      }
    });
  });

  return {
    id: "procedural",
    occupants: occs,
    timeOfDayShadersMap: defaultShaderMap,
    tilesetUrl: "/tilesets/newMasterSheet.png",
    area: "OPEN",
    questMenuAvailable: false,
    tileMap,
  };
};
