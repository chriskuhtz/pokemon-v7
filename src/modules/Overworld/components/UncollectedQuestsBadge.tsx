import { GoTasklist } from 'react-icons/go';
import { baseSize } from '../../../constants/gameData';
import { useNavigate } from '../../../hooks/useNavigate';
import { useQuests } from '../../../hooks/useQuests';

export const UncollectedQuestsBadge = ({
	stepsWalked,
}: {
	stepsWalked: number;
}): JSX.Element => {
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();
	return numberOfUncollected > 0 ? (
		<GoTasklist
			onClick={() => navigate('OVERWORLD', 'QUESTS', stepsWalked)}
			style={{ color: 'green' }}
			size={baseSize / 2}
		/>
	) : (
		<></>
	);
};
