import { useCallback } from 'react';
import { applyItemToPokemon } from '../../../../functions/applyItemToPokemon';
import { BattleLocation } from '../../../../functions/determineCaptureSuccess';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { ItemType } from '../../../../interfaces/Item';
import { WeatherType } from '../../../../interfaces/Weather';
import { BattleMessage } from '../../BattleField';
import { handleAttack } from './functions/handleAttack';
import { handleCatch } from './functions/handleCatch';

export const useHandleAction = (
	pokemon: BattlePokemon[],
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	addMessage: (x: BattleMessage) => void,
	leave: (x: BattlePokemon[]) => void,
	battleWeather: WeatherType | undefined,
	addMultipleMessages: (x: BattleMessage[]) => void,
	battleRound: number,
	battleLocation: BattleLocation,
	interjectMessage: (x: BattleMessage) => void,
	addUsedItem: (x: ItemType) => void,
	scatterCoins: () => void,
	dampy: { name: string } | undefined
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
					onRemoval: () => leave(pokemon.filter((p) => p.status === 'CAUGHT')),
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
							return { ...applyItemToPokemon(p, move.item), moveQueue: [] };
						}
						if (p.id === attacker.id) {
							return { ...attacker, moveQueue: [] };
						}
						if (p.id === target.id) {
							return applyItemToPokemon(p, move.item);
						}

						return p;
					})
				);
			}
			if (move.type === 'ChargeUp') {
				addMessage({
					message: ` ${attacker.data.name} is charging up ${move.name}`,
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...attacker, moveQueue: attacker.moveQueue.slice(1) };
						}
						return p;
					})
				);
			}

			if (move.type === 'BattleAttack') {
				handleAttack({
					attacker,
					pokemon,
					setPokemon,
					addMessage: (x: string) => addMessage({ message: x }),
					move,
					battleWeather,
					scatterCoins,
					dampy,
				});
				return;
			}
		},
		[
			addMessage,
			addMultipleMessages,
			addUsedItem,
			battleLocation,
			battleRound,
			battleWeather,
			dampy,
			interjectMessage,
			leave,
			pokemon,
			scatterCoins,
			setPokemon,
		]
	);
};
