import { useCallback, useContext, useMemo } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { apricornTable, ApricornType, isApricorn } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const ApricornSmithy = ({ goBack }: { goBack: () => void }) => {
	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);

	const apricorns: [ApricornType, number][] = useMemo(
		() =>
			Object.entries(saveFile.bag)
				.filter(([, amount]) => amount > 0)
				.filter(([item]) => isApricorn(item)) as [ApricornType, number][],
		[saveFile.bag]
	);

	const craftBall = useCallback(
		(apricorn: ApricornType) => {
			addMessage({
				message: `Crafted a ${apricornTable[apricorn]} from a ${apricorn}`,
				needsNoConfirmation: true,
			});
			putSaveFileReducer({
				...saveFile,
				bag: joinInventories(saveFile.bag, {
					[apricorn]: -1,
					[apricornTable[apricorn]]: 1,
				}),
				mileStones: { ...saveFile.mileStones, hasCraftedApricorn: true },
			});
		},
		[addMessage, putSaveFileReducer, saveFile]
	);
	return (
		<Page goBack={goBack} headline="Kurt's Apricorn Smithy">
			{apricorns.length === 0 ? (
				<strong>Forage for Apricorn in the wild</strong>
			) : (
				<Stack mode={'column'}>
					{apricorns.map(([apricorn, amount]) => (
						<Card
							onClick={() => craftBall(apricorn)}
							icon={
								<img
									height={battleSpriteSize * 1.5}
									src={getItemUrl(apricornTable[apricorn])}
								/>
							}
							content={
								<h3>
									Turn {apricorn} into {apricornTable[apricorn]}
								</h3>
							}
							actionElements={[
								<strong style={{ display: 'flex', alignItems: 'center' }}>
									<img
										height={battleSpriteSize * 1.5}
										src={getItemUrl(apricorn)}
									/>
									({amount})
								</strong>,
							]}
						/>
					))}
				</Stack>
			)}
		</Page>
	);
};
