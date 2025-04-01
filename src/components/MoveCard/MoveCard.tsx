import { battleSpriteSize } from '../../constants/gameData';
import { BattleMove } from '../../interfaces/BattlePokemon';
import { Card } from '../../uiComponents/Card/Card';

export const MoveCard = ({
	move,
	onClick,
	highlighted,
	note,
	boostedBy,
}: {
	move: BattleMove;
	onClick: () => void;
	highlighted?: boolean;
	note?: string;
	boostedBy?: number;
}) => {
	const boostfactor = () => {
		if (boostedBy === 1) {
			return 1.2;
		}
		if (boostedBy === 2) {
			return 1.4;
		}
		if (boostedBy === 3) {
			return 1.6;
		}
		return 1;
	};
	const currentPP = move.data.pp * boostfactor() - move.usedPP;

	return (
		<Card
			highlighted={highlighted}
			disabled={currentPP <= 0}
			onClick={onClick}
			icon={
				<img
					height={battleSpriteSize}
					src={`/typeIcons/${move.data.type.name}.png`}
				/>
			}
			content={
				<div>
					<h4>{move.name}</h4>
					<strong>
						PP: {currentPP}/{move.data.pp}
					</strong>
					,{note && <h6>{note}</h6>}
				</div>
			}
			actionElements={[]}
		/>
	);
};
