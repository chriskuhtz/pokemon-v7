import { MoveName } from '../../../../../constants/checkLists/movesCheckList';
import { Message } from '../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';
import { checkAndHandleFainting } from '../../../functions/handleFainting';
import { handleAilmentAttack } from './attackCategories/handleAilmentAttack';
import { handleAttack } from './attackCategories/handleAttack';
import { handleDamageAttack } from './attackCategories/handleDamageAttack';
import { handleFieldEffectMoves } from './attackCategories/handleFieldEffectMoves';
import { handleHealAttack } from './attackCategories/handleHealAttack';
import { handleNetGoodStatsAttack } from './attackCategories/handleNetGoodStatsAttack';
import { handleUniqueMoves } from './attackCategories/handleUniqueMoves';
import { handleWholeFieldEffectAttack } from './attackCategories/handleWholeFieldEffectAttack';
import { handleAttackStart } from './handleAttackStart';

import { changeMovePP } from '../../../../../functions/changeMovePP';

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
	handleForceSwitch,
	setBattleWeather,
	leave,
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
	handleForceSwitch: (x: BattlePokemon, moveName: MoveName) => BattlePokemon[];
	setBattleWeather: (w: WeatherType | undefined) => void;
	leave: (outcome: 'WIN' | 'LOSS' | 'DRAW') => void;
}) => {
	let updatedPokemon = [...pokemon];
	const {
		updatedPokemon: ua,
		canAttack,
		target,
	} = handleAttackStart({
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
	const handleMoveCategories = (target: BattlePokemon): BattlePokemon[] => {
		console.log('CATEGORY', move.data.meta.category.name);
		switch (move.data.meta.category.name) {
			case 'damage':
			case 'damage+ailment':
			case 'damage+heal':
			case 'damage+lower':
			case 'damage+raise':
			case 'ohko':
				return handleDamageAttack({
					attacker,
					pokemon,
					addMessage,
					move,
					battleWeather,
					battleFieldEffects,
					dampy,
					target,
				});
			case 'heal':
				return handleHealAttack({
					attacker,
					pokemon,
					addMessage,
					move,
				});
			case 'force-switch':
				return handleForceSwitch(attacker, move.name);
			case 'unique':
				return handleUniqueMoves({
					attacker,
					pokemon,
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
					pokemon,
					move,
					addBattleFieldEffect,
					target,
				});
			case 'ailment':
				return handleAilmentAttack({
					attacker,
					pokemon,
					addMessage,
					move,
					battleWeather,
					scatterCoins,
					setBattleWeather,
					dampy,
					addBattleFieldEffect,
					battleFieldEffects,
					target,
				});
			case 'net-good-stats':
				return handleNetGoodStatsAttack({
					attacker,
					pokemon,
					addMessage,
					move,
					battleFieldEffects,
					target,
				});
			case 'whole-field-effect':
				return handleWholeFieldEffectAttack({
					attacker,
					pokemon,
					addMessage,
					move,
					setBattleWeather,
					target,
				});
			case 'swagger':
				return handleAttack({
					attacker,
					pokemon,
					addMessage,
					move,
					battleWeather,
					scatterCoins,
					battleFieldEffects,
					target,
				});
		}
	};
	if (canAttack && target) {
		updatedPokemon = handleMoveCategories(target);
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

				updatedAttacker = changeMovePP(
					updatedAttacker,
					move.name,
					underPressure ? -2 : -1
				);

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
