import { IoIosArrowBack } from 'react-icons/io';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { baseSize } from '../../../constants/gameData';
import { CatchProcessInfo } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { PokeballType, isPokeball } from '../../../interfaces/Item';
import { Banner } from '../../../uiComponents/Banner/Banner';
export const BallSelectionMenu = ({
	inventory,
	chooseMove,
	opponent,
	goBack,
}: {
	inventory: Inventory;
	chooseMove: (x: Omit<CatchProcessInfo, 'round'>) => void;
	opponent: BattlePokemon;
	goBack: () => void;
}) => {
	const balls: [PokeballType, number][] = Object.entries(inventory).filter(
		([item]) => isPokeball(item)
	) as [PokeballType, number][];
	return (
		<Banner>
			<>
				<IoIosArrowBack
					role="button"
					tabIndex={0}
					size={baseSize}
					onClick={goBack}
				/>
				<div
					style={{
						display: 'grid',
						gap: '.5rem',
						alignItems: 'center',
						gridTemplateColumns: '1fr 1fr 1fr',
						padding: '.5rem',
					}}
				>
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
			</>
		</Banner>
	);
};
