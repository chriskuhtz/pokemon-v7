import { useContext } from "react";
import { getTypeNames } from "../../../functions/getTypeNames";
import { MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { OwnedPokemon } from "../../../interfaces/OwnedPokemon";
import { PokemonData } from "../../../interfaces/PokemonData";
import { TM } from "../../../interfaces/SaveFile";
import { ListItem } from "../../../uiComponents/ListItem/ListItem";
import { Stack } from "../../../uiComponents/Stack/Stack";
import { MoveInfoButton } from "../../MoveInfoButton/MoveInfoButton";
import { TmSprite } from "../../TmSprite/TmSprite";

export const TeachTmSection = ({
  ownedPokemon,
  data,
}: {
  ownedPokemon: OwnedPokemon;
  data: PokemonData;
}) => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const teachTm = (tm: TM) => {
    const tmCanBeReused = saveFile.trait === "maker" && Math.random() > 0.9;
    addMessage({
      message: `Taught ${tm.moveName} to ${ownedPokemon.name} ${tmCanBeReused ? ", the TM still seems usable" : ""}`,
      onRemoval: () =>
        patchSaveFileReducer({
          tms: tmCanBeReused
            ? (saveFile.tms ?? [])
            : (saveFile.tms ?? []).filter((entry) => entry.id !== tm.id),
          pokemon: saveFile.pokemon.map((p) => {
            if (p.id === ownedPokemon.id) {
              return { ...p, unlockedMoves: [...p.unlockedMoves, tm.moveName] };
            }

            return p;
          }),
          mileStones: {
            ...saveFile.mileStones,
            taughtTmTypes: [
              ...(saveFile.mileStones.taughtTmTypes ?? []),
              tm.type,
            ],
          },
        }),
    });
  };

  const availableTms = (saveFile.tms ?? [])
    .filter((tm) => getTypeNames({ ...ownedPokemon, data }).includes(tm.type))
    .filter((tm) => !ownedPokemon.unlockedMoves.some((u) => u === tm.moveName));
  return (
    <Stack mode="column">
      <h3>
        {availableTms.length > 0 ? "Teach a new Move" : "You dont have any Tms"}
      </h3>
      {availableTms.map((tm) => (
        <ListItem
          primaryIcon={<TmSprite type={tm.type} />}
          onClick={() => teachTm(tm)}
          content={`Teach ${tm.moveName} to ${ownedPokemon.name}`}
          infoButton={<MoveInfoButton movename={tm.moveName} />}
        />
      ))}
    </Stack>
  );
};
