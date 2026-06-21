import { useState } from "react";
import { GoTasklist } from "react-icons/go";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { RecoveryTool } from "../../components/RecoveryTool/RecoveryTool";
import { battleSpriteSize } from "../../constants/baseConstants";
import { mapsRecord } from "../../constants/gameData/maps/mapsRecord";
import { MapId } from "../../interfaces/mapIds";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";
import { Kuma } from "../../versions/kuma/Kuma";
import { Labyrinth } from "../../versions/labyrinth/Labyrinth";
import { StrangeDimension } from "../../versions/strangeDimension/StrangeDimension";
import { ChangeLog } from "../ChangeLog/ChangeLog";
import { MapEditor } from "../MapMaker/components/MapEditor";

type Version = "KUMA" | "LABYRINTH" | "STRANGE_DIMENSION";
export const VersionSelection = (): JSX.Element => {
  const [version, setVersion] = useState<Version>();
  const [map, setMap] = useState<MapId | undefined>(
    window.location.pathname.replace("/", "") as MapId | undefined,
  );

  if (version === "KUMA") {
    return <Kuma />;
  }
  if (version === "LABYRINTH") {
    return <Labyrinth />;
  }
  if (version === "STRANGE_DIMENSION") {
    return <StrangeDimension />;
  }
  if (map) {
    return <MapEditor mapId={map} goBack={() => setMap(undefined)} />;
  }
  return (
    <Page
      headline={"Which version would you like to play"}
      primaryColor={"rgba(122, 199, 76, 0.5) 0%"}
      secondaryColor={"rgba(99, 144, 240, 0.5) 100%"}
    >
      <Stack mode={"column"}>
        <SelectionCards setVersion={setVersion} />
        <RecoveryTool />
        <MapMakerCards setMap={setMap} />
      </Stack>
      <ChangeLog />
    </Page>
  );
};

const SelectionCards = ({
  setVersion,
}: {
  setVersion: React.Dispatch<React.SetStateAction<Version | undefined>>;
}) => {
  return (
    <>
      <Card
        icon={
          <PokemonSprite config={{ officalArtwork: true }} name={"teddiursa"} />
        }
        content={
          <div>
            <h2>Kuma</h2>
            <h4>
              Battle, raise Pokemon, farm, forage and expand your research camp
            </h4>
            <h4>Over 400 Quests</h4>
            <h4>Configure the game to your play style</h4>
          </div>
        }
        actionElements={[]}
        onClick={() => setVersion("KUMA")}
      ></Card>
      <Card
        icon={
          <PokemonSprite config={{ officalArtwork: true }} name={"unown"} />
        }
        content={
          <div>
            <h3>Labyrinth</h3>
            <h4>Lead a young trainer and his Pokemon back to safety</h4>
            <h4>Fast paced roguelike game</h4>
          </div>
        }
        actionElements={[]}
        onClick={() => {
          setVersion("LABYRINTH");
        }}
      ></Card>
      <Card
        icon={
          <PokemonSprite
            config={{ officalArtwork: true }}
            name={"giratina-origin"}
          />
        }
        content={
          <div>
            <h3>Strange Dimension</h3>
            <h4>Proceedurally generated levels</h4>
          </div>
        }
        actionElements={[]}
        onClick={() => {
          setVersion("STRANGE_DIMENSION");
        }}
      ></Card>
    </>
  );
};

const MapMakerCards = ({ setMap }: { setMap: (x: MapId) => void }) => {
  if (!window.localStorage.getItem("devmode")) {
    return <></>;
  }
  return (
    <>
      <h3>Map Maker:</h3>
      {Object.keys(mapsRecord).map((m) => (
        <Card
          key={m}
          onClick={() => {
            setMap(m as MapId);
            window.location.assign(m);
          }}
          content={<h4>Map Maker {m}</h4>}
          icon={<GoTasklist size={battleSpriteSize} />}
          actionElements={[]}
        />
      ))}
    </>
  );
};
