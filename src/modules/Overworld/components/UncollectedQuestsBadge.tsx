import { useContext } from 'react';
import { GoTasklist } from 'react-icons/go';
import { battleSpriteSize } from '../../../constants/gameData/gameData';
import { questMenuAvailable } from '../../../functions/questMenuAvailable';
import { LocationContext } from '../../../hooks/LocationProvider';
import { useNavigate } from '../../../hooks/useNavigate';
import { useQuests } from '../../../hooks/useQuests';
import './UncollectedQuestsBadge.css';

export const UncollectedQuestsBadge = ({
	stepsWalked,
}: {
	stepsWalked: number;
}): JSX.Element => {
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();
	const {
		location: { mapId },
	} = useContext(LocationContext);

	if (questMenuAvailable(mapId)) {
		return <></>;
	}
	return (
		<GoTasklist
			className={numberOfUncollected > 0 ? 'uncollectedQuestsBadge' : undefined}
			onClick={() => navigate('OVERWORLD', 'QUESTS', stepsWalked)}
			size={battleSpriteSize}
		/>
	);
};
