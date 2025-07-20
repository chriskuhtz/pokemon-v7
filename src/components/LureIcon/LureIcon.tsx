import { useContext } from 'react';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { SaveFileContext } from '../../hooks/useSaveFile';

export const LureIcon = () => {
	const { saveFile } = useContext(SaveFileContext);

	if (!saveFile.activatedLure) {
		return <></>;
	}

	return (
		<img
			height={battleSpriteSize / 1.3}
			src={getItemUrl(saveFile.activatedLure)}
		/>
	);
};
