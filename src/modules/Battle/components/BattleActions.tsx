import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { Inventory } from '../../../interfaces/Inventory';
import { isPokeball, PokeballType } from '../../../interfaces/Item';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { BattleStep, Opponent } from '../Battle';

export const BattleActions = ({
	inventory,
	startCatchProcess,
	voidSteps,
	battleStep,
}: {
	team: SaveFile['pokemon'];
	inventory: Inventory;
	opponent: Opponent;
	goBack: () => void;
	startCatchProcess: (ball: PokeballType) => void;
	battleStep: BattleStep;
	voidSteps: BattleStep[];
}) => {
	const balls: [PokeballType, number][] = Object.entries(inventory).filter(
		([item]) => isPokeball(item)
	) as [PokeballType, number][];

	if (voidSteps.includes(battleStep)) {
		return <></>;
	}

	return (
		<Stack mode="row">
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
		</Stack>
	);
};
