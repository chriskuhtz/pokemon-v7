import { thrashingMoves } from '../constants/lockInMoves';
import { secondTurnMoves } from '../constants/secondTurnMoves';
import { BattleAction } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const chooseMove = (
	x: BattleAction,
	attacker: BattlePokemon,
	setAttacker: (x: BattlePokemon) => void
) => {
	if (x.type === 'CatchProcessInfo' || x.type === 'InBattleItem') {
		setAttacker({
			...attacker,
			moveQueue: [...attacker.moveQueue, x],
		});

		return;
	}
	if (secondTurnMoves.includes(x.name)) {
		setAttacker({
			...attacker,
			moveQueue: [
				...attacker.moveQueue,
				{ ...x, type: 'ChargeUp' },
				{ ...x, round: x.round + 1 },
			],
		});
		return;
	}
	if (thrashingMoves.includes(x.name)) {
		setAttacker({
			...attacker,
			moveQueue: [
				...attacker.moveQueue,
				x,
				{ ...x, round: x.round + 1 },
				Math.random() > 0.5 ? { ...x, round: x.round + 2 } : undefined,
			].filter((mq) => mq !== undefined),
		});
		return;
	}
	setAttacker({
		...attacker,
		moveQueue: [...attacker.moveQueue, x],
	});
};
