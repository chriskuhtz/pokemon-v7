import { useEffect } from 'react';
import { getMovesArray } from '../../../functions/getMovesArray';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { ActionType, ChooseActionPayload } from '../BattleField';

export function TargetSelection({
	name,
	id,
	targets,
	chooseAction,
	chosenAction,
	setChosenAction,
}: {
	name: string;
	id: string;
	targets: BattlePokemon[];
	chosenAction: ActionType;
	chooseAction: (x: ChooseActionPayload) => void;
	setChosenAction: (x: ActionType | undefined) => void;
}) {
	useEffect(() => {
		//choose the only available option, skip menu
		if (targets.length === 1) {
			chooseAction({
				userId: id,
				actionName: chosenAction,
				targetId: targets[0].id,
			});
			setChosenAction(undefined);
		}
	}, [chooseAction, chosenAction, id, setChosenAction, targets]);
	return (
		<div
			style={{
				padding: '.5rem',
			}}
		>
			<strong>
				Who is the target for {name}'s {chosenAction}?
			</strong>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
				}}
			>
				{!['ether', 'max-ether'].includes(chosenAction) &&
					targets.map((t) => (
						<button
							key={t.id}
							onClick={() => {
								chooseAction({
									userId: id,
									actionName: chosenAction,
									targetId: t.id,
								});
								setChosenAction(undefined);
							}}
						>
							{t.data.name}
						</button>
					))}
				{['ether', 'max-ether'].includes(chosenAction) &&
					targets.map((t) => {
						const moves = getMovesArray(t);

						return moves
							.filter((m) => m.usedPP > 0)
							.map((m) => (
								<button
									key={t.id + m.name}
									onClick={() => {
										chooseAction({
											userId: id,
											actionName: chosenAction,
											targetId: t.id,
											moveToRestore: m.name,
										});
										setChosenAction(undefined);
									}}
								>
									{t.data.name} {m.name}
								</button>
							));
					})}
			</div>
		</div>
	);
}
