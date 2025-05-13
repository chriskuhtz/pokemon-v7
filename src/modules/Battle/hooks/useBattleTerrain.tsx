import { useCallback, useMemo, useState } from 'react';

export type BattleTerrain = 'grassy' | 'electric';
export interface TerrainObject {
	type: BattleTerrain;
	duration: number;
}

export const useBattleTerrain = () => {
	const [bT, setBattleTerrain] = useState<TerrainObject | undefined>();

	const battleTerrain: BattleTerrain | undefined = useMemo(() => {
		return bT?.type;
	}, [bT?.type]);

	const reduceTerrainDuration = useCallback(() => {
		if (!bT) {
			return;
		}
		if (bT.duration === 1) {
			setBattleTerrain(undefined);
		}
		if (bT.duration > 1) {
			setBattleTerrain({ ...bT, duration: bT.duration - 1 });
		}
	}, [bT]);
	return {
		battleTerrain,
		setBattleTerrain,
		reduceTerrainDuration,
	};
};
