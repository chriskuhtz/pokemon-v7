import { baseSize } from '../../constants/gameData';
import { BattlePokemon } from '../../modules/Battle/hooks/useBattlePokemon';
import { Card } from '../../uiComponents/Card/Card';

export const MoveCard = ({
	move,
	onClick,
}: {
	move: BattlePokemon['firstMove'];
	onClick: () => void;
}) => {
	const currentPP = move.data.pp - move.usedPP;
	return (
		<Card
			disabled={currentPP <= 0}
			onClick={onClick}
			icon={
				<img
					height={baseSize / 2}
					src={`/typeIcons/${move.data.type.name}.png`}
				/>
			}
			content={<h4>{move.name}</h4>}
			actionElements={[
				<strong>
					PP: {currentPP}/{move.data.pp}
				</strong>,
			]}
		/>
	);
};
