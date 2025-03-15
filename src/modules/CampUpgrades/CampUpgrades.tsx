import { useCallback, useContext } from 'react';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import {
	CampUpgrade,
	campUpgradeNames,
	campUpgradePrices,
} from '../../constants/campUpgrades';
import { battleSpriteSize } from '../../constants/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const CampUpgrades = ({
	goBack,
}: {
	goBack: () => void;
}): JSX.Element => {
	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const { campUpgrades, researchPoints } = saveFile;

	const unlock = useCallback(
		(id: CampUpgrade) => {
			if (researchPoints < campUpgradePrices[id]) {
				addMessage({ message: 'Earn more research points' });
				return;
			}
			addMessage({ message: `Unlocking ${id}` });
			putSaveFileReducer({
				...saveFile,
				researchPoints: researchPoints - campUpgradePrices[id],
				campUpgrades: { ...campUpgrades, [id]: true },
			});
		},
		[addMessage, campUpgrades, putSaveFileReducer, researchPoints, saveFile]
	);
	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<h2>
					We can use the research points earned from quests to expand our camp
				</h2>
				<h2>Research Points: {researchPoints}</h2>
				{campUpgradeNames.map((upgrade) => (
					<Card
						key={upgrade}
						disabled={campUpgrades[upgrade]}
						onClick={() => unlock(upgrade)}
						content={<h3>{upgrade}</h3>}
						actionElements={
							campUpgrades[upgrade]
								? [<FaCheckCircle size={battleSpriteSize} />]
								: [<strong>Unlock</strong>]
						}
						icon={<FaShoppingCart size={battleSpriteSize} />}
					/>
				))}
			</Stack>
		</Page>
	);
};
