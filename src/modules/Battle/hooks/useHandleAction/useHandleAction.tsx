import { useCallback } from 'react';
import { MoveName } from '../../../../constants/checkLists/movesCheckList';
import { forceSwitchMoves } from '../../../../constants/forceSwitchMoves';
import { applyItemToPokemon } from '../../../../functions/applyItemToPokemon';
import { BattleLocation } from '../../../../functions/determineCaptureSuccess';
import { getChargeUpMessage } from '../../../../functions/getChargeUpMessage';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { ItemType } from '../../../../interfaces/Item';
import { WeatherType } from '../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../BattleField';
import { handleMoveBlockAilments } from '../../functions/handleMoveBlockAilments';
import { handleAttack } from './functions/handleAttack';
import { handleCatch } from './functions/handleCatch';
import { Message } from '../../../../hooks/useMessageQueue';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: Message) => void,
	leave: () => void,
	battleWeather: WeatherType | undefined,
	addMultipleMessages: (x: Message[]) => void,
	battleRound: number,
	battleLocation: BattleLocation,
	interjectMessage: (x: Message) => void,
	addUsedItem: (x: ItemType) => void,
	scatterCoins: () => void,
	dampy: { name: string } | undefined,
	handleForceSwitch: (x: BattlePokemon, moveName: MoveName) => void,
	addBattleFieldEffect: (x: BattleFieldEffect) => void,
	battleFieldEffects: BattleFieldEffect[]
) => {
	return useCallback(
		(attacker: BattlePokemon) => {
			//CHECKS
			const move = attacker.moveQueue[0];
			if (
				![
					'BattleAttack',
					'CatchProcessInfo',
					'RunAway',
					'InBattleItem',
					'ChargeUp',
				].includes(move.type)
			) {
				throw new Error('cant handle this yet');
			}
			if (move.type === 'RunAway') {
				addMessage({
					message: `You ran away`,
					onRemoval: () => leave(),
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...p, moveQueue: [] };
						}

						return p;
					})
				);
				return;
			}
			if (move.type === 'CatchProcessInfo') {
				handleCatch(
					pokemon,
					attacker,
					setPokemon,
					move,
					addMultipleMessages,
					battleRound,
					battleLocation,
					interjectMessage,
					addUsedItem
				);
			}
			if (move.type === 'InBattleItem') {
				const target = pokemon.find((p) => p.id === move.targetId);
				if (!target) {
					throw new Error('how is there no target for an item');
				}
				addUsedItem(move.item);
				addMessage({
					message: `applied the ${move.item} to ${target.data.name} `,
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (target.id === attacker.id && p.id === attacker.id) {
							return {
								...applyItemToPokemon(
									p,
									move.item,
									undefined,
									move.moveToRestore
								),
								moveQueue: [],
							};
						}
						if (p.id === attacker.id) {
							return { ...attacker, moveQueue: [] };
						}
						if (p.id === target.id) {
							return applyItemToPokemon(
								p,
								move.item,
								undefined,
								move.moveToRestore
							);
						}

						return p;
					})
				);
			}
			if (move.type === 'ChargeUp') {
				const { canAttack, updatedAttacker } = handleMoveBlockAilments({
					attacker,
					attack: move,
					addMessage: (x: string) => addMessage({ message: x }),
				});

				if (!canAttack) {
					setPokemon((pokemon) =>
						pokemon.map((p) => {
							if (p.id === updatedAttacker.id) {
								return updatedAttacker;
							}
							return p;
						})
					);
					return;
				}
				addMessage({
					message: getChargeUpMessage(updatedAttacker.data.name, move.name),
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return {
								...updatedAttacker,
								moveQueue: attacker.moveQueue.slice(1),
							};
						}
						return p;
					})
				);
			}

			if (move.type === 'BattleAttack') {
				if (forceSwitchMoves.includes(move.name)) {
					handleForceSwitch(attacker, move.name);
					return;
				}
				handleAttack({
					attacker,
					pokemon,
					setPokemon,
					addMessage: (x: string) => addMessage({ message: x }),
					move,
					battleWeather,
					scatterCoins,
					dampy,
					addBattleFieldEffect,
					battleFieldEffects,
				});
				return;
			}
		},
		[
			addBattleFieldEffect,
			addMessage,
			addMultipleMessages,
			addUsedItem,
			battleFieldEffects,
			battleLocation,
			battleRound,
			battleWeather,
			dampy,
			handleForceSwitch,
			interjectMessage,
			leave,
			pokemon,
			scatterCoins,
			setPokemon,
		]
	);
};
