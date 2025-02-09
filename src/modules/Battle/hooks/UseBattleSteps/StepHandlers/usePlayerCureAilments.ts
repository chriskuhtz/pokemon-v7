import { useEffect } from 'react';
import { animationTimer } from '../../../../../constants/gameData';
import { UNFREEZE_CHANCE } from '../../../../../interfaces/Ailment';
import { playerTurnPath } from '../../../types/BattleStep';
import { ExtendedBattleStepHandler } from '../useBattleSteps';

export const usePlayerCureAilments = ({
	battleStep,
	dispatchToast,
	player,
	setPlayer,
	followBattleStepPath,
}: ExtendedBattleStepHandler) => {
	useEffect(() => {
		if (battleStep !== 'PLAYER_CURE_AILMENTS' || !player) {
			return;
		}
		const defrosted =
			player.primaryAilment?.type === 'freeze' &&
			Math.random() < UNFREEZE_CHANCE;

		if (!player.primaryAilment || !defrosted) {
			followBattleStepPath(playerTurnPath);
			return;
		}

		const t = setTimeout(() => {
			dispatchToast(`${player.data.name} was defrosted`);
			setPlayer({ ...player, primaryAilment: undefined });
			followBattleStepPath(playerTurnPath);
		}, animationTimer);

		return () => clearTimeout(t);
	}, [battleStep, dispatchToast, followBattleStepPath, player, setPlayer]);
};
