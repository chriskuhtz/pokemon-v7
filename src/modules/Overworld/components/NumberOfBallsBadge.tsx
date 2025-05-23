import { useContext, useMemo } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import { battleSpriteSize } from '../../../constants/gameData';
import { percentageBasedColor } from '../../../constants/typeColors';
import { getBagLimit } from '../../../functions/getBagLimit';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { isPokeball } from '../../../interfaces/Item';

export const NumberOfBallsBadge = (): JSX.Element => {
	const { saveFile } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);
	const numberOfBalls = useMemo(() => {
		return Object.entries(saveFile.bag)
			.filter(([item]) => isPokeball(item))
			.reduce((sum, summand) => sum + summand[1], 0);
	}, [saveFile]);
	return (
		<MdCatchingPokemon
			onClick={() =>
				addMessage({ message: `${numberOfBalls} Pokeballs in Bag` })
			}
			size={battleSpriteSize}
			color={
				percentageBasedColor(numberOfBalls / getBagLimit(saveFile.campUpgrades))
					.color
			}
		/>
	);
};
