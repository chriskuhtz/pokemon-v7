import { Sprite } from "../../components/Sprite/Sprite";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { Page } from "../../uiComponents/Page/Page";
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
      <Page headline={headline}>
        <Stack gap={1.5} mode="row" justifyContent="stretch">
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
      </Page>
    </BaseSizeProvider>
  );
};
