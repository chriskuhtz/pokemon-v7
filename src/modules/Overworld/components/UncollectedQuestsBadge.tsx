import { useContext } from 'react';
import { GoTasklist } from 'react-icons/go';
import { battleSpriteSize } from '../../../constants/gameData';
import { useNavigate } from '../../../hooks/useNavigate';
import { useQuests } from '../../../hooks/useQuests';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import './UncollectedQuestsBadge.css';

export const UncollectedQuestsBadge = ({
	stepsWalked,
}: {
	stepsWalked: number;
}): JSX.Element => {
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();

	const {
		saveFile: {
			location: { mapId },
		},
	} = useContext(SaveFileContext);

	if (mapId === 'challengeField') {
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
