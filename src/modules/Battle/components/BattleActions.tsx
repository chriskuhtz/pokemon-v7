import { useMemo, useState } from 'react';
import { FaFistRaised, FaRunning } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { MdCatchingPokemon } from 'react-icons/md';
import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { baseSize } from '../../../constants/gameData';
import { determineCrit } from '../../../functions/determineCrit';
import { determineMiss } from '../../../functions/determineMiss';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { recommendMove } from '../../../functions/recommendMove';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { isPokeball, PokeballType } from '../../../interfaces/Item';
import { WeatherType } from '../../../interfaces/Weather';
import { Card } from '../../../uiComponents/Card/Card';
import { BattleAction } from '../hooks/UseBattleSteps/useBattleSteps';
import { BattleStep } from '../types/BattleStep';
import { BallSelectionMenu } from './BallSelectionMenu';

export type BattleMenu = 'MAIN' | 'BALLS' | 'MOVES';
export const BattleActions = ({
	inventory,
	chooseMove,
	battleStep,
	player,
	opponent,
	runAway,
	battleWeather,
}: {
	inventory: Inventory;
	chooseMove: (x: BattleAction) => void;
	battleStep: BattleStep;
	opponent: BattlePokemon;
	player: BattlePokemon;
	runAway: () => void;
	battleWeather: WeatherType | undefined;
}) => {
	const { firstMove, secondMove, thirdMove, fourthMove } = player;
	const [menu, setMenu] = useState<BattleMenu>('MAIN');
	const balls: [PokeballType, number][] = Object.entries(inventory).filter(
		([item]) => isPokeball(item)
	) as [PokeballType, number][];

	const recommendedMove = useMemo(() => {
		return recommendMove(player, opponent, battleWeather);
	}, [battleWeather, opponent, player]);

	if (battleStep !== 'MOVE_SELECTION') {
		return <></>;
	}

	if (menu === 'BALLS') {
		return (
			<BallSelectionMenu
				inventory={inventory}
				chooseMove={chooseMove}
				opponent={opponent}
				goBack={() => setMenu('MAIN')}
			/>
		);
	}
	if (menu === 'MOVES') {
		return (
			<div
				style={{
					display: 'grid',
					gap: '.5rem',
					alignItems: 'center',
					gridTemplateColumns: '1fr 3fr 3fr 3fr 3fr',
					padding: '0 .5rem',
				}}
			>
				<IoIosArrowBack
					role="button"
					tabIndex={0}
					size={baseSize / 2}
					onClick={() => setMenu('MAIN')}
				/>
				{[firstMove, secondMove, thirdMove, fourthMove].map((m) => {
					if (m) {
						return (
							<MoveCard
								key={m.name}
								move={m}
								highlighted={recommendedMove.name === m.name}
								note={
									recommendedMove.name === m.name ? 'Recommended' : undefined
								}
								onClick={() =>
									chooseMove({
										...m,
										crit: determineCrit(
											m.name,
											m.data.meta.crit_rate,
											opponent.ability
										),
										miss: determineMiss(m, player, opponent, battleWeather),
										multiHits: determineMultiHits(m),
									})
								}
							/>
						);
					}
				})}
			</div>
		);
	}

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
				content={<h4>Run Away</h4>}
				icon={<FaRunning size={baseSize / 2} />}
				actionElements={[]}
				onClick={runAway}
			/>
		</div>
	);
};
