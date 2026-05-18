import { useContext } from "react";
import { TimeOfDayIcon } from "../../../components/TimeOfDayIcon/TimeOfDayIcon";
import {
  TerrainIcon,
  WeatherIcon,
} from "../../../components/WeatherIcon/WeatherIcon";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { BattlePokemon } from "../../../interfaces/BattlePokemon";
import { Inventory } from "../../../interfaces/Inventory";
import { CharacterTrait } from "../../../interfaces/Trait";
import { WeatherType } from "../../../interfaces/Weather";
import { BottomDrawer } from "../../../uiComponents/BottomDrawer/BottomDrawer";
import { BattleTerrain } from "../hooks/useBattleTerrain";
import {
  BattleFieldEffect,
  ChooseActionPayload,
} from "../interfaces/interfaces";
import { ControlBar } from "./ControlBar";
import { EnemyLane } from "./EnemyLane";
import { PlayerLane } from "./PlayerLane";

export const BattleFieldUI = ({
  battleWeather,
  battleTerrain,
  onFieldOpponents,
  spriteGeneration,
  onFieldTeam,
  nextPokemonWithoutMove,
  targets,
  chooseAction,
  catchingForbiddenReason,
  battleFieldEffects,
  runningAllowed,
  battleInventory,
  trait,
}: {
  battleWeather: WeatherType | undefined;
  battleTerrain: BattleTerrain | undefined;
  onFieldOpponents: BattlePokemon[];
  spriteGeneration?: 1;
  onFieldTeam: BattlePokemon[];
  nextPokemonWithoutMove: BattlePokemon | undefined;
  targets: BattlePokemon[];
  chooseAction: (x: ChooseActionPayload) => void;
  catchingForbiddenReason: string | undefined;
  battleFieldEffects: BattleFieldEffect[];
  battleInventory: Inventory;
  runningAllowed: boolean;
  trait: CharacterTrait | undefined;
}) => {
  const { latestMessage } = useContext(MessageQueueContext);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `1fr 4fr 4fr 1fr`,
        height: "100dvh",
        gap: ".5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: ".5rem",
        }}
      >
        <WeatherIcon weather={battleWeather} />
        <TimeOfDayIcon />
        <TerrainIcon terrain={battleTerrain} />
      </div>

      <EnemyLane
        onFieldOpponents={onFieldOpponents}
        spriteGeneration={spriteGeneration}
      />
      <PlayerLane onFieldTeam={onFieldTeam} />

      <BottomDrawer open={!!nextPokemonWithoutMove && !latestMessage}>
        <ControlBar
          disabled={!!latestMessage}
          controlled={nextPokemonWithoutMove}
          targets={targets}
          chooseAction={chooseAction}
          playerInventory={battleInventory}
          catchingForbiddenReason={catchingForbiddenReason}
          runningAllowed={runningAllowed}
          battleFieldEffects={battleFieldEffects}
          weather={battleWeather}
          terrain={battleTerrain}
          trait={trait}
        />
      </BottomDrawer>
    </div>
  );
};
