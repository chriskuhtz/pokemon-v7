import { useCallback, useContext } from 'react';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { ScreenTransitionContext } from '../../../hooks/useScreenTransitionEffects';
import { Challenger } from '../../../interfaces/Challenger';

export const useStartEncounter = () => {
	const { navigateAwayFromOverworldReducer } = useContext(SaveFileContext);
	const { activateTransition } = useContext(ScreenTransitionContext);

	return useCallback(
		(stepsTaken: number, encounter: Challenger) => {
			activateTransition({
				onRemoval: () =>
					navigateAwayFromOverworldReducer(
						{ activeTab: 'BATTLE', currentChallenger: encounter },
						stepsTaken
					),
			});
		},
		[activateTransition, navigateAwayFromOverworldReducer]
	);
};
