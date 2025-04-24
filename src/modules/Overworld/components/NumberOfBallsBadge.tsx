import { MdCatchingPokemon } from 'react-icons/md';
import { getBagLimit } from '../../../components/BagLimitBar/BagLimitBar';
import { percentageBasedColor } from '../../../constants/typeColors';
import { isPokeball } from '../../../interfaces/Item';
import { useContext, useMemo } from 'react';
import { battleSpriteSize } from '../../../constants/gameData';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const NumberOfBallsBadge = (): JSX.Element => {
	const { saveFile } = useContext(SaveFileContext);
	const numberOfBalls = useMemo(() => {
		return Object.entries(saveFile.bag)
			.filter(([item]) => isPokeball(item))
			.reduce((sum, summand) => sum + summand[1], 0);
	}, [saveFile]);
	return (
		<MdCatchingPokemon
			size={battleSpriteSize}
			color={
				percentageBasedColor(numberOfBalls / getBagLimit(saveFile.campUpgrades))
					.color
			}
		/>
	);
};
