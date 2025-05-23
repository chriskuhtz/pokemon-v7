import { useContext, useMemo } from 'react';
import {
	getBagLimit,
	getTotalInventoryAmount,
} from '../../functions/getBagLimit';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';

export const BagLimitBar = () => {
	const { saveFile } = useContext(SaveFileContext);
	const totalAmount = useMemo(
		() => getTotalInventoryAmount(saveFile.bag),
		[saveFile]
	);
	return (
		<AnimatedBar
			max={getBagLimit(saveFile.campUpgrades)}
			offset={getBagLimit(saveFile.campUpgrades) - totalAmount}
			inversedColor
			textColor="black"
		/>
	);
};
