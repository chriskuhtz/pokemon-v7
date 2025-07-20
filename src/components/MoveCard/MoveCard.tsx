import { battleSpriteSize } from '../../constants/gameData/gameData';
import { BattleMove } from '../../interfaces/BattlePokemon';
import { Card } from '../../uiComponents/Card/Card';

export const MoveCard = ({
	move,
	onClick,
	highlighted,
	boostedBy,
}: {
	move: BattleMove;
	onClick: () => void;
	highlighted?: boolean;
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
					<h4>
						{move.name} ({move.data.power ? `${move.data.power} ` : ''}
						{move.data.damage_class.name.slice(0, 4)})
					</h4>

					<div>
						<strong>
							PP: {currentPP}/{move.data.pp}
						</strong>
					</div>
				</div>
			}
			actionElements={[]}
		/>
	);
};
