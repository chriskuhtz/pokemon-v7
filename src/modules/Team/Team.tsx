import React, { useCallback, useContext, useMemo, useState } from "react";
import { OwnedPokemonCardContent } from "../../components/OwnedPokemonCardContent/OwnedPokemonCardContent";

import { InGamePage } from "../../components/InGamePage/InGamePage";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { TeamMemberInOverview } from "../../components/TeamOverview/TeamOverview";
import { portraitMode } from "../../constants/baseConstants";
import { isOwnedPokemonKO } from "../../functions/isKo";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { BattlePokemon } from "../../interfaces/BattlePokemon";
import { Inventory } from "../../interfaces/Inventory";
import { ItemType } from "../../interfaces/Item";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { BottomDrawer } from "../../uiComponents/BottomDrawer/BottomDrawer";
import { LoadingScreen } from "../../uiComponents/LoadingScreen/LoadingScreen";

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
      <TeamIcons
        team={team}
        res={res}
        reorder={reorder}
        focusedId={focusedId}
        setFocusedId={setFocusedId}
      />
      <OwnedPokemonCardContent
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
        giveHeldItem={(newItem: ItemType) => changeHeldItem(focusedId, newItem)}
      />
    </InGamePage>
  );
};

const TeamIcons = ({
  team,
  res,
  setFocusedId,
  reorder,
  focusedId,
}: {
  team: OwnedPokemon[];
  res: BattlePokemon[];
  reorder: (from: number, to: number) => void;
  focusedId: string;
  setFocusedId: (x: string) => void;
}) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gap: ".5rem",
          marginBottom: "2rem",
          gridTemplateColumns: portraitMode
            ? "1fr 1fr 1fr"
            : "1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {team.map((pokemon, index) => (
          <TeamMemberIcon
            res={res}
            pokemon={pokemon}
            currentSlot={index}
            setFocusedId={setFocusedId}
            key={pokemon.id}
            reorder={reorder}
            team={team}
            isFocused={focusedId === pokemon.id}
          />
        ))}
      </div>
    </>
  );
};

const TeamMemberIcon = ({
  pokemon,
  res,
  setFocusedId,
  reorder,
  currentSlot,
  team,
  isFocused,
}: {
  pokemon: OwnedPokemon;
  res: BattlePokemon[];
  reorder: (from: number, to: number) => void;
  setFocusedId: (x: string) => void;
  currentSlot: number;
  team: OwnedPokemon[];
  isFocused: boolean;
}) => {
  const d = res.find((r) => r.name === pokemon.name)?.data;
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const teamSize = res.length;

  if (!d) {
    return <React.Fragment key={pokemon.id}></React.Fragment>;
  }

  return (
    <>
      <BottomDrawer open={drawerOpen} close={() => setDrawerOpen(false)}>
        <div style={{ padding: "1rem", height: "150px" }}>
          <h3>Switch {pokemon.name} with:</h3>
          <div
            style={{
              display: "grid",
              gap: ".5rem",
              gridTemplateColumns: portraitMode
                ? "1fr 1fr 1fr"
                : "1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            {team.map((mon, newSlot) => {
              if (mon.id === pokemon.id) {
                return <React.Fragment key={pokemon.id}></React.Fragment>;
              }
              return (
                <PokemonSprite
                  key={mon.id}
                  onClick={() => {
                    setDrawerOpen(false);
                    reorder(currentSlot, newSlot);
                  }}
                  name={mon.name}
                  config={{
                    shiny: mon.shiny,
                    grayscale: isOwnedPokemonKO(mon),
                  }}
                />
              );
            })}
          </div>
        </div>
      </BottomDrawer>
      <div
        key={pokemon.id}
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          border: isFocused ? "2px solid gray" : undefined,
          borderRadius: 9000,
          aspectRatio: "1/1",
          padding: ".5rem",
        }}
      >
        <strong
          style={{ fontSize: "x-large" }}
          onClick={() => {
            if (teamSize === 1) {
              return;
            }
            setDrawerOpen(true);
          }}
        >
          {currentSlot + 1}.
        </strong>
        <TeamMemberInOverview
          pokemon={pokemon}
          onClick={() => setFocusedId(pokemon.id)}
        />
      </div>
    </>
  );
};
