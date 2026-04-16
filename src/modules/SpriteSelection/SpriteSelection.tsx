import { Sprite } from "../../components/Sprite/Sprite";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";

export const SpriteSelection = ({
  proceed,
}: {
  proceed: (sprite: string) => void;
}): JSX.Element => {
  return (
    <BaseSizeProvider allowedBaseSizes={[64]}>
      <Page headline="What do you look like:">
        <Stack gap={1.5} mode="row" justifyContent="stretch">
          {Object.values(SpriteEnum).map((s) => (
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
