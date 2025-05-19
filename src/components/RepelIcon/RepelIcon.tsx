import { useContext } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { SaveFileContext } from '../../hooks/useSaveFile';

export const RepelIcon = () => {
	const { saveFile } = useContext(SaveFileContext);

	if (!saveFile.activatedRepel) {
		return <></>;
	}

	return (
		<img height={battleSpriteSize} src={getItemUrl(saveFile.activatedRepel)} />
	);
};
