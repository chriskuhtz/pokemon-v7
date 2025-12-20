import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import { battleSpriteSize } from '../../../constants/gameData/gameData';
import { MoveName } from '../../../constants/movesCheckList';
import { getCurrentPP } from '../../../functions/getCurrentPP';
import { getMovesArray } from '../../../functions/getMovesArray';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Card } from '../../../uiComponents/Card/Card';
import { MoveInfoButton } from '../../MoveInfoButton/MoveInfoButton';

export const MovesDisplayListEntry = ({
	o,
	onlyCurrent,
	currentMoves,
	reorder,
	activateMove,
	deActivateMove,
	battlePokemon,
}: {
	o: MoveName;
	battlePokemon: BattlePokemon;
	onlyCurrent: boolean;
	currentMoves: MoveName[];
	reorder: (dir: 'UP' | 'DOWN') => void;
	activateMove: () => void;
	deActivateMove: () => void;
}) => {
	const battleMove = getMovesArray(battlePokemon).find((b) => b.name === o);
	if (!battleMove) {
		return <></>;
	}
	const currentPP = getCurrentPP(battlePokemon, battleMove);
	return (
		<div
			key={o}
			style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
		>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
				{onlyCurrent || currentMoves.length === 1
					? []
					: [
							<FaArrowUp
								key={`${o}UP`}
								onClick={(e) => {
									e.stopPropagation();
									reorder('UP');
								}}
							/>,
							<FaArrowDown
								key={`${o}DOWN`}
								onClick={(e) => {
									e.stopPropagation();
									reorder('DOWN');
								}}
							/>,
					  ]}
			</div>
			<div style={{ flexGrow: 1 }}>
				<Card
					key={o}
					actionElements={[
						<img
							height={battleSpriteSize}
							src={`/typeIcons/${battleMove.data.type.name}.png`}
						/>,
					]}
					disabled={!currentMoves.includes(o) && currentMoves.length === 4}
					icon={<MdOutlineRadioButtonChecked />}
					onClick={() => {
						if (onlyCurrent) {
							return;
						}
						if (currentMoves.includes(o)) {
							if (currentMoves.length === 1) {
								return;
							} else deActivateMove();
						}
						if (!currentMoves.includes(o)) {
							if (currentMoves.length === 4) {
								return;
							} else activateMove();
						}
					}}
					content={
						<div>
							<h4>
								{battleMove.name} (
								{battleMove.data.power ? `${battleMove.data.power} ` : ''}
								{battleMove.data.damage_class.name.slice(0, 4)})
							</h4>

							<div>
								<strong>
									PP: {currentPP}/{battleMove.data.pp}
								</strong>
							</div>
						</div>
					}
				/>
			</div>
			<MoveInfoButton movename={o} />
		</div>
	);
};
