import { useEffect, useState } from 'react';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { SaveFile } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
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
] as const;

export const animationTimer = 1500;

export type BattleStep = (typeof battleSteps)[number];
export interface Opponent {
	dexId: number;
}

export const Battle = ({
	team,
	opponent,
	inventory,
	goBack,
}: {
	team: SaveFile['pokemon'];
	inventory: Inventory;
	opponent: Opponent;
	goBack: () => void;
}): JSX.Element => {
	const [battleStep, setBattleStep] = useState<BattleStep>('OPPONENT_INTRO');
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
					inventory={inventory}
					opponent={opponent}
					goBack={goBack}
				/>
			</div>
		</>
	);
};
