import { BattleMove, BattlePokemon } from '../interfaces/BattlePokemon';
import { ActionType, ChooseActionPayload } from '../modules/Battle/BattleField';
import { calculateDamage } from './calculateDamage';
import { determineMultiHits } from './determineMultiHits';
import { filterTargets } from './filterTargets';
import { getMovesArray } from './getMovesArray';

export const determineBestMoveAndTarget = (
	attacker: BattlePokemon,
	moves: BattleMove[],
	targets: BattlePokemon[]
): { actionName: ActionType; targetId: string } => {
	const mapped: { actionName: ActionType; targetId: string; damage: number }[] =
		moves.flatMap((move) =>
			targets.map((target) => ({
				actionName: move.name,
				targetId: target.id,
				damage: calculateDamage(
					attacker,
					target,
					{
						name: move.name,
						type: 'BattleAttack',
						round: 0,
						data: move.data,
						targetId: target.id,
						multiHits: determineMultiHits(move.data, attacker.ability),
						isAMultiHit: false,
					},
					undefined,
					[],
					false,
					false,
					false,
					1,
					() => {}
				).damage,
			}))
		);

	const sorted = mapped.sort((a, b) => b.damage - a.damage);

	return sorted[0];
};

export const chooseOpponentAction = ({
	controlled,
	targets,
}: {
	controlled: BattlePokemon;
	targets: BattlePokemon[];
}): ChooseActionPayload => {
	const moves = getMovesArray(controlled, {
		filterOutDisabled: true,
		considerEncore: true,
		considerTorment: true,
		considerTaunt: true,
		filterOutEmpty: true,
	});
	//determine the best damage move
	const filtered = filterTargets({
		targets,
		user: controlled,
		chosenAction: 'tackle',
		onlyOpponents: true,
	});

	const random = Math.random() > 0.9;

	//splash if nothing else
	if (moves.length === 0) {
		return {
			userId: controlled.id,
			actionName: 'splash',
			targetId: filtered[0].id,
		};
	}
	//ingrain if possible
	const canIngrain =
		moves.find((m) => m.name === 'ingrain') &&
		controlled.secondaryAilments.every((s) => s.type !== 'ingrained');

	if (canIngrain) {
		return {
			userId: controlled.id,
			actionName: 'ingrain',
			targetId: controlled.id,
		};
	}
	//use heal move if low
	const healMove = moves.find(
		(m) => m.data.meta.category.name === 'heal' && m.data.target.name === 'user'
	);

	if (healMove && controlled.damage > controlled.stats.hp * 0.33 && !random) {
		return {
			userId: controlled.id,
			actionName: healMove.name,
			targetId: controlled.id,
		};
	}
	//use setup on first turn
	const setupMove = moves.find(
		(m) =>
			m.data.meta.category.name === 'net-good-stats' &&
			m.data.target.name === 'user'
	);

	if (setupMove && controlled.roundsInBattle === 1 && !random) {
		return {
			userId: controlled.id,
			actionName: setupMove.name,
			targetId: controlled.id,
		};
	}

	const { targetId, actionName } = determineBestMoveAndTarget(
		controlled,
		moves,
		filtered
	);

	return { userId: controlled.id, actionName, targetId };
};
