import { baseSize } from '../../constants/gameData';
import { BattleAttack } from '../../interfaces/BattleActions';
import { Card } from '../../uiComponents/Card/Card';

export const MoveCard = ({
	move,
	onClick,
	highlighted,
	note,
}: {
	move: BattleAttack;
	onClick: () => void;
	highlighted?: boolean;
	note?: string;
}) => {
	const currentPP = move.data.pp - move.usedPP;
	return (
		<Card
			highlighted={highlighted}
			disabled={currentPP <= 0}
			onClick={onClick}
			icon={
				<img
					height={baseSize / 2}
					src={`/typeIcons/${move.data.type.name}.png`}
				/>
			}
			content={
				<div>
					<h4>{move.name}</h4>
					{note && <h6>{note}</h6>}
				</div>
			}
			actionElements={[
				<strong>
					PP: {currentPP}/{move.data.pp}
				</strong>,
			]}
		/>
	);
};
