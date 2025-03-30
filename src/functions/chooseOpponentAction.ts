import { BattlePokemon, BattleMove } from '../interfaces/BattlePokemon';
import { ActionType, ChooseActionPayload } from '../modules/Battle/BattleField';
import { calculateDamage } from './calculateDamage';
import { determineMultiHits } from './determineMultiHits';
import { filterTargets } from './filterTargets';
import { getMovesArray } from './getMovesArray';

export type PokemonProfile = 'AGGRESSIVE';

export const determinePokemonProfile = (): PokemonProfile => {
	//always try to do the most damage immediately
	return 'AGGRESSIVE';
};

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
						multiHits: determineMultiHits(move.data),
					},
					undefined,
					[],
					false,
					false,
					false,
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
	//const profile = determinePokemonProfile();

	//IF PROFILE AGGRESSIVE
	const moves = getMovesArray(controlled, {
		filterOutDisabled: true,
		filterOutEmpty: true,
	});

	const filtered = filterTargets({
		targets,
		user: controlled,
		chosenAction: 'tackle', //just assume its an attacking move
		onlyOpponents: true,
	});

	if (moves.length === 0) {
		return {
			userId: controlled.id,
			actionName: 'splash',
			targetId: filtered[0].id,
		};
	}

	const { targetId, actionName } = determineBestMoveAndTarget(
		controlled,
		moves,
		filtered
	);

	return { userId: controlled.id, actionName, targetId };
};
