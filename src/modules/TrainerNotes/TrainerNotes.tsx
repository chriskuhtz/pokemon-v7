import React, { useContext, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { AbilityInfoButton } from "../../components/AbilityInfoButton/AbilityInfoButton";
import { BstSection } from "../../components/BstSection/BstSection";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import {
  ItemInfoButton,
  NatureInfoButton,
} from "../../components/ItemInfoButton/ItemInfoButton";
import { MovesDisplay } from "../../components/MovesDisplay/MovesDisplay";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { SpriteIcon } from "../../components/SpriteIcon/SpriteIcon";
import { battleSpriteSize } from "../../constants/baseConstants";
import { testPokemon } from "../../constants/gameData/gameData";
import { trainerJournals } from "../../constants/gameData/trainerJournals";
import { calculateLevelData } from "../../functions/calculateLevelData";
import { getTypeNames } from "../../functions/getTypeNames";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { JournalEntryData } from "../../interfaces/JournalEntryData";
import { SaveFile } from "../../interfaces/SaveFile";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

export const TrainerNotes = () => {
  const { saveFile } = useContext(SaveFileContext);
  const navigate = useNavigate();
  return (
    <InGamePage
      headline="Notes about Trainers"
      goBack={() => navigate("TRAINER_NOTES", "OVERWORLD")}
    >
      {saveFile.trainerNotes?.at(0) ? (
        <Stack mode="column">
          {saveFile.trainerNotes.map((note) => {
            const data = trainerJournals.find((o) => {
              if (o.xpOverwrite) {
                return (
                  o.trainer.id === note.id && o.xpOverwrite === note.xpOverwrite
                );
              }
              return o.trainer.id === note.id;
            });

            if (!data) {
              return (
                <React.Fragment
                  key={note.id + note.xpOverwrite}
                ></React.Fragment>
              );
            }
            return (
              <JournalEntry
                key={data.trainer.id + data.xpOverwrite}
                data={data}
                saveFile={saveFile}
              />
            );
          })}
        </Stack>
      ) : (
        <strong>You dont have any notes yet</strong>
      )}
    </InGamePage>
  );
};

const JournalEntry = ({
  data,
  saveFile,
  leave,
}: {
  data: JournalEntryData;
  saveFile: SaveFile;
  leave?: () => void;
}) => {
  const { xpOverwrite, trainer, additionalNotes } = data;
  const team = useMemo(() => {
    if (xpOverwrite) {
      return trainer.team({
        ...saveFile,
        pokemon: [{ ...testPokemon, xp: xpOverwrite, onTeam: true }],
      });
    }
    return trainer.team(saveFile);
  }, [saveFile, trainer, xpOverwrite]);
  const { res, invalidate } = useGetBattleTeam(team, {});
  const [collapsed, setCollapsed] = useState<boolean>(true);
  if (!res) {
    return (
      <Card
        icon={<SpriteIcon sprite={trainer.sprite} />}
        content={"Loading Data"}
        actionElements={[]}
      />
    );
  }

  const headline = (
    <h3>
      {data.xpOverwrite ? (
        <strong>
          Notes about {data.trainer.id} at lvl{" "}
          {calculateLevelData(data.xpOverwrite, "medium").level} or lower
        </strong>
      ) : (
        <strong>Notes about {data.trainer.id}</strong>
      )}
    </h3>
  );

  if (collapsed) {
    return (
      <Card
        onClick={() => {
          setCollapsed(false);
        }}
        icon={<SpriteIcon sprite={trainer.sprite} />}
        content={headline}
        actionElements={[<FaChevronDown />]}
      />
    );
  }
  return (
    <div
      style={{
        padding: "1rem",
        border: "2px solid black",
        borderRadius: "8px",
        borderTopLeftRadius: "32px",
      }}
    >
      {leave && (
        <IoMdCloseCircle
          role="button"
          size={battleSpriteSize}
          tabIndex={0}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") {
              leave();
              invalidate();
            }
          }}
          onClick={() => {
            leave();
            invalidate();
          }}
        />
      )}
      <Stack mode="row" justifyContent="center">
        <></>
        <FaChevronUp onClick={() => setCollapsed(true)} />
      </Stack>

      {trainer.profilePicture ? (
        <img src={`${trainer.profilePicture}`} />
      ) : (
        <SpriteIcon sprite={trainer.sprite} />
      )}
      {headline}
      {(additionalNotes ?? []).map((note) => (
        <p key={note}>
          <strong>{note}</strong>
        </p>
      ))}
      <h3>Team</h3>
      <Stack mode="column" gapInRem={1}>
        {res.map((mon) => (
          <div key={mon.id} style={{ borderTop: "2px solid black" }}>
            <Stack mode="column" alignItems="stretch">
              <Stack mode="row" alignItems="center">
                <PokemonSprite sizeFactor={2} name={mon.name} />
                <div>
                  {getTypeNames(mon).map((t) => (
                    <img
                      key={t}
                      height={battleSpriteSize}
                      src={`/typeIcons/${t}.png`}
                    />
                  ))}
                </div>
                <h3>
                  {mon.name} | Lvl:
                  {calculateLevelData(mon.xp, mon.growthRate).level}
                </h3>{" "}
              </Stack>
              <Stack mode="column">
                <Stack
                  mode="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <strong>Ability: {mon.ability} </strong>
                  <AbilityInfoButton abilityName={mon.ability} />
                </Stack>

                <Stack
                  mode="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <strong>Nature: {mon.nature}</strong>
                  <NatureInfoButton nature={mon.nature} />
                </Stack>
                {mon.heldItemName && (
                  <Stack
                    mode="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <strong>Held Item: {mon.heldItemName}</strong>
                    <ItemInfoButton itemName={mon.heldItemName} />
                  </Stack>
                )}
                <h4>Moves:</h4>
              </Stack>

              <MovesDisplay onlyCurrent ownedPokemon={mon} />
              <BstSection
                ownedByPlayer={false}
                hideExplanation
                ownedPokemon={mon}
                data={mon.data}
              />
            </Stack>
          </div>
        ))}
      </Stack>
    </div>
  );
};
