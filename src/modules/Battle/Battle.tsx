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

export type BattleStep = (typeof battleSteps)[number];

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
	const {
		saveFile,
		battleStep,
		startCatchProcess,
		initBattle,
		inCatchProcess,
	} = useBattleSteps(initSaveFile, syncAfterBattleEnd, goBack);

	const team = saveFile.pokemon.filter((p) => p.onTeam);

	const slot1 = useBattlePokemon(team[0]);
	const slot3 = useBattlePokemon(opponent);

	useEffect(() => {
		if (battleStep === 'UNITIALIZED' && slot1 && slot3) {
			initBattle();
		}
	}, [battleStep, initBattle, slot1, slot3]);

	if (!slot1 || !slot3) {
		return <LoadingScreen />;
	}

	console.log(slot1);

	return (
		<>
			<BattleBanner
				catchProcessBall={inCatchProcess?.ball}
				battleStep={battleStep}
				opponent={{ ...slot3, name: slot3.data.name }}
				player={{ ...slot1, name: slot1.data.name }}
				voidSteps={['MOVE_SELECTION', 'OPPONENT_EMERGE', 'PLAYER_EMERGE']}
			/>
			<strong style={{ position: 'absolute' }}>BattleStep: {battleStep}</strong>
			<div className="battle">
				<EnemyLane
					battleStep={battleStep}
					opponentPokemon={slot3}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO', 'BATTLE_WON']}
					catchProcessBall={inCatchProcess?.ball}
				/>
				<PlayerLane
					pokemon={slot1}
					battleStep={battleStep}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO']}
				/>
				<BattleActions
					battleStep={battleStep}
					startCatchProcess={(ball) =>
						startCatchProcess({ ball, pokemon: slot3 })
					}
					inventory={saveFile.inventory}
					firstMove={slot1.firstMove}
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
