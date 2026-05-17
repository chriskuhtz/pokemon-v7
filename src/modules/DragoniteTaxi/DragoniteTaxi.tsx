import { useCallback, useContext } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { isBagOverloaded } from "../../functions/getBagLimit";
import { replaceRouteName } from "../../functions/replaceRouteName";
import { LocationContext } from "../../hooks/LocationProvider";
import { GameDataContext } from "../../hooks/useGameData";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { ItemType } from "../../interfaces/Item";
import { MapId } from "../../interfaces/mapIds";
import { Occupant } from "../../interfaces/Occupant";
import { CharacterLocationData } from "../../interfaces/SaveFile";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

const taxiLocations: Partial<
  Record<MapId, { to: CharacterLocationData; ticket: ItemType }>
> = {
  routeN1E1: {
    ticket: "forest-ticket",
    to: {
      mapId: "routeN1E1",
      x: 29,
      y: 25,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  routeS1E1: {
    ticket: "plains-ticket",
    to: {
      mapId: "routeS1E1",
      x: 17,
      y: 36,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  routeS1W1: {
    ticket: "hills-ticket",
    to: {
      mapId: "routeS1W1",
      x: 27,
      y: 17,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  routeN1W1: {
    ticket: "peak-ticket",
    to: {
      mapId: "routeN1W1",
      x: 25,
      y: 12,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  pokemonLeague: {
    ticket: "league-ticket",
    to: {
      mapId: "victoryRoadExit",
      x: 12,
      y: 5,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
  },
  "ilex-forest": {
    ticket: "ilex-ticket",
    to: {
      mapId: "ilex-forest",
      x: 26,
      y: 46,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
  },
  "murasaki-glades": {
    ticket: "murasaki-ticket",
    to: {
      mapId: "murasaki-glades",
      x: 26,
      y: 66,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
  },
};

export const DragoniteTaxi = (): JSX.Element => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { setLocation, location } = useContext(LocationContext);
  const gameData = useContext(GameDataContext);

  const fly = useCallback(
    ({ to }: { to: CharacterLocationData }) => {
      setLocation(to);
      patchSaveFileReducer({
        meta: { ...saveFile.meta, activeTab: "OVERWORLD" },
      });
    },
    [patchSaveFileReducer, saveFile.meta, setLocation],
  );

  const navigate = useNavigate();

  return (
    <InGamePage
      headline="dragonite taxi"
      goBack={() => navigate("DRAGONITE_TAXI", "OVERWORLD")}
    >
      <Stack mode="column">
        <h3>
          {isBagOverloaded(saveFile, gameData)
            ? "That is a bit too much equipment, even for dragonite. Drop something off and come back"
            : "If you have a ticket, Dragonite will take you anywhere you want"}
        </h3>
        {location.mapId !== "camp" && (
          <Card
            key={"back-to-camp"}
            disabled={isBagOverloaded(saveFile, gameData)}
            onClick={() => fly({ to: gameData.startingLocation })}
            actionElements={[<ItemSprite item={"forest-ticket"} />]}
            icon={
              <PokemonSprite
                name={"dragonite"}
                config={{ officalArtwork: true }}
              />
            }
            content={<h3>Back to Camp</h3>}
          />
        )}
        {Object.entries(taxiLocations).map(([n, location]) => (
          <Card
            key={n}
            disabled={
              (saveFile.bag[location.ticket] < 1 &&
                saveFile.storage[location.ticket] < 1) ||
              isBagOverloaded(saveFile, gameData)
            }
            onClick={() => fly(location)}
            actionElements={[<ItemSprite item={"forest-ticket"} />]}
            icon={
              <PokemonSprite
                name={"dragonite"}
                config={{ officalArtwork: true }}
              />
            }
            content={<h3>{replaceRouteName(n)}</h3>}
          />
        ))}
      </Stack>
    </InGamePage>
  );
};

export const dragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 4,
    y: 23,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 5,
    y: 23,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];

export const ilexDragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 26,
    y: 45,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 27,
    y: 45,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];
export const murasakiDragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 26,
    y: 65,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 27,
    y: 65,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];
export const routeN1E1DragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 29,
    y: 24,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 30,
    y: 24,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];
export const routeS1E1DragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 17,
    y: 35,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 18,
    y: 35,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];
export const routeS1W1DragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 27,
    y: 16,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 28,
    y: 16,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];

export const routeN1W1DragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 25,
    y: 11,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 26,
    y: 11,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];
export const pokemonLeagueDragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Dragonite can easily carry a person on its back",
      "Where should we take you?",
    ],
    to: "DRAGONITE_TAXI",
    x: 12,
    y: 4,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "dragonite taxi man",
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
  {
    type: "POKEMON",
    dexId: 149,
    x: 13,
    y: 4,
    orientation: "DOWN",
    id: "dragonite",
    dialogue: ["Dragonite seems ready to spread its wings"],
    conditionFunction: (s) => s.campUpgrades["dragonite taxi"],
  },
];
