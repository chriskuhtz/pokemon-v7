import { useCallback, useContext } from "react";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { isBagOverloaded } from "../../functions/getBagLimit";
import { replaceRouteName } from "../../functions/replaceRouteName";
import { LocationContext } from "../../hooks/LocationProvider";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { ItemType } from "../../interfaces/Item";
import { Occupant } from "../../interfaces/OverworldMap";
import { CharacterLocationData } from "../../interfaces/SaveFile";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

const taxiLocations: Record<
  string,
  { to: CharacterLocationData; ticket: ItemType }
> = {
  routeN1E1: {
    ticket: "forest-ticket",
    to: {
      mapId: "routeN1E1",
      x: 28,
      y: 23,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  routeS1E1: {
    ticket: "plains-ticket",
    to: {
      mapId: "routeS1E1",
      x: 28,
      y: 32,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  routeS1W1: {
    ticket: "hills-ticket",
    to: {
      mapId: "routeS1W1",
      x: 27,
      y: 19,
      orientation: "DOWN",
      forwardFoot: "CENTER1",
    },
  },
  routeN1W1: {
    ticket: "peak-ticket",
    to: {
      mapId: "routeN1W1",
      x: 26,
      y: 11,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
  },
  pokemonLeague: {
    ticket: "league-ticket",
    to: {
      mapId: "pokemonLeague",
      x: 5,
      y: 55,
      orientation: "UP",
      forwardFoot: "CENTER1",
    },
  },
};

export const DragoniteTaxi = (): JSX.Element => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { setLocation } = useContext(LocationContext);

  const fly = useCallback(
    ({ to }: { to: CharacterLocationData; ticket: ItemType }) => {
      setLocation(to);
      patchSaveFileReducer({
        meta: { ...saveFile.meta, activeTab: "OVERWORLD" },
      });
    },
    [patchSaveFileReducer, saveFile.meta, setLocation]
  );

  const navigate = useNavigate();

  return (
    <Page
      headline="dragonite taxi"
      goBack={() => navigate("DRAGONITE_TAXI", "OVERWORLD")}
    >
      <Stack mode="column">
        <h3>
          {isBagOverloaded(saveFile)
            ? "That is a bit too much equipment, even for dragonite. Drop something off and come back"
            : "If you have a ticket, Dragonite will take you anywhere you want"}
        </h3>
        {Object.entries(taxiLocations).map(([n, location]) => (
          <Card
            key={n}
            disabled={
              (saveFile.bag[location.ticket] < 1 &&
                saveFile.storage[location.ticket] < 1) ||
              isBagOverloaded(saveFile)
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
    </Page>
  );
};

export const dragoniteTaxi: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: ["Dragonite can easily carry a person on its back"],
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
