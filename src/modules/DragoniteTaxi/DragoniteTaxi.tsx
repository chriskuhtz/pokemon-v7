import { useCallback, useContext } from "react";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { isBagOverloaded } from "../../functions/getBagLimit";
import { replaceRouteName } from "../../functions/replaceRouteName";
import { LocationContext } from "../../hooks/LocationProvider";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import { Occupant } from "../../interfaces/OverworldMap";
import { CharacterLocationData } from "../../interfaces/SaveFile";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

const taxiLocations: Record<string, CharacterLocationData> = {
  routeN1E1: {
    mapId: "routeN1E1",
    x: 25,
    y: 25,
    orientation: "DOWN",
    forwardFoot: "CENTER1",
  },
  routeS1E1: {
    mapId: "routeS1E1",
    x: 25,
    y: 25,
    orientation: "DOWN",
    forwardFoot: "CENTER1",
  },
  routeS1W1: {
    mapId: "routeS1W1",
    x: 49,
    y: 25,
    orientation: "DOWN",
    forwardFoot: "CENTER1",
  },
  "routeW1 lookout": {
    mapId: "routeW1",
    x: 9,
    y: 20,
    orientation: "DOWN",
    forwardFoot: "CENTER1",
  },
  routeN1W1: {
    mapId: "routeN1W1",
    x: 25,
    y: 49,
    orientation: "UP",
    forwardFoot: "CENTER1",
  },
};
export const DragoniteTaxi = (): JSX.Element => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { setLocation } = useContext(LocationContext);

  const fly = useCallback(
    (location: CharacterLocationData) => {
      if (saveFile.bag["charti-berry"] < 1) {
        return;
      }
      setLocation(location);
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, { "charti-berry": 1 }, true),
        meta: { ...saveFile.meta, activeTab: "OVERWORLD" },
      });
    },
    [patchSaveFileReducer, saveFile.bag, saveFile.meta, setLocation]
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
            : "For a Charti Berry, Dragonite will take you anywhere you want"}
        </h3>
        {Object.entries(taxiLocations).map(([n, location]) => (
          <Card
            key={n}
            disabled={
              saveFile.bag["charti-berry"] < 1 || isBagOverloaded(saveFile)
            }
            onClick={() => fly(location)}
            actionElements={[<ItemSprite item={"charti-berry"} />]}
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
