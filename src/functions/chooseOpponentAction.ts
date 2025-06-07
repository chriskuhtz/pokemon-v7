import { firstTurnMoves } from '../constants/groupedMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import {
	BattleFieldEffect,
	ChooseActionPayload,
} from '../modules/Battle/BattleField';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { determineHighestDamage } from './determineHighestDamage';
import { filterTargets } from './filterTargets';
import { getMovesArray } from './getMovesArray';

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

	const probablyDead =
		(controlled.lastReceivedDamage?.damage ?? 0) > controlled.stats.hp / 2;

	const filtered = filterTargets({
		targets,
		user: controlled,
		chosenAction: 'tackle',
		onlyOpponents: true,
	});

	const random = Math.random() > 0.9;

	/**
	 * IF YOU CANT DO ANYTHING, JUST LOAF
	 */
	if (moves.length === 0) {
		return {
			userId: controlled.id,
			actionName: 'LOAFING',
			targetId: filtered[0].id,
		};
	}

	const { targetId, actionName, willBeDefeated } = determineHighestDamage(
		controlled,
		moves,
		filtered,
		weather,
		terrain,
		effects
	);
	/**IF YOU CAN GET A DEFEAT, do it */
	if (willBeDefeated) {
		return { userId: controlled.id, actionName, targetId };
	}

	/**
	 * USE FIRST TURN MOVE
	 */
	const firstTurnMove = moves.find((m) => firstTurnMoves.includes(m.name));
	const canUseFirstTurnMove = firstTurnMove && controlled.roundsInBattle === 1;

	if (canUseFirstTurnMove) {
		return {
			userId: controlled.id,
			actionName: firstTurnMove.name,
			targetId: determineHighestDamage(
				controlled,
				[firstTurnMove],
				filtered,
				weather,
				terrain,
				effects
			).targetId,
		};
	}
	/**
	 * INGRAIN IF YOU HAVE IT
	 */
	const canIngrain =
		moves.find((m) => m.name === 'ingrain') &&
		!probablyDead &&
		!controlled.secondaryAilments.some((s) => s.type === 'ingrained');

	if (canIngrain) {
		return {
			userId: controlled.id,
			actionName: 'ingrain',
			targetId: controlled.id,
		};
	}
	/**
	 * CORROSIVE GAS IF YOU HAVE IT
	 */
	const canCorrosiveGas =
		moves.find((m) => m.name === 'corrosive-gas') &&
		targets.some((t) => t.ownerId !== controlled.ownerId && t.heldItemName);

	if (canCorrosiveGas) {
		return {
			userId: controlled.id,
			actionName: 'corrosive-gas',
			targetId: controlled.id,
		};
	}

	/**
	 * WEATHER CONTROL
	 */
	const weatherMoves: Record<string, WeatherType> = {
		'rain-dance': 'rain',
		sandstorm: 'sandstorm',
		hail: 'hail',
		'sunny-day': 'sun',
	};
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
	/**
	 * Terrain control
	 */
	const terrainMoves: Record<string, BattleTerrain> = {
		'psychic-terrain': 'psychic',
		'electric-terrain': 'electric',
		'misty-terrain': 'misty',
		'grassy-terrain': 'grassy',
	};
	const terrainMove = moves.find((m) =>
		Object.keys(terrainMoves).includes(m.name)
	);
	if (terrainMove && terrain !== terrainMoves[terrainMove.data.name]) {
		return {
			userId: controlled.id,
			actionName: terrainMove.name,
			targetId: controlled.id,
		};
	}

	/**
	 * SET UP SCREENS
	 */
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
	/**
	 * HEAL IF LOW ON HEALTH AND NOT DEAD ON NEXT TURN
	 */
	const healMove = moves.find(
		(m) => m.data.meta.category.name === 'heal' && m.data.target.name === 'user'
	);

	if (
		healMove &&
		controlled.damage > controlled.stats.hp * 0.33 &&
		!probablyDead &&
		!random
	) {
		return {
			userId: controlled.id,
			actionName: healMove.name,
			targetId: controlled.id,
		};
	}
	/**
	 * SETUP MOVE IF NOT BOOSTED YET AND IN GOOD HEALTH
	 */
	const setupMove = moves.find(
		(m) =>
			m.data.meta.category.name === 'net-good-stats' &&
			m.data.target.name === 'user'
	);
	if (
		setupMove &&
		Object.values(controlled.statBoosts).every((boost) => boost <= 0) &&
		!probablyDead &&
		!random
	) {
		return {
			userId: controlled.id,
			actionName: setupMove.name,
			targetId: controlled.id,
		};
	}

	/**
	 * GOOD STATUS MOVE
	 */
	const statusMove = moves.find((m) =>
		['spore', 'will-o-wisp', 'thunderwave', 'toxic', 'dark-void'].includes(
			m.name
		)
	);
	const statusTarget = targets.find(
		(t) =>
			t.status === 'ONFIELD' &&
			!t.primaryAilment &&
			t.ownerId !== controlled.ownerId
	);
	if (statusMove && statusTarget && !random) {
		return {
			userId: controlled.id,
			actionName: statusMove.name,
			targetId: statusTarget.id,
		};
	}
	/**
	 * DAMAGING MOVE
	 */

	return { userId: controlled.id, actionName, targetId };
};
