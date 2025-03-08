import { isEqual } from 'lodash';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { v4 } from 'uuid';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import {
	BerryType,
	isBerry,
	isMulch,
	MulchType,
} from '../../../interfaces/Item';
import { BerryBush, BerryBushStatus } from '../../../interfaces/SaveFile';

/**
 * mulches
 * growth-mulch: berries grow 25% faster
 * damp-mulch: berries are less likely to wither
 * gooey-mulch: berries yield 25% more
 * stable-mulch: berries grow 25% slower, but yield 50% more
 */

export const useFarm = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);

	const hasEmptySlots = useMemo(() => {
		return saveFile.farm.unlockedPlots > saveFile.farm.plants.length;
	}, [saveFile]);

	const harvest = useCallback(
		(id: string) => {
			const bush = saveFile.farm.plants.find((p) => p.id === id);
			if (!bush) {
				return;
			}
			if (bush.status === 'WITHERED') {
				addMessage({ message: `removed the withered  ${bush.type}` });
				putSaveFileReducer({
					...saveFile,
					farm: {
						...saveFile.farm,
						plants: saveFile.farm.plants.filter((p) => p.id !== id),
					},
				});

				return;
			}
			if (bush.status === 'READY') {
				addMessage({ message: `harvested ${bush.yield} ${bush.type}` });
				putSaveFileReducer({
					...saveFile,
					inventory: joinInventories(saveFile.inventory, {
						[bush.type]: bush.yield,
					}),
					farm: {
						...saveFile.farm,
						plants: saveFile.farm.plants.filter((p) => p.id !== id),
					},
				});
			}
		},
		[addMessage, putSaveFileReducer, saveFile]
	);

	const getGrowingTime = (mulch?: MulchType) => {
		const base = new Date().getTime() + 600000;

		if (mulch === 'growth-mulch') {
			return base * 0.75;
		}
		if (mulch === 'stable-mulch') {
			return base * 0.125;
		}
		return base;
	};
	const getNextGrowthStage = (current: BerryBushStatus): BerryBushStatus => {
		if (current === 'SEED') {
			return 'SPROUT';
		}
		if (current === 'SPROUT') {
			return 'SAPLING';
		}
		if (current === 'SAPLING') {
			return 'FLOWERING';
		}
		if (current === 'FLOWERING') {
			return 'READY';
		}
		return 'SEED';
	};
	const plant = (type: BerryType, mulch?: MulchType) => {
		if (!hasEmptySlots) {
			return;
		}
		addMessage({
			message: `planted a ${type} ${
				mulch ? `and fertilized with ${mulch}` : ''
			}`,
		});

		const berryYield =
			3 +
			(mulch === 'gooey-mulch' ? 1 : 0) +
			(mulch === 'stable-mulch' ? 3 : 0);

		putSaveFileReducer({
			...saveFile,
			inventory: joinInventories(
				saveFile.inventory,
				{
					[type]: 1,
				},
				true
			),
			farm: {
				...saveFile.farm,
				plants: [
					...saveFile.farm.plants,
					{
						id: v4(),
						type,
						mulch,
						status: 'SEED',
						yield: berryYield,
						nextGrowthAt: getGrowingTime(mulch),
					},
				],
			},
		});
	};
	const grow = useCallback((bush: BerryBush): BerryBush => {
		const now = new Date().getTime();
		if (bush.status === 'READY') {
			return bush;
		}
		if (bush.status === 'WITHERED') {
			return bush;
		}

		if (now > bush.nextGrowthAt) {
			const witherChance = bush.mulch === 'damp-mulch' ? 0.2 : 0.3;

			if (Math.random() < witherChance) {
				return { ...bush, status: 'WITHERED' };
			} else
				return {
					...bush,
					status: getNextGrowthStage(bush.status),
					nextGrowthAt: getGrowingTime(bush.mulch),
				};
		}

		return bush;
	}, []);

	useEffect(() => {
		const grownBerries = saveFile.farm.plants.map(grow);

		if (!isEqual(grownBerries, saveFile.farm.plants)) {
			putSaveFileReducer({
				...saveFile,

				farm: {
					...saveFile.farm,
					plants: grownBerries,
				},
			});
		}
	}, [grow, putSaveFileReducer, saveFile]);

	return {
		hasEmptySlots,
		harvest,
		plant,
		farm: saveFile.farm,
		plantables: Object.entries(saveFile.inventory).filter(
			([item, amount]) => isBerry(item) && amount > 0
		) as [BerryType, number][],

		mulches: Object.entries(saveFile.inventory).filter(
			([item, amount]) => isMulch(item) && amount > 0
		) as [MulchType, number][],
	};
};
