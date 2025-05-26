import { Sprite } from '../../components/Sprite/Sprite';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const newestChangeLog = '0.39';

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
					<ChangeLogV39 />
					<ChangeLogV38 />
					<ChangeLogV37 />
					<ChangeLogV36 />
					<ChangeLogV35 />
					<ChangeLogV34 />
					<ChangeLogV33 />
					<ChangeLogV32 />
					<ChangeLogV31 />
					<ChangeLogV30 />
					<ChangeLogV29 />
					<ChangeLogV28 />
					<ChangeLogV27 />
					<ChangeLogV26 />
					<ChangeLogV25 />
					<ChangeLogV24 />
					<ChangeLogV23 />
					<ChangeLogV22 />
					<ChangeLogV21 />
					<ChangeLogV20 />
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
const ChangeLogV39 = (): JSX.Element => {
	return (
		<>
			<h3>0.39:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Evil Teams leave after 3 Hours</li>
				<li>Evil Teams level scale with you</li>
				<li>Balancing and Fixes</li>
				<li>New Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV38 = (): JSX.Element => {
	return (
		<>
			<h3>0.38:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Internal Dex</li>
				<li>New evil team</li>
				<li>New Features</li>
				<li>Balancing and Fixes</li>
				<li>New Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV37 = (): JSX.Element => {
	return (
		<>
			<h3>0.37:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Features</li>
				<li>Balancing and Fixes</li>
				<li>New Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV36 = (): JSX.Element => {
	return (
		<>
			<h3>0.36:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Camp Upgrades</li>
				<li>New evil teams</li>
				<li>Balancing and Fixes</li>
				<li>New Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV35 = (): JSX.Element => {
	return (
		<>
			<h3>0.35:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New camp upgrades</li>
				<li>New Travelling Trainers</li>
				<li>New Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV34 = (): JSX.Element => {
	return (
		<>
			<h3>0.34:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Catch Streaks</li>
				<li>New Travelling Trainer</li>
				<li>fixes, balancing and improvements</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV33 = (): JSX.Element => {
	return (
		<>
			<h3>0.33:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Quest Categories</li>
				<li>New Travelling Trainer</li>
				<li>fixes, balancing and improvements</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV32 = (): JSX.Element => {
	return (
		<>
			<h3>0.32:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Training field mode</li>
				<li>fixes, balancing and improvements</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV31 = (): JSX.Element => {
	return (
		<>
			<h3>0.31:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Travelling Trainer</li>
				<li>fixes and improvements</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV30 = (): JSX.Element => {
	return (
		<>
			<h3>0.30:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>fixes and improvements</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV29 = (): JSX.Element => {
	return (
		<>
			<h3>0.29:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Travelling Trainer</li>
				<li>New Upgrades</li>
				<li>Balancing</li>
				<li>UI Improvements</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV28 = (): JSX.Element => {
	return (
		<>
			<h3>0.28:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV27 = (): JSX.Element => {
	return (
		<>
			<h3>0.27:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Favorites System</li>
				<li>New Quests</li>
				<li>Catchboosts as quest rewards</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV26 = (): JSX.Element => {
	return (
		<>
			<h3>0.26:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Sorting options</li>
			</ol>
		</>
	);
};
const ChangeLogV25 = (): JSX.Element => {
	return (
		<>
			<h3>0.25:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Quests</li>
				<li>New Camp Upgrades</li>
				<li>UI Improvements</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV24 = (): JSX.Element => {
	return (
		<>
			<h3>0.24:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Performance Improvements</li>
				<li>UI Improvements</li>
				<li>Wild Apricorn Trees</li>
				<li>Rocket Camp Raid</li>
				<li>New Quests</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV23 = (): JSX.Element => {
	return (
		<>
			<h3>0.23:</h3>
			<ol style={{ lineHeight: '1.5rem' }}>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};

const ChangeLogV22 = (): JSX.Element => {
	return (
		<>
			<h3>0.22:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Fixed Random Abilities</li>
				<li>Fixed Challenge Field Ranks</li>
				<li>Terrain Items</li>
				<li>New Quest line</li>
				<li>All Items with battle effects finished</li>
				<li>New Abilities and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV21 = (): JSX.Element => {
	return (
		<>
			<h3>0.21:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Balls are no longer wasted if the target isnt there anymore</li>
				<li>Cant select last Pokeball twice anymore</li>
				<li>Fix Cooking Ingredient Requirements</li>
				<li>Travelling Merchant</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
	);
};
const ChangeLogV20 = (): JSX.Element => {
	return (
		<>
			<h3>0.20:</h3>

			<ol style={{ lineHeight: '1.5rem' }}>
				<li>Battle Terrain Abilities</li>
				<li>New Abilities, Items and Attacks</li>
			</ol>
		</>
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
				<li>New Abilities, Items and Attacks</li>
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
				<li>New Abilities, Items and Attacks</li>
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
				<li>New Abilities, Items and Attacks</li>
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
