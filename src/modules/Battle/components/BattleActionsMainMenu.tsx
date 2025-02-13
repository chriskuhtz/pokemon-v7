import { BsBackpack4 } from 'react-icons/bs';
import { FaFistRaised, FaRunning } from 'react-icons/fa';
import { MdCatchingPokemon } from 'react-icons/md';
import { baseSize } from '../../../constants/gameData';
import { PokeballType } from '../../../interfaces/Item';
import { Card } from '../../../uiComponents/Card/Card';
import { BattleMenu } from './BattleActions';

export const BattleActionsMainMenu = ({
	setMenu,
	balls,
	runAway,
}: {
	setMenu: (x: BattleMenu) => void;
	balls: [PokeballType, number][];
	runAway: () => void;
}) => {
	return (
		<div
			style={{
				display: 'grid',
				gap: '.5rem',
				alignItems: 'center',
				gridTemplateColumns: '3fr 3fr 3fr 3fr',
				padding: '0 .5rem',
			}}
		>
			<Card
				content={<h4>Moves</h4>}
				icon={<FaFistRaised size={baseSize / 2} />}
				actionElements={[]}
				onClick={() => setMenu('MOVES')}
			/>
			<Card
				content={<h4>Balls</h4>}
				icon={<MdCatchingPokemon size={baseSize / 2} />}
				actionElements={[]}
				onClick={() => setMenu('BALLS')}
				disabled={balls.length === 0}
			/>
			<Card
				content={<h4>Items</h4>}
				icon={<BsBackpack4 size={baseSize / 2} />}
				actionElements={[]}
				onClick={() => setMenu('HEALING_ITEMS')}
			/>
			<Card
				content={<h4>Run Away</h4>}
				icon={<FaRunning size={baseSize / 2} />}
				actionElements={[]}
				onClick={runAway}
			/>
		</div>
	);
};
