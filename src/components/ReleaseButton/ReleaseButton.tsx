import { useContext, useState } from "react";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { OwnedPokemon } from "../../interfaces/OwnedPokemon";
import { BottomDrawer } from "../../uiComponents/BottomDrawer/BottomDrawer";

export const ReleaseButton = ({
  ownedPokemon,
}: {
  ownedPokemon: OwnedPokemon;
}) => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const [confirmationActive, setConfirmationActive] = useState<boolean>(false);

  const releaseMon = () => {
    setConfirmationActive(false);
    patchSaveFileReducer({
      pokemon: saveFile.pokemon.filter((p) => p.id !== ownedPokemon?.id),
      meta: { ...saveFile.meta, activeTab: "OVERWORLD" },
    });
  };

  return (
    <>
      <BottomDrawer open={confirmationActive}>
        <div
          style={{
            margin: "6rem 4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={releaseMon}
            style={{
              backgroundColor: "darkred",
              color: "white",
            }}
          >
            Release {ownedPokemon.name}?
          </button>
        </div>
      </BottomDrawer>
      {saveFile.pokemon.length > 1 && !ownedPokemon.starter ? (
        <button onClick={() => setConfirmationActive(true)}>
          Really Release {ownedPokemon.name}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};
