import { useState } from 'react';
import { BattleAction } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { isPokeball, PokeballType } from '../../../interfaces/Item';
import { WeatherType } from '../../../interfaces/Weather';
import { BattleStep } from '../types/BattleStep';
import { BallSelectionMenu } from './BallSelectionMenu';
import { BattleActionsMainMenu } from './BattleActionsMainMenu';
import { HealingItemSelectionMenu } from './HealingItemSelectionMenu';
import { MoveSelectionMenu } from './MoveSelectionMenu';

export type BattleMenu = 'MAIN' | 'BALLS' | 'MOVES' | 'HEALING_ITEMS';

export const BattleActions = ({
	inventory,
	chooseMove,
	battleStep,
	player,
	opponent,
	runAway,
	battleWeather,
	battleRound,
}: {
	inventory: Inventory;
	chooseMove: (x: BattleAction) => void;
	battleStep: BattleStep;
	opponent: BattlePokemon;
	player: BattlePokemon;
	runAway: () => void;
	battleWeather: WeatherType | undefined;
	battleRound: number;
}) => {
	const [menu, setMenu] = useState<BattleMenu>('MAIN');
	const balls: [PokeballType, number][] = Object.entries(inventory).filter(
		([item]) => isPokeball(item)
	) as [PokeballType, number][];

	if (battleStep !== 'MOVE_SELECTION') {
		return <></>;
	}

	if (menu === 'BALLS') {
		return (
			<BallSelectionMenu
				inventory={inventory}
				chooseMove={(x) => chooseMove({ ...x, round: battleRound })}
				opponent={opponent}
				goBack={() => setMenu('MAIN')}
			/>
		);
	}
	if (menu === 'HEALING_ITEMS') {
		return (
			<HealingItemSelectionMenu
				inventory={inventory}
				chooseMove={(x) => chooseMove({ ...x, round: battleRound })}
				opponent={opponent}
				goBack={() => setMenu('MAIN')}
			/>
		);
	}
	if (menu === 'MOVES') {
		return (
			<MoveSelectionMenu
				player={player}
				opponent={opponent}
				goBack={() => setMenu('MAIN')}
				battleWeather={battleWeather}
				chooseMove={(x) => chooseMove({ ...x, round: battleRound })}
			/>
		);
	}

	return (
		<BattleActionsMainMenu balls={balls} runAway={runAway} setMenu={setMenu} />
	);
};
