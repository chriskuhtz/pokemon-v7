import { useEffect } from 'react';
import { thrashingMoves } from '../../constants/lockInMoves';
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
	initOppo,
	initSaveFile,
	goBack,
	activeToast,
	addToast,
}: {
	initSaveFile: SaveFile;
	initOppo: OwnedPokemon;
	goBack: (update: SaveFile) => void;
	activeToast: boolean;
	addToast: AddToastFunction;
}): JSX.Element => {
	const team = initSaveFile.pokemon.filter((p) => p.onTeam);

	const [player, setPlayer] = useBattlePokemon(team[0]);
	const [opponent, setOpponent] = useBattlePokemon(initOppo);

	const {
		battleStep,
		initBattle,
		nextMove,
		battleWeather,
		usedItems,
		battleRound,
		runAway,
	} = useBattleSteps({
		initSaveFile,
		goBack,
		opponent: opponent,
		player: player,
		setOpponent: setOpponent,
		setPlayer: setPlayer,
		dispatchToast: addToast,
	});

	useEffect(() => {
		if (battleStep === 'UNITIALIZED' && player && opponent) {
			initBattle();
		}
	}, [battleStep, initBattle, player, opponent]);

	if (!player || !opponent) {
		return <LoadingScreen />;
	}

	return (
		<>
			<BattleBanner
				nextMove={nextMove}
				battleStep={battleStep}
				opponent={opponent}
				player={player}
				voidSteps={['MOVE_SELECTION']}
			/>
			{!activeToast && (
				<BattleInfo
					battleStep={battleStep}
					battleWeather={battleWeather}
					battleRound={battleRound}
				/>
			)}

			<div className="battle">
				<EnemyLane
					battleStep={battleStep}
					opponentPokemon={opponent}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO', 'BATTLE_WON']}
					catchProcessBall={
						nextMove?.type === 'CatchProcessInfo' ? nextMove.ball : undefined
					}
				/>
				<PlayerLane
					pokemon={player}
					battleStep={battleStep}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO']}
				/>
				{!activeToast && (
					<BattleActions
						battleWeather={battleWeather}
						battleStep={battleStep}
						battleRound={battleRound}
						chooseMove={(x) => {
							if (x.type === 'CatchProcessInfo' || x.type === 'InBattleItem') {
								setPlayer({
									...player,
									moveQueue: [...player.moveQueue, x],
								});

								return;
							}
							if (secondTurnMoves.includes(x.name)) {
								setPlayer({
									...player,
									moveQueue: [
										...player.moveQueue,
										{ ...x, type: 'ChargeUp' },
										{ ...x, round: x.round + 1 },
									],
								});
								return;
							}
							if (thrashingMoves.includes(x.name)) {
								setPlayer({
									...player,
									moveQueue: [
										...player.moveQueue,
										x,
										{ ...x, round: x.round + 1 },
										Math.random() > 0.5
											? { ...x, round: x.round + 2 }
											: undefined,
									].filter((mq) => mq !== undefined),
								});
								return;
							}
							setPlayer({
								...player,
								moveQueue: [...player.moveQueue, x],
							});
						}}
						inventory={joinInventories(initSaveFile.inventory, usedItems, true)}
						player={player}
						opponent={opponent}
						runAway={runAway}
					/>
				)}
			</div>
		</>
	);
};
