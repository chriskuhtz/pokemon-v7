import { useState } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { isPokeball, PokeballType } from '../../../interfaces/Item';
import { WeatherType } from '../../../interfaces/Weather';
import { BattleStep } from '../types/BattleStep';
import { BallSelectionMenu } from './BallSelectionMenu';
import { BattleActionsMainMenu } from './BattleActionsMainMenu';
import { MoveSelectionMenu } from './MoveSelectionMenu';
import { BattleAction } from '../../../interfaces/BattleActions';

export type BattleMenu = 'MAIN' | 'BALLS' | 'MOVES';

export const BattleActions = ({
	inventory,
	chooseMove,
	battleStep,
	player,
	opponent,
	runAway,
	battleWeather,
}: {
	inventory: Inventory;
	chooseMove: (x: BattleAction) => void;
	battleStep: BattleStep;
	opponent: BattlePokemon;
	player: BattlePokemon;
	runAway: () => void;
	battleWeather: WeatherType | undefined;
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
				chooseMove={chooseMove}
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
				chooseMove={chooseMove}
			/>
		);
	}

	return (
		<BattleActionsMainMenu balls={balls} runAway={runAway} setMenu={setMenu} />
	);
};
