import { useCallback } from 'react';
import { MoveName } from '../../../constants/checkLists/movesCheckList';

import {
	recoveryMoves,
	secondTurnMoves,
	thrashingMoves,
} from '../../../constants/groupedMoves';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { getRandomEntry } from '../../../functions/filterTargets';
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
	pokemon: BattlePokemon[],
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
			if (actionName === 'LOAFING') {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
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
						return p;
					})
				);
				return;
			}
			const target = pokemon.find((p) => p.id === targetId);
			if (targetId && !target) {
				throw new Error('could not find target');
			}
			if (actionName === 'SWITCH') {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
								moveQueue: [{ type: 'Switch', round: battleRound, targetId }],
							};
						}
						return p;
					})
				);
				return;
			}
			if (actionName === 'RUN_AWAY' || isRunawayItem(actionName)) {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
								moveQueue: [{ type: 'RunAway', round: battleRound }],
							};
						}
						return p;
					})
				);
				return;
			}

			if (isPokeball(actionName)) {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
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
						return p;
					})
				);
				return;
			}
			if (
				isHealingItem(actionName) ||
				isPPRestorationItem(actionName) ||
				isXItem(actionName)
			) {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
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
						return p;
					})
				);
				return;
			}

			let move = [
				user.firstMove,
				user.secondMove,
				user.thirdMove,
				user.fourthMove,
			].find((m) => m?.name === actionName);

			if (move?.name === 'assist') {
				move = getRandomEntry(
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
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
								choiceBandedMove: determineChoiceBandedMove(p, move.name),
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
						return p;
					})
				);
				return;
			}
			if (recoveryMoves.includes(actionName)) {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
								choiceBandedMove: determineChoiceBandedMove(p, move.name),
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
						return p;
					})
				);
				return;
			}
			if (thrashingMoves.includes(actionName)) {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
								choiceBandedMove: determineChoiceBandedMove(p, move.name),
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
						return p;
					})
				);
				return;
			}
			if (actionName === 'rollout' || actionName === 'ice-ball') {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
								choiceBandedMove: determineChoiceBandedMove(p, move.name),
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
						return p;
					})
				);
				return;
			}
			if (actionName === 'bide') {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
								choiceBandedMove: determineChoiceBandedMove(p, move.name),
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
						return p;
					})
				);
				return;
			}

			setPokemon((pokemon) =>
				pokemon.map((p) => {
					if (p.id === user.id) {
						const m = determineMultiHits(move.data, p.ability, getHeldItem(p));

						return {
							...user,
							choiceBandedMove: determineChoiceBandedMove(p, move.name),
							heldItemName: removePowerHerb(p, move.name),
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
					}
					return p;
				})
			);
		},
		[allOnField, battleRound, battleWeather, pokemon, setPokemon]
	);
};
