import { useContext, useEffect, useState } from "react";
import { MessageBanner } from "../../components/MessageBanner/MessageBanner";
import { Sprite } from "../../components/Sprite/Sprite";
import { portraitMode } from "../../constants/baseConstants";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Overworld } from "../../modules/Overworld/Overworld";

export const LoadingScreen = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
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
  };

  return (
    <BaseSizeProvider allowedBaseSizes={portraitMode ? [32] : [64]}>
      <MessageBanner
        confirmLatestMessage={showReturnButton ? returnToWorldMap : () => {}}
        latestMessage={{
          message: showReturnButton
            ? "Return to World Map"
            : "loading lots of data",
          icon: (
            <Sprite
              canvasKey={SpriteEnum.oak}
              id={SpriteEnum.oak}
              rotating={true}
            />
          ),
        }}
      />
      <Overworld uncontrolled />
    </BaseSizeProvider>
  );
};
