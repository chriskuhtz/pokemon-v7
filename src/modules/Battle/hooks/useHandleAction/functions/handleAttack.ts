import { MoveName } from '../../../../../constants/checkLists/movesCheckList';
import { Message } from '../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../interfaces/Weather';
import { BattleFieldEffect } from '../../../BattleField';
import { handleAttack } from './attackCategories/handleAttack';
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
	handleForceSwitch: (x: BattlePokemon, moveName: MoveName) => void;
	setBattleWeather: (w: WeatherType | undefined) => void;
	leave: (outcome: 'WIN' | 'LOSS' | 'DRAW') => void;
}) => {
	//determine attacker and target
	switch (move.data.meta.category.name) {
		case 'force-switch':
			handleForceSwitch(attacker, move.name);
			break;
		case 'unique':
			handleUniqueMoves({
				attacker,
				pokemon,
				setPokemon,
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
			break;
		case 'field-effect':
			handleFieldEffectMoves({
				attacker,
				pokemon,
				setPokemon,
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
			break;
		case 'damage+raise':
			handleAttack({
				attacker,
				pokemon,
				setPokemon,
				addMessage,
				move,
				battleWeather,
				scatterCoins,
				setBattleWeather,
				dampy,
				addBattleFieldEffect,
				battleFieldEffects,
			});
			break;
		default:
			handleAttack({
				attacker,
				pokemon,
				setPokemon,
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
	//ability check
	//SetPokemon
};
