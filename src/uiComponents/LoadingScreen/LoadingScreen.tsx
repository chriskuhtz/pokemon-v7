import { useContext, useEffect, useState } from "react";
import { Sprite } from "../../components/Sprite/Sprite";
import { portraitMode } from "../../constants/baseConstants";
import { LocationContext } from "../../hooks/LocationProvider";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Overworld } from "../../modules/Overworld/Overworld";

export const LoadingScreen = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { resetLocation } = useContext(LocationContext);
  const [showReturnButton, setShowReturnButton] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setShowReturnButton(true), 5000);

    return () => clearTimeout(t);
  }, []);
  const returnToWorldMap = () => {
    patchSaveFileReducer({
      ...saveFile,
      meta: { activeTab: "OVERWORLD" },
    });
    resetLocation();
  };

  const content = (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9000,
        display: "flex",
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.5)",
      }}
    >
      <h2>Loading lots of data</h2>
      <div style={{ display: "flex" }}>
        <Sprite
          canvasKey={SpriteEnum.elm}
          id={SpriteEnum.elm}
          rotating={true}
        />{" "}
        <Sprite
          canvasKey={SpriteEnum.oak}
          id={SpriteEnum.oak}
          rotating={true}
        />{" "}
        <Sprite
          canvasKey={SpriteEnum.rowan}
          id={SpriteEnum.rowan}
          rotating={true}
        />
      </div>
      {showReturnButton && (
        <button onClick={() => returnToWorldMap()}>Return to World Map</button>
      )}
    </div>
  );

  return (
    <>
      {content}
      <BaseSizeProvider allowedBaseSizes={portraitMode ? [32] : [64]}>
        <Overworld uncontrolled />
      </BaseSizeProvider>
    </>
  );
};
