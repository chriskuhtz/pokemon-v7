import { useEffect } from 'react';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { SaveFile } from '../../interfaces/SaveFile';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import './Battle.css';
import { BattleActions } from './components/BattleActions';
import { BattleBanner } from './components/BattleBanner';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { useBattleSteps } from './hooks/useBattleSteps';

export const battleSteps = [
	'UNITIALIZED',
	'OPPONENT_INTRO',
	'PLAYER_INTRO',
	'OPPONENT_EMERGE',
	'PLAYER_EMERGE',
	'MOVE_SELECTION',
	'CATCHING_PROCESS_1',
	'CATCHING_PROCESS_2',
	'CATCHING_PROCESS_3',
	'CATCHING_PROCESS_4',
	'CATCHING_FAILURE',
	'CATCHING_SUCCESS',
	'BATTLE_WON',
] as const;

export const animationTimer = 1500;
export const battleSpriteSize = 156;

export type BattleStep = (typeof battleSteps)[number];
export interface Opponent {
	dexId: number;
}

export const Battle = ({
	opponent,
	initSaveFile,
	syncAfterBattleEnd,
	goBack,
}: {
	initSaveFile: SaveFile;
	opponent: Opponent;
	syncAfterBattleEnd: (update: SaveFile) => void;
	goBack: () => void;
}): JSX.Element => {
	const {
		saveFile,
		battleStep,
		startCatchProcess,
		initBattle,
		inCatchProcess,
	} = useBattleSteps(initSaveFile, syncAfterBattleEnd, goBack);

	const team = saveFile.pokemon.filter((p) => p.onTeam);
	const { dexId: activePlayerPokemonId, ball } = team[0];
	const { res: opponentData, status } = useGetPokemonData(opponent.dexId);
	const { res: activePlayerData, status: oppoStatus } = useGetPokemonData(
		activePlayerPokemonId
	);

	useEffect(() => {
		if (
			battleStep === 'UNITIALIZED' &&
			status === 'success' &&
			oppoStatus === 'success'
		) {
			initBattle();
		}
	}, [battleStep, initBattle, oppoStatus, status]);

	if (!opponentData || !activePlayerData) {
		return <LoadingScreen />;
	}

	return (
		<>
			<BattleBanner
				catchProcessBall={inCatchProcess?.ball}
				battleStep={battleStep}
				opponent={{ dexId: opponent.dexId, name: opponentData.name }}
				player={{ dexId: activePlayerPokemonId, name: activePlayerData.name }}
				voidSteps={['MOVE_SELECTION', 'OPPONENT_EMERGE', 'PLAYER_EMERGE']}
			/>
			<strong style={{ position: 'absolute' }}>BattleStep: {battleStep}</strong>
			<div className="battle">
				<EnemyLane
					battleStep={battleStep}
					opponent={opponent}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO', 'BATTLE_WON']}
					catchProcessBall={inCatchProcess?.ball}
				/>
				<PlayerLane
					battleStep={battleStep}
					ballType={ball}
					activePlayerPokemonId={activePlayerPokemonId}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO']}
				/>
				<BattleActions
					battleStep={battleStep}
					startCatchProcess={(ball) => startCatchProcess(ball, opponent.dexId)}
					team={team}
					inventory={saveFile.inventory}
					opponent={opponent}
					goBack={goBack}
					voidSteps={[
						'OPPONENT_INTRO',
						'PLAYER_INTRO',
						'OPPONENT_EMERGE',
						'PLAYER_EMERGE',
						'CATCHING_SUCCESS',
						'CATCHING_PROCESS_1',
						'CATCHING_PROCESS_2',
						'CATCHING_PROCESS_3',
						'CATCHING_PROCESS_4',
						'BATTLE_WON',
					]}
				/>
			</div>
		</>
	);
};
