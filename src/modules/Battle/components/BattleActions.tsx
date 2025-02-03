import { useState } from 'react';
import { FaFistRaised } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { MdCatchingPokemon } from 'react-icons/md';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { baseSize } from '../../../constants/gameData';
import { Inventory } from '../../../interfaces/Inventory';
import { isPokeball, PokeballType } from '../../../interfaces/Item';
import { Card } from '../../../uiComponents/Card/Card';
import { BattleStep } from '../Battle';
import { BattlePokemon } from '../hooks/useBattlePokemon';
import { MoveCard } from '../../../components/MoveCard/MoveCard';

export const BattleActions = ({
	inventory,
	startCatchProcess,
	voidSteps,
	battleStep,
	firstMove,
}: {
	inventory: Inventory;
	startCatchProcess: (ball: PokeballType) => void;
	battleStep: BattleStep;
	firstMove: BattlePokemon['firstMove'];
	voidSteps: BattleStep[];
}) => {
	const [menu, setMenu] = useState<'MAIN' | 'BALLS' | 'MOVES'>('MAIN');
	const balls: [PokeballType, number][] = Object.entries(inventory).filter(
		([item]) => isPokeball(item)
	) as [PokeballType, number][];

	if (voidSteps.includes(battleStep)) {
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
							onClick={() => startCatchProcess(item)}
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
				<MoveCard move={firstMove} />
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
		</div>
	);
};
