import { useEffect, useState } from 'react';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { SaveFile, useSaveFile } from '../../hooks/useSaveFile';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import './Battle.css';
import { BattleActions } from './components/BattleActions';
import { BattleBanner } from './components/BattleBanner';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';

const battleSteps = [
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
] as const;

export const animationTimer = 1500;

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
	const { saveFile } = useSaveFile(initSaveFile);
	const [battleStep, setBattleStep] = useState<BattleStep>('OPPONENT_INTRO');
	const team = saveFile.pokemon.filter((p) => p.onTeam);
	const { dexId: activePlayerPokemonId, ball } = team[0];
	const { res: opponentData } = useGetPokemonData(opponent.dexId);
	const { res: activePlayerData } = useGetPokemonData(activePlayerPokemonId);

	useEffect(() => {
		if (battleStep !== 'OPPONENT_INTRO') {
			return;
		}
		const t = setTimeout(() => setBattleStep('PLAYER_INTRO'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	useEffect(() => {
		if (battleStep !== 'PLAYER_INTRO') {
			return;
		}
		const t = setTimeout(
			() => setBattleStep('OPPONENT_EMERGE'),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	useEffect(() => {
		if (battleStep !== 'OPPONENT_EMERGE') {
			return;
		}
		const t = setTimeout(() => setBattleStep('PLAYER_EMERGE'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);
	useEffect(() => {
		if (battleStep !== 'PLAYER_EMERGE') {
			return;
		}
		const t = setTimeout(() => setBattleStep('MOVE_SELECTION'), animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, setBattleStep]);

	if (!opponentData || !activePlayerData) {
		return <LoadingScreen />;
	}

	return (
		<>
			<BattleBanner
				battleStep={battleStep}
				opponent={{ dexId: opponent.dexId, name: opponentData.name }}
				player={{ dexId: activePlayerPokemonId, name: activePlayerData.name }}
				voidSteps={['MOVE_SELECTION', 'OPPONENT_EMERGE', 'PLAYER_EMERGE']}
			/>
			<div className="battle">
				<EnemyLane
					battleStep={battleStep}
					opponent={opponent}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO']}
				/>
				<PlayerLane
					battleStep={battleStep}
					ballType={ball}
					activePlayerPokemonId={activePlayerPokemonId}
					voidSteps={['OPPONENT_INTRO', 'PLAYER_INTRO']}
				/>
				<BattleActions
					battleStep={battleStep}
					setBattleStep={setBattleStep}
					team={team}
					inventory={saveFile.inventory}
					opponent={opponent}
					goBack={goBack}
				/>
			</div>
		</>
	);
};
