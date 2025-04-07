import { BsBackpack4 } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

import { Octokit } from 'octokit';
import { useContext, useState } from 'react';
import { FaBug, FaSearch } from 'react-icons/fa';
import { GoTasklist } from 'react-icons/go';
import { RiBookShelfLine } from 'react-icons/ri';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { TrainerCard } from '../../components/TrainerCard/TrainerCard';
import { battleSpriteSize } from '../../constants/gameData';
import { mapsRecord } from '../../constants/maps/mapsRecord';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { useQuests } from '../../hooks/useQuests';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { useTeleport } from '../../hooks/useTeleport';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';

export const MainMenu = ({
	goBack,
	reset,
}: {
	goBack: () => void;
	reset: () => void;
}): JSX.Element => {
	const [resetConfirmationInProgress, setRCIP] = useState<boolean>(false);
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();
	const { addMessage } = useContext(MessageQueueContext);
	const { teleporter, teleportHome } = useTeleport();

	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<TrainerCard />
				{teleporter && (
					<Card
						onClick={() => teleportHome()}
						content={<h4>Teleport back to camp</h4>}
						icon={
							<PokemonSprite
								name={teleporter.name}
								config={{ officalArtwork: true, shiny: teleporter.shiny }}
							/>
						}
						actionElements={[]}
					/>
				)}
				<ExpShareButton />
				<Card
					onClick={() => navigate('MAIN', 'BAG')}
					content={<h4>Bag</h4>}
					icon={<BsBackpack4 size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'TEAM')}
					content={<h4>Team</h4>}
					icon={<MdCatchingPokemon size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'QUESTS')}
					content={<h4>Quests</h4>}
					icon={<GoTasklist size={battleSpriteSize} />}
					actionElements={
						numberOfUncollected > 0
							? [<strong>Uncollected: {numberOfUncollected}</strong>]
							: []
					}
				/>
				<Card
					onClick={() => navigate('MAIN', 'POKEDEX')}
					content={<h4>Pokedex</h4>}
					icon={<RiBookShelfLine size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'WIKI')}
					content={<h4>Wiki</h4>}
					icon={<FaSearch size={battleSpriteSize} />}
					actionElements={[]}
				/>
				{resetConfirmationInProgress ? (
					<button
						onClick={() =>
							addMessage({
								message: 'Resetting Your Save File',
								onRemoval: () => reset(),
								needsNoConfirmation: true,
							})
						}
						style={{ backgroundColor: 'darkred', color: 'white' }}
					>
						<h3>Are you sure? Click again to confirm</h3>
					</button>
				) : (
					<button
						onClick={() => setRCIP(true)}
						style={{ backgroundColor: 'darkred', color: 'white' }}
					>
						Delete Savefile and reset
					</button>
				)}
				<BugReportButton />

				{window.localStorage.getItem('devmode') &&
					Object.keys(mapsRecord).map((m) => (
						<Card
							key={m}
							onClick={() => navigate('MAIN', `MAP_MAKER_${m}`)}
							content={<h4>Map Maker {m}</h4>}
							icon={<GoTasklist size={battleSpriteSize} />}
							actionElements={[]}
						/>
					))}
			</Stack>
		</Page>
	);
};

export const ExpShareButton = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	if (saveFile.bag['exp-share'] <= 0 && saveFile.storage['exp-share'] <= 0) {
		return <></>;
	}
	return (
		<Card
			icon={<ItemSprite item={'exp-share'} />}
			onClick={() => {
				patchSaveFileReducer({
					settings: {
						...saveFile.settings,
						expShareActive: !saveFile.settings?.expShareActive,
					},
				});
			}}
			content={
				<h3>
					{saveFile.settings?.expShareActive
						? 'Every Pokemon on team gets Xp'
						: 'Only pokemon that battled get Xp'}
				</h3>
			}
			actionElements={[
				<strong>
					{saveFile.settings?.expShareActive ? 'Xp Share ON' : 'Xp Share Off'}
				</strong>,
			]}
		/>
	);
};

export const BugReportButton = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile } = useContext(SaveFileContext);
	const [bugReport, setBugReport] = useState<string>('');

	const reportBug = async (body: string) => {
		const octokit = new Octokit({
			//@ts-expect-error fu ts
			auth: import.meta.env.VITE_BUGREPORT_TOKEN,
		});

		await octokit
			.request('POST /repos/chriskuhtz/pokemon-v7/issues', {
				owner: 'OWNER',
				repo: 'REPO',
				title: `Bug found by ${saveFile.playerId}`,
				body: `${body}`,
				labels: [],
				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
				},
			})
			.then(() => {
				addMessage({
					message: 'Thank you for reporting this',
					needsNoConfirmation: true,
				});
				setBugReport('');
			});
	};

	return (
		<Card
			icon={<FaBug size={battleSpriteSize} />}
			content={
				<div>
					<h4>Report a bug</h4>
					<textarea
						cols={70}
						rows={10}
						value={bugReport}
						onChange={(e) => setBugReport(e.target.value)}
					/>
				</div>
			}
			actionElements={[
				<button onClick={() => void reportBug(bugReport)}>Submit</button>,
			]}
		/>
	);
};
