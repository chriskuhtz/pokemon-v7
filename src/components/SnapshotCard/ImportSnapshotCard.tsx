import { useContext, useCallback } from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ImportedChallenger } from '../../interfaces/SaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { SpriteIcon } from '../SpriteIcon/SpriteIcon';

export const ImportSnapshotCard = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);

	const parseImport = useCallback(
		(input: string): ImportedChallenger | undefined => {
			if (
				input.includes('=') ||
				input.includes(')') ||
				input.includes('(') ||
				input.includes(';') ||
				input.includes('<') ||
				input.includes('>') ||
				input.includes('`')
			) {
				return;
			}
			const parsed = JSON.parse(input);

			if (
				!parsed['team'] ||
				!parsed['mapId'] ||
				!parsed['battleTeamConfig'] ||
				!parsed['x'] ||
				!parsed['y'] ||
				!parsed['id']
			) {
				return;
			}

			return parsed as ImportedChallenger;
		},
		[]
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader();
		if (!e.target?.files) {
			return;
		}
		fileReader.readAsText(e.target?.files[0], 'UTF-8');
		fileReader.onload = (e) => {
			if (e.target?.result) {
				if (typeof e.target.result !== 'string') {
					console.error(typeof e.target.result);
					return;
				}

				const challenger = parseImport(e.target.result as string);

				if (challenger) {
					addMessage({ message: `Challenger ${challenger.id} has arrived` });
					patchSaveFileReducer({ importedChallenger: challenger });
				} else addMessage({ message: 'This is not a valid challenger import' });
			}
		};
	};
	return (
		<Card
			icon={
				saveFile.importedChallenger ? (
					<SpriteIcon sprite={saveFile.importedChallenger.sprite} />
				) : (
					<FaRegCircleQuestion size={battleSpriteSize} />
				)
			}
			content={
				<h3>
					{saveFile.importedChallenger
						? `Overwrite Challenger ${saveFile.importedChallenger.id}?`
						: 'Import a Challenger File from a friend'}
				</h3>
			}
			actionElements={[
				<input
					style={{
						width: '8rem',
						padding: '0.5rem',
						border: '2px solid black',
						borderRadius: '9000px',
						backgroundColor: 'rgba(255, 255, 255, 0.5)',
						color: 'black',
					}}
					type="file"
					onChange={handleChange}
				/>,
			]}
		/>
	);
};
