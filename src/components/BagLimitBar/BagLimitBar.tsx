import { useContext, useMemo } from 'react';
import {
	getBagLimit,
	getTotalInventoryAmount,
} from '../../functions/getBagLimit';
import { GameDataContext } from '../../hooks/useGameData';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';

export const BagLimitBar = () => {
	const gameData = useContext(GameDataContext);
	const { saveFile } = useContext(SaveFileContext);
	const totalAmount = useMemo(
		() => getTotalInventoryAmount(saveFile.bag),
		[saveFile]
	);
	return (
		<AnimatedBar
			max={getBagLimit(saveFile, gameData)}
			offset={getBagLimit(saveFile, gameData) - totalAmount}
			inversedColor
			textColor="black"
		/>
	);
};
