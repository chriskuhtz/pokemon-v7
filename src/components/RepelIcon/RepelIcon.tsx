import { useContext } from 'react';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { SaveFileContext } from '../../hooks/useSaveFile';

export const RepelIcon = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	if (!saveFile.activatedRepel) {
		return <></>;
	}

	return (
		<img
			onClick={() => patchSaveFileReducer({ activatedRepel: undefined })}
			height={battleSpriteSize}
			src={getItemUrl(saveFile.activatedRepel)}
		/>
	);
};
