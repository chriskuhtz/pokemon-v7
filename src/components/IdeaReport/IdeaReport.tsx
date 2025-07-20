import { Octokit } from 'octokit';
import { useContext, useState } from 'react';
import { IoBulbOutline } from 'react-icons/io5';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';

export const IdeaButton = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile } = useContext(SaveFileContext);
	const [bugReport, setBugReport] = useState<string>('');

	const reportIdea = async (body: string) => {
		const octokit = new Octokit({
			//@ts-expect-error fu ts
			auth: import.meta.env.VITE_BUGREPORT_TOKEN,
		});

		await octokit
			.request('POST /repos/chriskuhtz/pokemon-v7/issues', {
				owner: 'OWNER',
				repo: 'REPO',
				title: `Idea from ${saveFile.playerId}`,
				body: `${body}`,
				labels: ['feedback'],
				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
				},
			})
			.then(() => {
				addMessage({
					message: 'Thank you for your feedback',
					needsNoConfirmation: true,
				});
				setBugReport('');
			});
	};

	return (
		<div style={{ marginBottom: '10rem' }}>
			<Card
				icon={<IoBulbOutline size={battleSpriteSize} />}
				content={
					<div>
						<h3>What is your Feedback/Idea:</h3>
						<textarea
							style={{ width: '90%' }}
							cols={70}
							rows={10}
							value={bugReport}
							onChange={(e) => setBugReport(e.target.value)}
						/>
					</div>
				}
				actionElements={[
					<button onClick={() => void reportIdea(bugReport)}>Submit</button>,
				]}
			/>
		</div>
	);
};
