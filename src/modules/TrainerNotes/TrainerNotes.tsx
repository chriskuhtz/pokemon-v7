import React, { useContext, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { AbilityInfoButton } from "../../components/AbilityInfoButton/AbilityInfoButton";
import { BstSection } from "../../components/BstSection/BstSection";
import {
  ItemInfoButton,
  NatureInfoButton,
} from "../../components/ItemInfoButton/ItemInfoButton";
import { MovesDisplay } from "../../components/MovesDisplay/MovesDisplay";
import { PokemonSprite } from "../../components/PokemonSprite/PokemonSprite";
import { SpriteIcon } from "../../components/SpriteIcon/SpriteIcon";
import {
  battleSpriteSize,
  testPokemon,
  trickXP,
} from "../../constants/gameData/gameData";
import { clearingKurt } from "../../constants/gameData/maps/occupants/apricornClearing";
import { barry } from "../../constants/gameData/maps/occupants/barry";
import { trainerBlaine } from "../../constants/gameData/maps/occupants/blaine";
import { trainerBrock } from "../../constants/gameData/maps/occupants/brock";
import { bruno } from "../../constants/gameData/maps/occupants/bruno";
import { champChris } from "../../constants/gameData/maps/occupants/champChris";
import { cynthia } from "../../constants/gameData/maps/occupants/cynthia";
import { trainerErika } from "../../constants/gameData/maps/occupants/erika";
import { trainerGary } from "../../constants/gameData/maps/occupants/gary";
import { giovanni } from "../../constants/gameData/maps/occupants/giovanni";
import { hugh } from "../../constants/gameData/maps/occupants/hugh";
import { trainerJanine } from "../../constants/gameData/maps/occupants/janine";
import { karen } from "../../constants/gameData/maps/occupants/karen";
import { koga } from "../../constants/gameData/maps/occupants/koga";
import { lance } from "../../constants/gameData/maps/occupants/lance";
import { trainerMisty } from "../../constants/gameData/maps/occupants/misty";
import { n } from "../../constants/gameData/maps/occupants/n";
import { red } from "../../constants/gameData/maps/occupants/red";
import { trainerSabrina } from "../../constants/gameData/maps/occupants/sabrina";
import { silver } from "../../constants/gameData/maps/occupants/silver";
import { trainerSurge } from "../../constants/gameData/maps/occupants/surge";
import { will } from "../../constants/gameData/maps/occupants/will";
import { calculateLevelData } from "../../functions/calculateLevelData";
import { getTypeNames } from "../../functions/getTypeNames";
import { useGetBattleTeam } from "../../hooks/useGetBattleTeam";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { JournalEntryData } from "../../interfaces/JournalEntryData";
import { SaveFile } from "../../interfaces/SaveFile";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

export const TrainerNotes = () => {
  const { saveFile } = useContext(SaveFileContext);
  const navigate = useNavigate();
  return (
    <Page
      headline="Notes about Trainers"
      goBack={() => navigate("TRAINER_NOTES", "OVERWORLD")}
    >
      {saveFile.trainerNotes?.at(0) ? (
        <Stack mode="column">
          {saveFile.trainerNotes.map((note) => {
            const data = allJournalEntries.find((o) => {
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
    </Page>
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
      <Stack mode="column" gap={1}>
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
              <Stack
                mode="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack mode="row" alignItems="center">
                  Ability: {mon.ability}{" "}
                  <AbilityInfoButton abilityName={mon.ability} />
                </Stack>
                <div></div>
                <Stack mode="row" alignItems="center">
                  {mon.nature} Nature
                  <NatureInfoButton nature={mon.nature} />
                </Stack>
                {mon.heldItemName && (
                  <Stack mode="row" alignItems="center">
                    Held Item: {mon.heldItemName}{" "}
                    <ItemInfoButton itemName={mon.heldItemName} />
                  </Stack>
                )}
              </Stack>

              <BstSection hideExplanation ownedPokemon={mon} data={mon.data} />
              <MovesDisplay onlyCurrent ownedPokemon={mon} />
            </Stack>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export const allJournalEntries: JournalEntryData[] = [
  { trainer: clearingKurt, additionalNotes: ["matches your level"] },
  { trainer: trainerErika },
  { trainer: trainerJanine },
  { trainer: trainerBlaine },
  { trainer: trainerSurge },
  { trainer: trainerMisty },
  { trainer: trainerBrock },
  { trainer: trainerSabrina },
  { trainer: trainerGary },
  {
    trainer: will,
    additionalNotes: ["Matches your level * .8 after level 66"],
  },
  {
    trainer: koga,
    additionalNotes: ["Matches your level * .85 after level 67"],
  },
  {
    trainer: bruno,
    additionalNotes: ["Matches your level * .9 after level 68"],
  },
  {
    trainer: karen,
    additionalNotes: ["Matches your level * .95 after level 69"],
  },
  { trainer: lance, additionalNotes: ["Matches your level after level 70"] },
  { trainer: giovanni, additionalNotes: ["Matches your level after level 60"] },
  {
    trainer: barry,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: barry,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: barry,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: silver,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: silver,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: silver,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: hugh,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: hugh,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: hugh,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: n,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: n,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: n,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: red,
    xpOverwrite: 6859,
    additionalNotes: ["Might be a time traveller", "Matches your level"],
  },
  {
    trainer: red,
    xpOverwrite: 46655,
    additionalNotes: ["Might be a time traveller", "Matches your level"],
  },
  {
    trainer: red,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Might be a time traveller",
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: cynthia,
    xpOverwrite: 6859,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: cynthia,
    xpOverwrite: 46655,
    additionalNotes: ["Matches your level"],
  },
  {
    trainer: cynthia,
    xpOverwrite: trickXP,
    additionalNotes: [
      "Matches your level",
      "Selects randomly from the following pokemon",
      "3 pokemon if under lvl 50",
      "4 pokemon if under lvl 60",
      "5 pokemon if under lvl 70",
      "6 otherwise",
    ],
  },
  {
    trainer: champChris,
    additionalNotes: ["Matches your level after level 70"],
  },
];
