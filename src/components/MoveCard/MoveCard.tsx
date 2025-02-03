import { baseSize } from '../../constants/gameData';
import { BattlePokemon } from '../../modules/Battle/hooks/useBattlePokemon';
import { Card } from '../../uiComponents/Card/Card';

export const MoveCard = ({ move }: { move: BattlePokemon['firstMove'] }) => {
	return (
		<Card
			icon={
				<img
					height={baseSize / 2}
					src={`/typeIcons/${move.data.type.name}.png`}
				/>
			}
			content={<h4>{move.name}</h4>}
			actionElements={[
				<strong>
					PP: {move.data.pp - move.usedPP}/{move.data.pp}
				</strong>,
			]}
		/>
	);
};
