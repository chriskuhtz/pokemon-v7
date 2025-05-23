import { BattleMove, BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import {
	ActionType,
	BattleFieldEffect,
	ChooseActionPayload,
} from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { calculateDamage } from './calculateDamage';
import { determineMultiHits } from './determineMultiHits';
import { filterTargets } from './filterTargets';
import { getHeldItem } from './getHeldItem';
import { getMovesArray } from './getMovesArray';

export const determineHighestDamage = (
	attacker: BattlePokemon,
	moves: BattleMove[],
	targets: BattlePokemon[],
	weather: WeatherType | undefined,
	terrain: BattleTerrain | undefined,
	effects: BattleFieldEffect[]
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
						multiHits: determineMultiHits(
							move.data,
							attacker.ability,
							getHeldItem(attacker)
						),
						isAMultiHit: false,
					},
					weather,
					effects,
					terrain,
					false,
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
	weather,
	terrain,
	effects,
}: {
	controlled: BattlePokemon;
	targets: BattlePokemon[];
	weather: WeatherType | undefined;
	terrain: BattleTerrain | undefined;
	effects: BattleFieldEffect[];
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

	//loaf if nothing else
	if (moves.length === 0) {
		return {
			userId: controlled.id,
			actionName: 'LOAFING',
			targetId: filtered[0].id,
		};
	}
	//ingrain if possible
	const canIngrain =
		moves.find((m) => m.name === 'ingrain') &&
		!controlled.secondaryAilments.some((s) => s.type === 'ingrained');

	if (canIngrain) {
		return {
			userId: controlled.id,
			actionName: 'ingrain',
			targetId: controlled.id,
		};
	}

	const weatherMoves: Record<string, WeatherType> = {
		'rain-dance': 'rain',
		sandstorm: 'sandstorm',
		hail: 'hail',
		'sunny-day': 'sun',
	};

	//weather control
	const weatherMove = moves.find((m) =>
		Object.keys(weatherMoves).includes(m.name)
	);
	if (weatherMove && weather !== weatherMoves[weatherMove.data.name]) {
		return {
			userId: controlled.id,
			actionName: weatherMove.name,
			targetId: controlled.id,
		};
	}

	//screens if possible
	const reflect =
		moves.find((m) => m.name === 'reflect') &&
		!effects.some(
			(e) => e.type === 'reflect' && e.ownerId === controlled.ownerId
		);

	if (reflect) {
		return {
			userId: controlled.id,
			actionName: 'reflect',
			targetId: controlled.id,
		};
	}
	const lightScreen =
		moves.find((m) => m.name === 'light-screen') &&
		!effects.some(
			(e) => e.type === 'light-screen' && e.ownerId === controlled.ownerId
		);

	if (lightScreen) {
		return {
			userId: controlled.id,
			actionName: 'light-screen',
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

	const { targetId, actionName } = determineHighestDamage(
		controlled,
		moves,
		filtered,
		weather,
		terrain,
		effects
	);

	return { userId: controlled.id, actionName, targetId };
};
