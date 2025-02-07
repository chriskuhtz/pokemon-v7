import { useEffect } from 'react';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { SaveFile } from '../../interfaces/SaveFile';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import './Battle.css';
import { BattleActions } from './components/BattleActions';
import { BattleBanner } from './components/BattleBanner';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { useBattlePokemon } from './hooks/useBattlePokemon';
import { useBattleSteps } from './hooks/useBattleSteps';
import { BattleInfo } from './components/BattleInfo';

export const Battle = ({
	opponent,
	initSaveFile,
	syncAfterBattleEnd,
	goBack,
}: {
	initSaveFile: SaveFile;
	opponent: OwnedPokemon;
	syncAfterBattleEnd: (update: SaveFile) => void;
	goBack: () => void;
}): JSX.Element => {
	const team = initSaveFile.pokemon.filter((p) => p.onTeam);

	const [slot1, setSlot1] = useBattlePokemon(team[0]);
	const [slot3, setSlot3] = useBattlePokemon(opponent);

	const { battleStep, initBattle, nextMove, setNextPlayerMove, battleWeather } =
		useBattleSteps({
			initSaveFile,
			syncAfterBattleEnd,
			goBack,
			opponent: slot3,
			player: slot1,
			setOpponent: setSlot3,
			setPlayer: setSlot1,
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
			<BattleInfo battleStep={battleStep} battleWeather={battleWeather} />

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
				<BattleActions
					battleWeather={battleWeather}
					battleStep={battleStep}
					chooseMove={setNextPlayerMove}
					inventory={initSaveFile.inventory}
					player={slot1}
					opponent={slot3}
					runAway={goBack}
				/>
			</div>
		</>
	);
};
