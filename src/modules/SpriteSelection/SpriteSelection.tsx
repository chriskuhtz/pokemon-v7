import { InGamePage } from "../../components/InGamePage/InGamePage";
import { Sprite } from "../../components/Sprite/Sprite";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { Stack } from "../../uiComponents/Stack/Stack";

export const SpriteSelection = ({
  proceed,
  headline,
  availableSprites,
}: {
  proceed: (sprite: string) => void;
  headline: string;
  availableSprites: string[];
}): JSX.Element => {
  return (
    <BaseSizeProvider allowedBaseSizes={[64]}>
      <InGamePage headline={headline}>
        <Stack gapInRem={1.5} mode="row" justifyContent="stretch">
          {availableSprites.map((s) => (
            <Sprite
              canvasKey={s}
              rotating={true}
              key={s}
              id={s}
              onClick={() => proceed(`NPC_${s}`)}
            />
          ))}
        </Stack>
      </InGamePage>
    </BaseSizeProvider>
  );
};
