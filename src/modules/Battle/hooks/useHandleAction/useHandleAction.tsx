import { useCallback, useContext } from 'react';
import { MoveName } from '../../../../constants/checkLists/movesCheckList';
import { applyItemToPokemon } from '../../../../functions/applyItemToPokemon';
import { applyStatChangeToPokemon } from '../../../../functions/applyStatChangeToPokemon';
import { BattleLocation } from '../../../../functions/determineCaptureSuccess';
import { determineRunawaySuccess } from '../../../../functions/determineRunAwaySuccess';
import { getChargeUpMessage } from '../../../../functions/getChargeUpMessage';
import { getPlayerId } from '../../../../functions/getPlayerId';
import { EmptyCatchBoosts } from '../../../../functions/joinCatchBoosts';
import { Message } from '../../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../../hooks/useSaveFile';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { ItemType } from '../../../../interfaces/Item';
import { WeatherType } from '../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../BattleField';
import { handleMoveBlockAilments } from '../../functions/handleMoveBlockAilments';
import { BattleTerrain, TerrainObject } from '../useBattleTerrain';
import { WeatherObject } from '../useBattleWeather';
import { handleAllAttackCategories } from './functions/handleAllAttackCategories';
import { handleCatch } from './functions/handleCatch';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: Message) => void,
	leave: (outcome: 'WIN' | 'LOSS' | 'DRAW') => void,
	battleWeather: WeatherType | undefined,
	terrain: BattleTerrain | undefined,
	addMultipleMessages: (x: Message[]) => void,
	battleRound: number,
	battleLocation: BattleLocation,
	addUsedItem: (x: ItemType) => void,
	scatterCoins: () => void,
	dampy: { name: string } | undefined,
	handleForceSwitch: (x: BattlePokemon, moveName: MoveName) => BattlePokemon[],
	addBattleFieldEffect: (x: BattleFieldEffect) => void,
	battleFieldEffects: BattleFieldEffect[],
	setBattleWeather: (w: WeatherObject | undefined) => void,
	removeSpikes: (ownerId: string) => void,
	removeScreens: (ownerId: string) => void,
	setTerrain: (x: TerrainObject) => void
) => {
	const {
		saveFile: { pokedex, mileStones, catchBoosts },
		patchSaveFileReducer,
	} = useContext(SaveFileContext);

	const logDamage = useCallback(
		(damage: number) => {
			if (damage > mileStones.damageRecord) {
				patchSaveFileReducer({
					mileStones: { ...mileStones, damageRecord: damage },
				});
			}
		},
		[mileStones, patchSaveFileReducer]
	);
	return useCallback(
		(attacker: BattlePokemon) => {
			//CHECKS
			const move = attacker.moveQueue[0];

			if (move.type === 'Switch') {
				const target = pokemon.find((p) => p.id === move.targetId);
				if (!target) {
					throw new Error('how is there no target for switching');
				}
				addMessage({
					message: `switched in ${target.name} for ${attacker.name} `,
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							const updatedDamage =
								attacker.ability === 'regenerator'
									? Math.max(0, attacker.damage - attacker.stats.hp / 4)
									: attacker.damage;
							return {
								...attacker,
								moveQueue: [],
								status: 'BENCH',
								secondaryAilments: [],
								damage: updatedDamage,
							};
						}
						if (p.id === target.id) {
							return {
								...p,
								moveQueue: [],
								status: 'ONFIELD',
								secondaryAilments: [],
							};
						}

						return {
							...p,
							moveQueue: p.moveQueue.map((move) => {
								if (
									move.type === 'BattleAttack' &&
									move.targetId === attacker.id
								) {
									return { ...move, targetId: target.id };
								}
								return move;
							}),
						};
					})
				);
			}
			if (move.type === 'RunAway') {
				const canRun = determineRunawaySuccess(
					pokemon.filter((p) => p.ownerId === getPlayerId()),
					pokemon.filter((p) => p.ownerId !== getPlayerId())
				);
				if (canRun) {
					addMessage({
						message: `You ran away`,
						onRemoval: () => leave('DRAW'),
					});
				} else {
					addMessage({
						message: `Could not escape`,
					});
				}
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
			if (move.type === 'Loafing') {
				addMessage({
					message: `${attacker.name} is loafing around`,
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
					addUsedItem,
					pokedex,
					catchBoosts ?? EmptyCatchBoosts
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
					addMessage,
					battleFieldEffects,
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
							if (move.name === 'skull-bash') {
								return applyStatChangeToPokemon(
									{
										...updatedAttacker,
										moveQueue: attacker.moveQueue.slice(1),
									},
									'defense',
									1,
									true,
									[],
									addMessage
								);
							}
							return {
								...updatedAttacker,
								moveQueue: attacker.moveQueue.slice(1),
							};
						}
						return p;
					})
				);
			}
			if (move.type === 'Recover') {
				addMessage({
					message: `${attacker.name} has to recover`,
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return {
								...attacker,
								moveQueue: attacker.moveQueue.slice(1),
							};
						}
						return p;
					})
				);
			}

			if (move.type === 'BattleAttack') {
				handleAllAttackCategories({
					attacker,
					pokemon,
					setPokemon,
					addMessage,
					move,
					battleWeather,
					scatterCoins,
					dampy,
					addBattleFieldEffect,
					battleFieldEffects,
					handleForceSwitch,
					setBattleWeather,
					leave,
					removeSpikes,
					removeScreens,
					logDamage,
					terrain,
					setTerrain,
				});

				return;
			}
		},
		[
			pokemon,
			addMessage,
			setPokemon,
			leave,
			addMultipleMessages,
			battleRound,
			battleLocation,
			addUsedItem,
			pokedex,
			catchBoosts,
			battleFieldEffects,
			battleWeather,
			scatterCoins,
			dampy,
			addBattleFieldEffect,
			handleForceSwitch,
			setBattleWeather,
			removeSpikes,
			removeScreens,
			logDamage,
			terrain,
			setTerrain,
		]
	);
};
