import { Octokit } from 'octokit';
import { useContext, useState } from 'react';
import { FaBug } from 'react-icons/fa';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';

export const BugReportButton = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
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
				labels: ['bug'],
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
				patchSaveFileReducer({
					...saveFile,
					mileStones: { ...saveFile.mileStones, hasReportedBug: true },
				});
			});
	};

	return (
		<Card
			icon={<FaBug size={battleSpriteSize} />}
			content={
				<div>
					<h3>Report a bug:</h3>
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
				<button onClick={() => void reportBug(bugReport)}>Submit</button>,
			]}
		/>
	);
};
