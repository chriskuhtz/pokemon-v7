import { useContext } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { Sprite } from "../../components/Sprite/Sprite";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Stack } from "../../uiComponents/Stack/Stack";

export const OakIntroduction = () => {
  const { saveFile } = useContext(SaveFileContext);
  const navigate = useNavigate();

  return (
    <InGamePage headline="">
      <Stack mode="column" alignItems="center">
        <BaseSizeProvider allowedBaseSizes={[64]}>
          <Sprite canvasKey={"oak"} id={SpriteEnum["oak"]} rotating={false} />
        </BaseSizeProvider>
        <h3>I see, so you are {saveFile.playerId}.</h3>
        <h3>Thank you for accepting the position as my research assistant.</h3>
        <h3>My Name is Samuel Oak.</h3>
        <h3>I have devoted my life to studying pokemon in the Kanto Region.</h3>
        <h3>But now, it is time for a new Adventure.</h3>
        <h3>
          We are establishing a research outpost in the uninhabited Kuma Region.
        </h3>
        <h3>Our Goal is to learn everything about the pokemon here.</h3>
        <h3>We will start out with very limited resources.</h3>
        <h3>But if we achieve research breakthroughs...</h3>
        <h3>we will attract more attention and expand our research camp.</h3>
        <h3>Safe travels, I will meet you there.</h3>
        <button onClick={() => navigate("OAK_INTRO", "OVERWORLD")}>
          Continue
        </button>
      </Stack>
    </InGamePage>
  );
};
