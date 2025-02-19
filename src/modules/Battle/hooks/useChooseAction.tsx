import { useCallback } from 'react';
import { MoveName } from '../../../constants/checkLists/movesCheckList';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { isHealingItem, isPokeball } from '../../../interfaces/Item';
import { ChooseActionPayload } from '../BattleField';

export const useChooseAction = (
	allOnField: BattlePokemon[],
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	battleRound: number
) => {
	return useCallback(
		({ userId, actionName, targetId }: ChooseActionPayload) => {
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
			if (isHealingItem(actionName)) {
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
									multiHits: determineMultiHits(move.data),
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
