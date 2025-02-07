import { useState } from 'react';
import { FaFistRaised, FaRunning } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { MdCatchingPokemon } from 'react-icons/md';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { baseSize } from '../../../constants/gameData';
import { BattleAttack } from '../../../interfaces/BattleAttack';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { isPokeball, PokeballType } from '../../../interfaces/Item';
import { Card } from '../../../uiComponents/Card/Card';
import { BattleMove } from '../hooks/useBattleSteps';
import { BattleStep } from '../types/BattleStep';
export const BattleActions = ({
	inventory,
	chooseMove,
	battleStep,
	firstMove,
	opponent,
	secondMove,
	fourthMove,
	thirdMove,
	runAway,
}: {
	inventory: Inventory;
	chooseMove: (x: BattleMove) => void;
	battleStep: BattleStep;
	firstMove: BattleAttack;
	secondMove?: BattleAttack;
	thirdMove?: BattleAttack;
	fourthMove?: BattleAttack;
	opponent: BattlePokemon;
	runAway: () => void;
}) => {
	const [menu, setMenu] = useState<'MAIN' | 'BALLS' | 'MOVES'>('MAIN');
	const balls: [PokeballType, number][] = Object.entries(inventory).filter(
		([item]) => isPokeball(item)
	) as [PokeballType, number][];

	if (battleStep !== 'MOVE_SELECTION') {
		return <></>;
	}

	if (menu === 'BALLS') {
		return (
			<div
				style={{
					display: 'grid',
					gap: '.5rem',
					alignItems: 'center',
					gridTemplateColumns: '1fr 3fr 3fr 3fr 3fr',
				}}
			>
				<IoIosArrowBack
					role="button"
					tabIndex={0}
					size={baseSize / 2}
					onClick={() => setMenu('MAIN')}
				/>
				{balls.map(([item, amount]) => {
					if (amount <= 0) {
						return;
					}
					return (
						<ItemCard
							key={item}
							item={item}
							amount={amount}
							actionElements={[]}
							onClick={() =>
								chooseMove({
									ball: item,
									type: 'CatchProcessInfo',
									pokemon: opponent,
								})
							}
						/>
					);
				})}
			</div>
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
				}}
			>
				<IoIosArrowBack
					role="button"
					tabIndex={0}
					size={baseSize / 2}
					onClick={() => setMenu('MAIN')}
				/>
				<MoveCard move={firstMove} onClick={() => chooseMove(firstMove)} />
				{secondMove && (
					<MoveCard move={secondMove} onClick={() => chooseMove(secondMove)} />
				)}
				{thirdMove && (
					<MoveCard move={thirdMove} onClick={() => chooseMove(thirdMove)} />
				)}
				{fourthMove && (
					<MoveCard move={fourthMove} onClick={() => chooseMove(fourthMove)} />
				)}
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
