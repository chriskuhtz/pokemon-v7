import { useCallback, useContext, useMemo, useState } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';

export type BattleTerrain = 'grassy' | 'electric' | 'psychic' | 'misty';
export interface TerrainObject {
	type: BattleTerrain;
	duration: number;
}

export const useBattleTerrain = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const [bT, setBattleTerrain] = useState<TerrainObject | undefined>();

	const battleTerrain: BattleTerrain | undefined = useMemo(() => {
		return bT?.type;
	}, [bT?.type]);

	const reduceTerrainDuration = useCallback(() => {
		if (!bT) {
			return;
		}
		if (bT.duration === 1) {
			addMessage({ message: 'The terrain returned to normal' });
			setBattleTerrain(undefined);
		}
		if (bT.duration > 1) {
			setBattleTerrain({ ...bT, duration: bT.duration - 1 });
		}
	}, [addMessage, bT]);
	return {
		battleTerrain,
		setBattleTerrain,
		reduceTerrainDuration,
	};
};
