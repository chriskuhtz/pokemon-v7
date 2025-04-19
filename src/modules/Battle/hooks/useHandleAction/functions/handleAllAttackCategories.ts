import { MoveName } from '../../../../../constants/checkLists/movesCheckList';
import { Message } from '../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';
import { checkAndHandleFainting } from '../../../functions/handleFainting';
import { handleAilmentAttack } from './attackCategories/handleAilmentAttack';
import { handleDamageAttack } from './attackCategories/handleDamageAttack';
import { handleFieldEffectMoves } from './attackCategories/handleFieldEffectMoves';
import { handleHealAttack } from './attackCategories/handleHealAttack';
import { handleNetGoodStatsAttack } from './attackCategories/handleNetGoodStatsAttack';
import { handleSwaggerAttack } from './attackCategories/handleSwaggerAttack';
import { handleUniqueMoves } from './attackCategories/handleUniqueMoves';
import { handleWholeFieldEffectAttack } from './attackCategories/handleWholeFieldEffectAttack';
import { handleAttackStart } from './handleAttackStart';

import { changeMovePP } from '../../../../../functions/changeMovePP';
import { BattleTerrain, WeatherObject } from '../../useBattleWeather';

export const handleAllAttackCategories = ({
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
	terrain,
	handleForceSwitch,
	setBattleWeather,
	leave,
	removeSpikes,
	removeScreens,
	logDamage,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	scatterCoins: () => void;
	dampy?: { name: string };
	addBattleFieldEffect: (x: BattleFieldEffect) => void;
	battleFieldEffects: BattleFieldEffect[];
	terrain: BattleTerrain | undefined;
	handleForceSwitch: (x: BattlePokemon, moveName: MoveName) => BattlePokemon[];
	setBattleWeather: (w: WeatherObject | undefined) => void;
	leave: (outcome: 'WIN' | 'LOSS' | 'DRAW') => void;
	removeSpikes: (ownerId: string) => void;
	removeScreens: (ownerId: string) => void;
	logDamage: (x: number) => void;
}) => {
	let updatedPokemon = [...pokemon];
	const { updatedPokemon: ua, targets } = handleAttackStart({
		attacker,
		pokemon,
		addMessage,
		move,
		battleWeather,
		battleFieldEffects,
		dampy,
	});

	updatedPokemon = ua;
	//determine attacker and target
	const handleMoveCategories = (
		target: BattlePokemon,
		allPokemon: BattlePokemon[],
		targetsFactor: number
	): BattlePokemon[] => {
		switch (move.data.meta.category.name) {
			case 'damage':
			case 'damage+ailment':
			case 'damage+heal':
			case 'damage+lower':
			case 'damage+raise':
			case 'ohko':
				return handleDamageAttack({
					attacker,
					pokemon: allPokemon,
					addMessage,
					move,
					battleWeather,
					battleFieldEffects,
					dampy,
					target,
					removeSpikes,
					removeScreens,
					scatterCoins,
					targetsFactor,
					logDamage,
					terrain,
				});
			case 'heal':
				return handleHealAttack({
					attacker,
					pokemon: allPokemon,
					addMessage,
					move,
					battleWeather,
				});
			case 'force-switch':
				return handleForceSwitch(attacker, move.name);
			case 'unique':
				return handleUniqueMoves({
					attacker,
					pokemon: allPokemon,
					addMessage,
					move,
					addBattleFieldEffect,
					battleFieldEffects,
					leave,
					target,
				});
			case 'field-effect':
				return handleFieldEffectMoves({
					attacker,
					pokemon: allPokemon,
					move,
					addBattleFieldEffect,
					target,
				});
			case 'ailment':
				return handleAilmentAttack({
					attacker,
					pokemon: allPokemon,
					addMessage,
					move,
					battleWeather,
					battleFieldEffects,
					target,
				});
			case 'net-good-stats':
				return handleNetGoodStatsAttack({
					attacker,
					pokemon: allPokemon,
					addMessage,
					move,
					battleFieldEffects,
					target,
				});
			case 'whole-field-effect':
				return handleWholeFieldEffectAttack({
					attacker,
					pokemon: allPokemon,
					addMessage,
					move,
					setBattleWeather,
					target,
				});
			case 'swagger':
				return handleSwaggerAttack({
					attacker,
					pokemon: allPokemon,
					addMessage,
					move,
					battleWeather,
					battleFieldEffects,
					terrain,
					target,
				});
		}
	};

	if (targets.length > 0) {
		targets.forEach((target) => {
			updatedPokemon = handleMoveCategories(
				target,
				updatedPokemon,
				1 / targets.length
			);
		});
	}

	//SetPokemon

	setPokemon(
		updatedPokemon.map((p) => {
			if (p.id === attacker.id) {
				const underPressure = battleFieldEffects.some(
					(b) => b.type === 'pressure' && b.ownerId !== attacker.ownerId
				);
				let updatedAttacker = { ...p };
				const moveQueue =
					move.multiHits > 1
						? [{ ...move, multiHits: move.multiHits - 1, isAMultiHit: true }]
						: p.moveQueue.slice(1);

				updatedAttacker =
					//only reduce pp on last multi hit
					move.isAMultiHit
						? updatedAttacker
						: changeMovePP(updatedAttacker, move.name, underPressure ? -2 : -1);

				return {
					...checkAndHandleFainting(updatedAttacker, pokemon, addMessage),
					lastUsedMove: { name: move.name, data: move.data, usedPP: 0 },
					biding:
						updatedAttacker.moveQueue.length > 0
							? updatedAttacker.biding
							: undefined,
					moveQueue,
				};
			}
			return {
				...checkAndHandleFainting(p, pokemon, addMessage),
			};
		})
	);
};
