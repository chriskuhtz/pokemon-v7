import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerCureAilments = ({
	battleStep,
	setBattleStep,
	dispatchToast,
	player,
	setPlayer,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'PLAYER_CURE_AILMENTS' || !player) {
			return;
		}
		const defrosted =
			player.primaryAilment?.type === 'freeze' && Math.random() < 0.1;

		if (!player.primaryAilment || !defrosted) {
			setBattleStep('EXECUTE_PLAYER_MOVE');
			return;
		}

		const t = setTimeout(() => {
			dispatchToast(`${player.data.name} was defrosted`);
			setPlayer({ ...player, primaryAilment: undefined });
			setBattleStep('EXECUTE_PLAYER_MOVE');
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, player, setBattleStep, setPlayer]);
};
