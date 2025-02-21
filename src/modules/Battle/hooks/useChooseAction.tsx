import { useCallback } from 'react';
import { MoveName } from '../../../constants/checkLists/movesCheckList';
import { lockInMoves } from '../../../constants/forceSwitchMoves';
import { secondTurnMoves } from '../../../constants/secondTurnMoves';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { BattleAction } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import {
	isHealingItem,
	isPokeball,
	isPPRestorationItem,
	isXItem,
} from '../../../interfaces/Item';
import { ChooseActionPayload } from '../BattleField';

export const useChooseAction = (
	allOnField: BattlePokemon[],
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	battleRound: number
) => {
	return useCallback(
		({ userId, actionName, targetId, moveToRestore }: ChooseActionPayload) => {
			const user = allOnField.find((u) => u.id === userId);
			if (!user) {
				throw new Error('the user is not on the field');
			}
			const target = pokemon.find((p) => p.id === targetId);
			if (targetId && !target) {
				throw new Error('could not find target');
			}
			if (actionName === 'RUN_AWAY') {
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

			const move = [
				user.firstMove,
				user.secondMove,
				user.thirdMove,
				user.fourthMove,
			].find((m) => m?.name === actionName);
			if (!move) {
				throw new Error('user does not know the selected move');
			}

			if (secondTurnMoves.includes(actionName)) {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
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
									},
								],
							};
						}
						return p;
					})
				);
				return;
			}
			if (lockInMoves.includes(actionName)) {
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...user,
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

			setPokemon((pokemon) =>
				pokemon.map((p) => {
					if (p.id === user.id) {
						const m = determineMultiHits(move.data);

						return {
							...user,
							moveQueue: [
								{
									type: 'BattleAttack',
									data: move.data,
									name: actionName as MoveName,
									round: battleRound,
									targetId,
									multiHits: m,
								},
							],
						};
					}
					return p;
				})
			);
		},
		[allOnField, battleRound, pokemon, setPokemon]
	);
};
