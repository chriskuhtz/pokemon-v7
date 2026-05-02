import { useContext } from "react";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { replaceRouteName } from "../../functions/replaceRouteName";
import {
  getCurrentRampager,
  getCurrentSwarm,
} from "../../functions/TimedEvent";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { useSwarmRadar } from "../../hooks/useSwarmRadar";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

export const SwarmRadar = () => {
  const { saveFile } = useContext(SaveFileContext);
  const { scan, activeSwarms } = useSwarmRadar();
  const navigate = useNavigate();

  const rampager = getCurrentRampager(saveFile);

  const swarm = getCurrentSwarm(saveFile, "WEAK");
  const strongSwarm = getCurrentSwarm(saveFile, "STRONG");
  const distortionSwarm =
    getCurrentSwarm(saveFile, "PAST_DISTORTION") ??
    getCurrentSwarm(saveFile, "FUTURE_DISTORTION") ??
    getCurrentSwarm(saveFile, "SPACE_DISTORTION");
  return (
    <Page
      headline="Swarm Radar"
      goBack={() => navigate("SWARM_RADAR", "OVERWORLD")}
    >
      <Stack mode="column">
        {!swarm && (
          <button onClick={() => scan("WEAK")}>Scan for Swarms</button>
        )}
        {saveFile.campUpgrades["upgraded swarm radar"] && !strongSwarm && (
          <button onClick={() => scan("STRONG")}>
            <strong>Scan for stronger Swarms</strong>
          </button>
        )}
        {saveFile.campUpgrades["time distortion radar"] && !distortionSwarm && (
          <button onClick={() => scan("DISTORTION")}>
            Scan for Distortions
          </button>
        )}
        {saveFile.campUpgrades["warden certification"] && !rampager && (
          <button onClick={() => scan("RAMPAGE")}>
            Scan for Rampaging Pokemon
          </button>
        )}
        <h3>Active:</h3>
        {activeSwarms.map((a) => (
          <Card
            key={a.removeAt}
            content={
              a.swarmType === "WEAK" || a.swarmType === "STRONG" ? (
                <strong>
                  Swarm of {a.pokemon} at {replaceRouteName(a.mapId)}
                </strong>
              ) : (
                <strong>
                  {a.type} at {replaceRouteName(a.mapId)}
                </strong>
              )
            }
            actionElements={[]}
            icon={
              <PokemonSprite
                name={a.pokemon}
                config={{ officalArtwork: true }}
              />
            }
          />
        ))}
        {rampager && (
          <Card
            key={rampager.id}
            content={
              <strong>
                Rampaging {rampager.name} at {replaceRouteName(rampager.mapId)}
              </strong>
            }
            actionElements={[]}
            icon={
              <PokemonSprite
                name={rampager.name}
                config={{ officalArtwork: true }}
              />
            }
          />
        )}
      </Stack>
    </Page>
  );
};
