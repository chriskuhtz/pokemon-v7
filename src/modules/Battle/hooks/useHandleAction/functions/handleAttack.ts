import { MoveName } from '../../../../../constants/checkLists/movesCheckList';
import { Message } from '../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';
import { checkAndHandleFainting } from '../../../functions/handleFainting';
import { handleAttack } from './attackCategories/handleAttack';
import { handleDamageRaiseAttack } from './attackCategories/handleDamageRaiseAttack';
import { handleFieldEffectMoves } from './attackCategories/handleFieldEffectMoves';
import { handleUniqueMoves } from './attackCategories/handleUniqueMoves';

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
	//determine attacker and target
	const handleMoveCategories = (): BattlePokemon[] => {
		switch (move.data.meta.category.name) {
			case 'force-switch':
				return handleForceSwitch(attacker, move.name);
			case 'unique':
				return handleUniqueMoves({
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
					leave,
				});
			case 'field-effect':
				return handleFieldEffectMoves({
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
					leave,
				});

			case 'damage+raise':
				return handleDamageRaiseAttack({
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
				});

			default:
				return handleAttack({
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
				});
		}
	};

	const updatedPokemon = handleMoveCategories();

	//SetPokemon

	setPokemon(
		updatedPokemon.map((p) => {
			if (p.id === attacker.id) {
				return {
					...checkAndHandleFainting(p, pokemon, addMessage),
					lastUsedMove: { name: move.name, data: move.data, usedPP: 0 },
					biding: attacker.moveQueue.length > 0 ? p.biding : undefined,
					moveQueue: [],
				};
			}
			return {
				...checkAndHandleFainting(p, pokemon, addMessage),
			};
		})
	);
};
