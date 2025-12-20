import { useContext } from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { SpriteIcon } from '../SpriteIcon/SpriteIcon';

export const ResetSnapshotCard = () => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);

	if (!saveFile.importedChallenger) {
		return <></>;
	}

	return (
		<Card
			icon={
				saveFile.importedChallenger ? (
					<SpriteIcon sprite={saveFile.importedChallenger.sprite} />
				) : (
					<FaRegCircleQuestion size={battleSpriteSize} />
				)
			}
			content={<h3>Remove Challenger {saveFile.importedChallenger.id}</h3>}
			actionElements={[]}
			onClick={() => patchSaveFileReducer({ importedChallenger: undefined })}
		/>
	);
};
