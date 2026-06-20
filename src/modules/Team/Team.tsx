import React, { useCallback, useContext, useMemo, useState } from "react";
import { OwnedPokemonCardContent } from "../../components/OwnedPokemonCardContent/OwnedPokemonCardContent";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { TeamMemberInOverview } from "../../components/TeamOverview/TeamOverview";
import { battleSpriteSize } from "../../constants/baseConstants";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { BattlePokemon } from "../../interfaces/BattlePokemon";
import { Inventory } from "../../interfaces/Inventory";
import { ItemType } from "../../interfaces/Item";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { LoadingScreen } from "../../uiComponents/LoadingScreen/LoadingScreen";
import { Stack } from "../../uiComponents/Stack/Stack";

export const Team = ({
  team,
  goBack,
  changeHeldItem,
  inventory,
  initialFocus,
}: {
  team: OwnedPokemon[];
  initialFocus: string;
  goBack: () => void;
  inventory: Inventory;
  changeHeldItem: (pokemonId: string, newItem?: ItemType) => void;
}): JSX.Element => {
  const {
    evolvePokemonReducer: evolve,
    patchSaveFileReducer,
    saveFile,
  } = useContext(SaveFileContext);
  const { res, invalidate } = useGetBattleTeam(team, {});

  const setTeam = useCallback(
    (newTeam: OwnedPokemon[]) => {
      patchSaveFileReducer({
        pokemon: [...newTeam, ...saveFile.pokemon.filter((p) => !p.onTeam)],
      });
    },
    [patchSaveFileReducer, saveFile.pokemon],
  );

  const [focusedId, setFocusedId] = useState<string>(initialFocus);

  const focused = useMemo(
    () => team?.find((r) => r.id === focusedId),
    [team, focusedId],
  );
  const focusedData = useMemo(
    () => res?.find((r) => r.name === focused?.name)?.data,
    [res, focused],
  );

  const reorder = (from: number, to: number) => {
    const selected = team.at(from);
    const displaced = team.at(to);

    if (!selected || !displaced) {
      throw new Error("Error while reordering team");
    }
    const newTeam = team.map((t, index) => {
      if (index === from) {
        return displaced;
      }
      if (index === to) {
        return selected;
      }
      return t;
    });
    setTeam(newTeam);
  };

  if (!focusedData || !res || !focused) {
    return <LoadingScreen />;
  }

  return (
    <InGamePage goBack={goBack} headline="Team:">
      <Stack mode="column" gapInRem={2}>
        <TeamIcons
          team={team}
          res={res}
          focusedId={focusedId}
          setFocusedId={setFocusedId}
        />
        <OwnedPokemonCardContent
          reOrdering={
            <Reordering
              reorder={reorder}
              team={team}
              currentSlot={team.findIndex((t) => t.id === focused.id)}
            />
          }
          setNickName={(id, nickname) => {
            setTeam(
              team.map((t) => {
                if (t.id === id) {
                  return {
                    ...t,
                    nickname,
                  };
                }

                return t;
              }),
            );
          }}
          evolve={(payload) => {
            evolve(payload);
            invalidate();
          }}
          data={focusedData}
          key={focusedId}
          ownedPokemon={focused}
          inventory={inventory}
          takeHeldItem={() => changeHeldItem(focusedId)}
          giveHeldItem={(newItem: ItemType) =>
            changeHeldItem(focusedId, newItem)
          }
        />
      </Stack>
    </InGamePage>
  );
};

const TeamIcons = ({
  team,
  res,
  setFocusedId,
  focusedId,
}: {
  team: OwnedPokemon[];
  res: BattlePokemon[];
  focusedId: string;
  setFocusedId: (x: string) => void;
}) => {
  return (
    <div style={{ margin: "0 1rem" }}>
      <Stack mode="row" justifyContent="space-between">
        {team.map((pokemon) => (
          <TeamMemberIcon
            res={res}
            pokemon={pokemon}
            setFocusedId={setFocusedId}
            key={pokemon.id}
            isFocused={focusedId === pokemon.id}
          />
        ))}
      </Stack>
    </div>
  );
};
const Reordering = ({
  team,
  reorder,
  currentSlot,
}: {
  team: OwnedPokemon[];
  currentSlot: number;
  reorder: (from: number, to: number) => void;
}) => {
  if (team.length === 1) {
    return <></>;
  }
  return (
    <Stack mode="row" alignItems="center" justifyContent="space-between">
      <FaArrowLeft
        size={battleSpriteSize}
        onClick={() => {
          if (currentSlot === 0) {
            return;
          }
          reorder(currentSlot, currentSlot - 1);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") {
            if (currentSlot === 0) {
              return;
            }
            reorder(currentSlot, currentSlot - 1);
          }
        }}
      />
      <strong>Change Team Position</strong>

      <FaArrowRight
        size={battleSpriteSize}
        onClick={() => {
          if (currentSlot === team.length - 1) {
            return;
          }
          reorder(currentSlot, currentSlot + 1);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") {
            if (currentSlot === team.length - 1) {
              return;
            }
            reorder(currentSlot, currentSlot + 1);
          }
        }}
      />
    </Stack>
  );
};

const TeamMemberIcon = ({
  pokemon,
  res,
  setFocusedId,
  isFocused,
}: {
  pokemon: OwnedPokemon;
  res: BattlePokemon[];
  setFocusedId: (x: string) => void;
  isFocused: boolean;
}) => {
  const d = res.find((r) => r.name === pokemon.name)?.data;

  if (!d) {
    return <React.Fragment key={pokemon.id}></React.Fragment>;
  }

  return (
    <div
      key={pokemon.id}
      style={
        isFocused
          ? {
              transform: "scale(1.5)",
            }
          : undefined
      }
    >
      <TeamMemberInOverview
        pokemon={pokemon}
        onClick={() => setFocusedId(pokemon.id)}
      />
    </div>
  );
};
