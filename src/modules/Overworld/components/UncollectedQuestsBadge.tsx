import { GoTasklist } from 'react-icons/go';
import { useNavigate } from '../../../hooks/useNavigate';
import { useQuests } from '../../../hooks/useQuests';
import './UncollectedQuestsBadge.css';
import { battleSpriteSize } from '../../../constants/gameData';

export const UncollectedQuestsBadge = ({
	stepsWalked,
}: {
	stepsWalked: number;
}): JSX.Element => {
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();
	return (
		<GoTasklist
			className={numberOfUncollected > 0 ? 'uncollectedQuestsBadge' : undefined}
			onClick={() => navigate('OVERWORLD', 'QUESTS', stepsWalked)}
			size={battleSpriteSize}
		/>
	);
};
