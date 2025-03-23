import { useCallback, useContext, useMemo } from 'react';
import { v4 } from 'uuid';
import { ONE_HOUR } from '../../../constants/gameData';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { joinInventories } from '../../../interfaces/Inventory';
import {
	ApricornType,
	BerryType,
	isApricorn,
	isBerry,
	isMulch,
	MulchType,
} from '../../../interfaces/Item';

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
		const slots = [
			saveFile.campUpgrades.berry_farm,
			saveFile.campUpgrades['second slot for farm'],
			saveFile.campUpgrades['third slot for farm'],
			saveFile.campUpgrades['fourth slot for farm'],
		].filter((s) => s === true).length;
		return slots > saveFile.farm.plants.length;
	}, [saveFile]);

	const harvest = useCallback(
		(id: string) => {
			const bush = saveFile.farm.plants.find((p) => p.id === id);
			if (!bush) {
				return;
			}
			if (!bush.successful) {
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
			const hasGrownABerry =
				saveFile.mileStones.hasGrownABerry || isBerry(bush.type);
			const hasGrownAnApricorn =
				saveFile.mileStones.hasGrownAnApricorn || isApricorn(bush.type);

			if (bush.successful) {
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
					mileStones: {
						...saveFile.mileStones,
						hasGrownABerry,
						hasGrownAnApricorn,
					},
				});
			}
		},
		[addMessage, putSaveFileReducer, saveFile]
	);

	const getGrowingTime = (mulch?: MulchType) => {
		const now = new Date().getTime();

		if (mulch === 'growth-mulch') {
			return now + ONE_HOUR * 0.75;
		}
		if (mulch === 'stable-mulch') {
			return now + ONE_HOUR * 1.125;
		}
		return now + ONE_HOUR;
	};
	const plant = (type: BerryType | ApricornType, mulch?: MulchType) => {
		if (!hasEmptySlots) {
			return;
		}
		addMessage({
			message: `planted a ${type} ${
				mulch ? `and fertilized with ${mulch}` : ''
			}`,
		});

		const berryYield =
			6 +
			(mulch === 'gooey-mulch' ? 2 : 0) +
			(mulch === 'stable-mulch' ? 6 : 0);

		const successful = Math.random() > (mulch === 'damp-mulch' ? 0.15 : 0.3);

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
						successful,
						yield: berryYield,
						readyAt: getGrowingTime(mulch),
					},
				],
			},
		});
	};

	return {
		hasEmptySlots,
		harvest,
		plant,
		farm: saveFile.farm,
		plantables: Object.entries(saveFile.inventory).filter(
			([item, amount]) => (isBerry(item) || isApricorn(item)) && amount > 0
		) as [BerryType, number][],

		mulches: Object.entries(saveFile.inventory).filter(
			([item, amount]) => isMulch(item) && amount > 0
		) as [MulchType, number][],
	};
};
