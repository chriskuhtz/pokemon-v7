import { Sprite } from '../../components/Sprite/Sprite';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const newestChangeLog = '0.19';

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
					<button
						onClick={() => {
							setHasReadIntro(true);
							window.localStorage.setItem(newestChangeLog, 'true');
						}}
					>
						Got it, lets go
					</button>
					<ChangeLogV19 />
					<ChangeLogV18 />
					<ChangeLogV17 />
					<ChangeLogV16 />
					<ChangeLogV15 />
					<ChangeLogV14 />
					<ChangeLogV13 />
					<ChangeLogV12 />
					<ChangeLogV11 />
					<ChangeLogV10 />
					<ChangeLogV09 />
					<ChangeLogV08 />
					<ChangeLogV07 />
					<ChangeLogV06 />
					<ChangeLogV05 />
					<ChangeLogV04 />
				</Stack>
			</div>
		</Page>
	);
};
const ChangeLogV19 = (): JSX.Element => {
	return (
		<>
			<h3>0.19:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Make first Route Pokemon a little weaker</li>
				<li>Giovanni</li>
				<li>Lures at vileplume shop</li>
				<li>Item Info Button in Bag</li>
				<li>New Cooking Recipes</li>
				<li>No Key Items as Randomized Held Items</li>
			</ol>
		</>
	);
};
const ChangeLogV18 = (): JSX.Element => {
	return (
		<>
			<h3>0.18:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Move Info Button</li>
				<li>Ability Info Button</li>
			</ol>
		</>
	);
};
const ChangeLogV17 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.17:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Movement Buttons can be hidden</li>
				<li>Make Starter Quest work for randomized starters</li>
				<li>Fixed Uppercase/Lowercase inputs</li>
				<li>Better Pokeball indicator</li>
			</ol>
		</>
	);
};
const ChangeLogV16 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.16:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Team Rocket</li>
				<li>Improved Campupgrade screen</li>
				<li>Various minor fixes</li>
			</ol>
		</>
	);
};
const ChangeLogV15 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.15:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Infinite Repel that can be toggled</li>
				<li>Better Storage Sorting</li>
				<li>New Training Field Trainer</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV14 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.14:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New fossils</li>
				<li>New historian quest</li>
				<li>New static pokemon</li>
				<li>Various minor fixes</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV13 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.13:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New sorting options for pokemon</li>
				<li>Various minor fixes</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV12 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.12:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Pokeball Amount Indicator </li>
				<li>Training field 5</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV11 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.11:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Mulches</li>
			</ol>
		</>
	);
};
const ChangeLogV10 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.10:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Challenge Field</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV09 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.9:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Kanto Gym Leaders appear for special battles</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV08 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.8:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Opponents set up screens</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV07 = (): JSX.Element => {
	return (
		<>
			<h3>V 0.7:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Repair Hyper Beam</li>
				<li>Take all/Store all by clicking on arrow</li>
			</ol>
		</>
	);
};
const ChangeLogV06 = (): JSX.Element => {
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

const ChangeLogV05 = (): JSX.Element => {
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

const ChangeLogV04 = (): JSX.Element => {
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
