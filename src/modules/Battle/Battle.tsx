import { useEffect } from 'react';
import { secondTurnMoves } from '../../constants/secondTurnMoves';
import { AddToastFunction } from '../../hooks/useToasts';
import { joinInventories } from '../../interfaces/Inventory';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { SaveFile } from '../../interfaces/SaveFile';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import './Battle.css';
import { BattleActions } from './components/BattleActions';
import { BattleBanner } from './components/BattleBanner';
import { BattleInfo } from './components/BattleInfo';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { useBattlePokemon } from './hooks/useBattlePokemon';
import { useBattleSteps } from './hooks/UseBattleSteps/useBattleSteps';

export const Battle = ({
	opponent,
	initSaveFile,
	syncAfterBattleEnd,
	goBack,
	latestToast,
	addToast,
}: {
	initSaveFile: SaveFile;
	opponent: OwnedPokemon;
	syncAfterBattleEnd: (update: SaveFile) => void;
	goBack: () => void;
	latestToast: string | undefined;
	addToast: AddToastFunction;
}): JSX.Element => {
	const team = initSaveFile.pokemon.filter((p) => p.onTeam);

	const [slot1, setSlot1] = useBattlePokemon(team[0]);
	const [slot3, setSlot3] = useBattlePokemon(opponent);

	const {
		battleStep,
		initBattle,
		nextMove,
		setNextPlayerMove,
		battleWeather,
		usedItems,
		battleRound,
	} = useBattleSteps({
		initSaveFile,
		syncAfterBattleEnd,
		goBack,
		opponent: slot3,
		player: slot1,
		setOpponent: setSlot3,
		setPlayer: setSlot1,
		dispatchToast: addToast,
	});

	useEffect(() => {
		if (battleStep === 'UNITIALIZED' && slot1 && slot3) {
			initBattle();
		}
	}, [battleStep, initBattle, slot1, slot3]);

	if (!slot1 || !slot3) {
		return <LoadingScreen />;
	}

	return (
		<>
			<BattleBanner
				nextMove={nextMove}
				battleStep={battleStep}
				opponent={slot3}
				player={slot1}
				voidSteps={['MOVE_SELECTION']}
			/>
			<BattleInfo
				battleStep={battleStep}
				battleWeather={battleWeather}
				battleRound={battleRound}
			/>

			<div className="battle">
				<EnemyLane
					battleStep={battleStep}
					opponentPokemon={slot3}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO', 'BATTLE_WON']}
					catchProcessBall={
						nextMove?.type === 'CatchProcessInfo' ? nextMove.ball : undefined
					}
				/>
				<PlayerLane
					pokemon={slot1}
					battleStep={battleStep}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO']}
				/>
				{!latestToast && (
					<BattleActions
						battleWeather={battleWeather}
						battleStep={battleStep}
						chooseMove={(x) => {
							if (x.type === 'CatchProcessInfo') {
								setNextPlayerMove(x);
								return;
							}
							if (secondTurnMoves.includes(x.name)) {
								setNextPlayerMove({ ...x, type: 'ChargeUp' });
								return;
							}
							setNextPlayerMove(x);
						}}
						inventory={joinInventories(initSaveFile.inventory, usedItems, true)}
						player={slot1}
						opponent={slot3}
						runAway={goBack}
					/>
				)}
			</div>
		</>
	);
};
