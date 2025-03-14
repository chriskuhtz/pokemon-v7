import { useCallback, useContext, useState } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { BattleFieldEffect } from '../BattleField';

export const useBattleFieldEffects = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const [battleFieldEffects, setBattleFieldEffects] = useState<
		BattleFieldEffect[]
	>([]);

	const addBattleFieldEffect = (x: BattleFieldEffect) => {
		if (
			battleFieldEffects.some(
				(b) => b.type === x.type && b.ownerId === x.ownerId
			)
		) {
			addMessage({ message: `${x.type} is already in effect for this side` });
			return;
		}
		setBattleFieldEffects([...battleFieldEffects, x]);
	};
	const reduceBatttleFieldEffectDurations = useCallback(
		() =>
			setBattleFieldEffects((effects) =>
				effects
					.map((e) => {
						if (e.duration === 1) {
							addMessage({ message: `${e.type} ended` });
							return undefined;
						} else return { ...e, duration: e.duration - 1 };
					})
					.filter((e) => e !== undefined)
			),
		[addMessage]
	);

	return {
		battleFieldEffects,
		setBattleFieldEffects,
		addBattleFieldEffect,
		reduceBatttleFieldEffectDurations,
	};
};
