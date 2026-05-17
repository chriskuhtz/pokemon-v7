import { useCallback, useEffect, useState } from "react";
import { animationTimer } from "../../../constants/baseConstants";
import { isKO } from "../../../functions/isKo";
import { BattlePokemon } from "../../../interfaces/BattlePokemon";
import { TrainerInfo } from "../../../interfaces/Challenger";
import { Inventory } from "../../../interfaces/Inventory";
import { BattleField } from "../BattleField";
import { IntroBanner } from "./IntroBanner";
import { LineUpSelection } from "./LineUpSelection";

export const BattleOverview = ({
  opponents,
  team,
  fightersPerSide,
  inventory,
  trainer,
  challengerId,
  challengerType,
}: {
  opponents: BattlePokemon[];
  team: BattlePokemon[];
  fightersPerSide: number;
  inventory: Inventory;
  trainer?: TrainerInfo;
  challengerId: string;
  challengerType: "TRAINER" | "WILD";
}): JSX.Element => {
  const [battleStarted, setBattleStarted] = useState<boolean>(false);

  const [selectedTeam, setSelectedTeam] = useState<string[]>(
    team
      .filter((p) => !isKO(p))
      .slice(0, fightersPerSide)
      .map((p) => p.id),
  );

  const { startTransition, inTransition } = useScreenTransition(() =>
    setBattleStarted(true),
  );

  const toggleSelected = useCallback(
    (id: string) => {
      if (selectedTeam.includes(id)) {
        setSelectedTeam(selectedTeam.filter((i) => i !== id));
        return;
      }
      setSelectedTeam([...selectedTeam, id]);
    },
    [selectedTeam],
  );

  if (inTransition) {
    return (
      <IntroBanner
        names={team
          .filter((t) => selectedTeam.includes(t.id))
          .map((t) => t.name)}
      />
    );
  }

  if (!battleStarted) {
    return (
      <LineUpSelection
        trainer={trainer}
        opponents={opponents}
        team={team}
        fightersPerSide={fightersPerSide}
        startBattle={startTransition}
        selectedTeam={selectedTeam}
        toggleSelected={toggleSelected}
      />
    );
  }

  return (
    <BattleField
      inventory={inventory}
      fightersPerSide={fightersPerSide}
      initTeam={team.map((t) => {
        if (selectedTeam.includes(t.id)) {
          return {
            ...t,
            status: "ONFIELD",
          };
        }
        if (isKO(t)) {
          return { ...t, status: "FAINTED" };
        }
        return {
          ...t,
          status: "BENCH",
        };
      })}
      initOpponents={opponents.map((o, i) => ({
        ...o,
        status: i < fightersPerSide ? "ONFIELD" : "BENCH",
      }))}
      challengerId={challengerId}
      spriteGeneration={trainer?.spriteGeneration}
      challengerType={challengerType}
    />
  );
};

const useScreenTransition = (
  onTransitionEnd: () => void,
): { startTransition: () => void; inTransition: boolean } => {
  const [inTransition, setScreenTransition] = useState<boolean>(false);

  const startTransition = () => setScreenTransition(true);

  useEffect(() => {
    if (!inTransition) {
      return;
    }

    const t = setTimeout(() => {
      onTransitionEnd();
      setScreenTransition(false);
    }, animationTimer);

    return () => clearTimeout(t);
  }, [onTransitionEnd, inTransition]);

  return { startTransition, inTransition };
};
