import { useCallback } from 'react';
import { MoveName } from '../../../constants/movesCheckList';

import {
	recoveryMoves,
	secondTurnMoves,
	thrashingMoves,
} from '../../../constants/groupedMoves';
import { struggleMove } from '../../../constants/struggle';
import { ArrayHelpers } from '../../../functions/ArrayHelpers';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { getHeldItem } from '../../../functions/getHeldItem';
import { getMovesArray } from '../../../functions/getMovesArray';
import { BattleAction } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import {
	isHealingItem,
	isPokeball,
	isPPRestorationItem,
	isRunawayItem,
	isXItem,
	ItemType,
} from '../../../interfaces/Item';
import { WeatherType } from '../../../interfaces/Weather';
import { ChooseActionPayload } from '../BattleField';

const determineChoiceBandedMove = (
	pokemon: BattlePokemon,
	chosenMove: MoveName
): MoveName | undefined => {
	if (pokemon.choiceBandedMove) {
		return pokemon.choiceBandedMove;
	}
	if (
		(getHeldItem(pokemon) === 'choice-band' ||
			getHeldItem(pokemon) === 'choice-specs' ||
			getHeldItem(pokemon) === 'choice-scarf' ||
			pokemon.ability === 'gorilla-tactics') &&
		!pokemon.choiceBandedMove
	) {
		return chosenMove;
	}

	return;
};
const removePowerHerb = (
	pokemon: BattlePokemon,
	chosenMove: MoveName
): ItemType | undefined => {
	if (
		secondTurnMoves.includes(chosenMove) &&
		getHeldItem(pokemon) === 'power-herb'
	) {
		return undefined;
	}
	return pokemon.heldItemName;
};
export const useChooseAction = (
	allOnField: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	battleRound: number,
	battleWeather: WeatherType | undefined
) => {
	return useCallback(
		({ userId, actionName, targetId, moveToRestore }: ChooseActionPayload) => {
			const user = allOnField.find((u) => u.id === userId);
			if (!user) {
				throw new Error('the user is not on the field');
			}

			setPokemon((pokemon) =>
				pokemon.map((p) => {
					if (p.id === user.id) {
						return assignActionToPokemon({
							user: p,
							userId,
							pokemon,
							battleRound,
							actionName,
							targetId,
							moveToRestore,
							battleWeather,
						});
					}
					return p;
				})
			);
		},
		[allOnField, battleRound, battleWeather, setPokemon]
	);
};

export const assignActionToPokemon = ({
	actionName,
	targetId,
	moveToRestore,
	user,
	battleRound,
	pokemon,
	battleWeather,
}: ChooseActionPayload & {
	user: BattlePokemon;
	battleRound: number;
	pokemon: BattlePokemon[];
	battleWeather: WeatherType | undefined;
}): BattlePokemon => {
	if (actionName === 'LOAFING') {
		return {
			...user,
			moveQueue: [
				{
					type: 'Loafing',
					round: battleRound,
					data: { priority: 0 },
				},
			],
		};
	}
	const target = pokemon.find((p) => p.id === targetId);
	if (targetId && !target) {
		throw new Error('could not find target');
	}
	if (actionName === 'SWITCH') {
		return {
			...user,
			moveQueue: [{ type: 'Switch', round: battleRound, targetId }],
		};
	}
	if (actionName === 'RUN_AWAY' || isRunawayItem(actionName)) {
		return {
			...user,
			moveQueue: [{ type: 'RunAway', round: battleRound }],
		};
	}

	if (isPokeball(actionName)) {
		return {
			...user,
			moveQueue: [
				{
					type: 'CatchProcessInfo',
					ball: actionName,
					round: battleRound,
					targetId,
				},
			],
		};
	}
	if (
		isHealingItem(actionName) ||
		isPPRestorationItem(actionName) ||
		isXItem(actionName)
	) {
		return {
			...user,
			moveQueue: [
				{
					type: 'InBattleItem',
					item: actionName,
					round: battleRound,
					targetId,
					moveToRestore,
				},
			],
		};
	}

	let move = [
		user.firstMove,
		user.secondMove,
		user.thirdMove,
		user.fourthMove,
		struggleMove,
	].find((m) => m?.name === actionName);

	if (move?.name === 'assist') {
		move = ArrayHelpers.getRandomEntry(
			pokemon
				.filter((p) => p.id !== user.id && p.ownerId === user.ownerId)
				.map((p) => getMovesArray(p))
				.flat()
		);
	}
	if (!move) {
		throw new Error(`user does not know the selected move, ${actionName}`);
	}

	const canSkipCharge = () => {
		if (
			battleWeather === 'sun' &&
			(actionName === 'solar-beam' || actionName === 'solar-blade')
		) {
			return true;
		}
		if (getHeldItem(user) === 'power-herb') {
			return true;
		}
		return false;
	};
	if (secondTurnMoves.includes(actionName) && !canSkipCharge()) {
		return {
			...user,
			choiceBandedMove: determineChoiceBandedMove(user, move.name),
			moveQueue: [
				{
					type: 'ChargeUp',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 1,
					targetId,
					multiHits: 0,
					isAMultiHit: false,
				},
			],
		};
	}
	if (recoveryMoves.includes(actionName)) {
		return {
			...user,
			choiceBandedMove: determineChoiceBandedMove(user, move.name),
			moveQueue: [
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound,
					targetId,
					multiHits: 0,
					isAMultiHit: false,
				},
				{
					type: 'Recover',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 1,
				},
			],
		};
	}
	if (thrashingMoves.includes(actionName)) {
		return {
			...user,
			choiceBandedMove: determineChoiceBandedMove(user, move.name),
			moveQueue: [
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound,
					targetId,
					multiHits: 0,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 1,
					targetId,
					multiHits: 0,
				},
				Math.random() > 0.5
					? {
							type: 'BattleAttack',
							data: move.data,
							name: actionName as MoveName,
							round: battleRound + 2,
							targetId,
							multiHits: 0,
					  }
					: undefined,
			].filter((m) => m !== undefined) as BattleAction[],
		};
	}
	if (actionName === 'rollout' || actionName === 'ice-ball') {
		return {
			...user,
			choiceBandedMove: determineChoiceBandedMove(user, move.name),
			moveQueue: [
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound,
					targetId,
					multiHits: 0,
					multiTurn: 1,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 1,
					targetId,
					multiHits: 0,
					multiTurn: 2,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 2,
					targetId,
					multiHits: 0,
					multiTurn: 3,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 3,
					targetId,
					multiHits: 0,
					multiTurn: 4,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 4,
					targetId,
					multiHits: 0,
					multiTurn: 5,
				},
			] as BattleAction[],
		};
	}
	if (actionName === 'bide') {
		return {
			...user,
			choiceBandedMove: determineChoiceBandedMove(user, move.name),
			moveQueue: [
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound,
					targetId,
					multiHits: 0,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 1,
					targetId,
					multiHits: 0,
				},
				{
					type: 'BattleAttack',
					data: move.data,
					name: actionName as MoveName,
					round: battleRound + 2,
					targetId,
					multiHits: 0,
				},
			] as BattleAction[],
		};
	}

	const m = determineMultiHits(move.data, user.ability, getHeldItem(user));
	return {
		...user,
		choiceBandedMove: determineChoiceBandedMove(user, move.name),
		heldItemName: removePowerHerb(user, move.name),
		moveQueue: [
			{
				type: 'BattleAttack',
				data: move.data,
				name: actionName as MoveName,
				round: battleRound,
				targetId,
				multiHits: m,
				isAMultiHit: false,
			},
		],
	};
};
