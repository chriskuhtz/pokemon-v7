import { Sprite } from '../../components/Sprite/Sprite';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const newestChangeLog = '0.4';

export const ChangeLog = ({
	setHasReadIntro,
}: {
	setHasReadIntro: (x: boolean) => void;
}) => {
	return (
		<Page headline="">
			<div style={{ padding: '2rem' }}>
				<Stack alignItems="center" mode="column">
					<div>
						<Sprite
							canvasKey={'yaya'}
							rotating={false}
							key={'yaya'}
							id={SpriteEnum.nerd}
						/>
					</div>
					<h3>Changelog:</h3>
					<ChangeLogV04 />

					<button
						onClick={() => {
							setHasReadIntro(true);
							window.localStorage.setItem(newestChangeLog, 'true');
						}}
					>
						Got it, lets go
					</button>
				</Stack>
			</div>
		</Page>
	);
};

export const ChangeLogV04 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.4:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Improved Amoongus Trades</li>
			</ol>
		</>
	);
};
