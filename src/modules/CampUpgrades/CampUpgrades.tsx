import { useCallback, useContext, useMemo } from 'react';
import { FaCheckCircle, FaFistRaised } from 'react-icons/fa';
import { GiMountainRoad } from 'react-icons/gi';
import { HiBeaker } from 'react-icons/hi';
import { PiFarm } from 'react-icons/pi';
import {
	CampUpgrade,
	campUpgradeCategories,
	CampUpgradeCategory,
	campUpgradeConditions,
	campUpgradeExplanations,
	campUpgradeNames,
} from '../../constants/checkLists/campUpgrades';
import { battleSpriteSize } from '../../constants/gameData';
import { replaceRouteName } from '../../functions/replaceRouteName';
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

	const currentPrice =
		Object.values(campUpgrades).filter((c) => !!c).length * 6 + 6;

	const unlock = useCallback(
		(id: CampUpgrade) => {
			//if (researchPoints < campUpgradePrices[id]) {
			if (researchPoints < currentPrice) {
				addMessage({ message: 'Earn more research points' });
				return;
			}
			addMessage({ message: `Unlocked ${id}`, needsNoConfirmation: true });
			putSaveFileReducer({
				...saveFile,
				//researchPoints: researchPoints - campUpgradePrices[id],
				researchPoints: researchPoints - currentPrice,
				campUpgrades: { ...campUpgrades, [id]: true },
			});
		},
		[
			addMessage,
			campUpgrades,
			currentPrice,
			putSaveFileReducer,
			researchPoints,
			saveFile,
		]
	);

	const availableUpgrades: CampUpgrade[] = useMemo(
		() =>
			campUpgradeNames.filter((name) =>
				campUpgradeConditions[name].every(
					(condition) => campUpgrades[condition]
				)
			),
		[campUpgrades]
	);

	const sortedUpgrades = availableUpgrades.sort((a, b) => {
		if (campUpgrades[a]) {
			return 1;
		}
		if (campUpgrades[b]) {
			return -1;
		}
		return 0;
	});
	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<h2>
					We can use the research points earned from quests to expand our camp
				</h2>
				<h2>Research Points: {researchPoints}</h2>
				{sortedUpgrades.map((upgrade) => (
					<Card
						key={upgrade}
						disabled={campUpgrades[upgrade]}
						content={
							<div>
								<h3>
									{campUpgradeCategories[upgrade]}: {replaceRouteName(upgrade)}
								</h3>

								<h4>{campUpgradeExplanations[upgrade]}</h4>
								<br />
								{!campUpgrades[upgrade] && (
									<h4>Research Points: {currentPrice}</h4>
								)}
							</div>
						}
						actionElements={
							campUpgrades[upgrade]
								? [<FaCheckCircle size={battleSpriteSize} />]
								: [
										<button
											disabled={currentPrice > researchPoints}
											onClick={() => unlock(upgrade)}
										>
											{/* {campUpgradePrices[upgrade] <= researchPoints */}
											{currentPrice <= researchPoints
												? 'Unlock'
												: 'More Research Points needed'}
										</button>,
								  ]
						}
						icon={<CampUpgradeIcon category={campUpgradeCategories[upgrade]} />}
					/>
				))}
			</Stack>
		</Page>
	);
};

const CampUpgradeIcon = ({ category }: { category: CampUpgradeCategory }) => {
	if (category === 'Training') {
		return <FaFistRaised size={battleSpriteSize} />;
	}
	if (category === 'Research') {
		return <HiBeaker size={battleSpriteSize} />;
	}
	if (category === 'Exploration') {
		return <GiMountainRoad size={battleSpriteSize} />;
	}
	return <PiFarm size={battleSpriteSize} />;
};
