import { Sprite } from '../../components/Sprite/Sprite';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const SpriteSelection = ({
	proceed,
}: {
	proceed: (sprite: string) => void;
}): JSX.Element => {
	return (
		<Page headline="What do you look like:">
			<Stack mode="row" justifyContent="stretch">
				{Object.values(SpriteEnum).map((s) => (
					<Sprite
						rotating={true}
						key={s}
						id={`NPC_${s}`}
						onClick={() => proceed(`NPC_${s}`)}
					/>
				))}
			</Stack>
		</Page>
	);
};
