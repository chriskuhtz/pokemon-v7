import { Sprite } from '../../components/Sprite/Sprite';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const newestChangeLog = '0.6';

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
					<ChangeLogV06 />
					<ChangeLogV05 />
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
export const ChangeLogV06 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.6:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Better Iv and Ev display</li>
				<li>Fix Multihit PP Usage</li>
			</ol>
		</>
	);
};

export const ChangeLogV05 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.5:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				{' '}
				<li>Fixed Ability: Moody</li>
				<li>Fixed Setting: Random Abilities</li>
			</ol>
		</>
	);
};

export const ChangeLogV04 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.4:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Improved Amoongus Trades</li>
				<li>Setting: Random Held Items</li>
				<li>Setting: Random Abilities</li>
				<li>Setting: Random Learnable Moves</li>
				<li>Opponent decisions consider weather & effects </li>
				<li>Fixed Weather Display and Message</li>
				<li>CampUpgrade: Historian</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
