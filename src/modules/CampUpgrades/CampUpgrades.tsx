import { useCallback, useContext, useMemo, useState } from 'react';
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
import { typeColors } from '../../constants/typeColors';
import { replaceRouteName } from '../../functions/replaceRouteName';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

const categories: CampUpgradeCategory[] = [
	'Research',
	'Sustainability',
	'Exploration',
	'Training',
];

export const CampUpgrades = ({
	goBack,
}: {
	goBack: () => void;
}): JSX.Element => {
	const [filter, setFilter] = useState<CampUpgradeCategory>('Research');

	const { saveFile, putSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const { campUpgrades, researchPoints } = saveFile;

	const currentPrices: Record<CampUpgradeCategory, number> = Object.fromEntries(
		categories.map((cat) => [
			cat,
			10 +
				Object.entries(campUpgrades).filter(
					([key, unlocked]) =>
						!!unlocked && campUpgradeCategories[key as CampUpgrade] === cat
				).length *
					10,
		])
	) as Record<CampUpgradeCategory, number>;

	const unlock = useCallback(
		(id: CampUpgrade) => {
			//if (researchPoints < campUpgradePrices[id]) {
			if (researchPoints < currentPrices[filter]) {
				addMessage({ message: 'Earn more research points' });
				return;
			}
			addMessage({ message: `Unlocked ${id}`, needsNoConfirmation: true });
			putSaveFileReducer({
				...saveFile,
				//researchPoints: researchPoints - campUpgradePrices[id],
				researchPoints: researchPoints - currentPrices[filter],
				campUpgrades: { ...campUpgrades, [id]: true },
			});
		},
		[
			addMessage,
			campUpgrades,
			currentPrices,
			filter,
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

	const filteredUpgrades = sortedUpgrades.filter(
		(s) => campUpgradeCategories[s] === filter
	);
	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<h3 style={{ margin: 0 }}>
					We can use the research points earned from quests to expand our camp
				</h3>
				<h3 style={{ margin: 0 }}>Research Points: {researchPoints}</h3>
				<Stack mode="row" gap={3} alignItems="center">
					<h3 style={{ margin: 0 }}>Category:</h3>{' '}
					{categories.map((c) => (
						<CampUpgradeIcon
							highlighted={filter === c}
							key={c}
							category={c}
							onClick={() => setFilter(c)}
						/>
					))}
				</Stack>
				{filteredUpgrades.map((upgrade) => (
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
									<h4>Research Points: {currentPrices[filter]}</h4>
								)}
							</div>
						}
						actionElements={
							campUpgrades[upgrade]
								? [<FaCheckCircle size={battleSpriteSize} />]
								: [
										<button
											disabled={currentPrices[filter] > researchPoints}
											onClick={() => unlock(upgrade)}
										>
											{currentPrices[filter] <= researchPoints
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

const CampUpgradeIcon = ({
	category,
	onClick,
	highlighted,
}: {
	category: CampUpgradeCategory;
	onClick?: () => void;
	highlighted?: boolean;
}) => {
	if (category === 'Training') {
		return (
			<FaFistRaised
				size={battleSpriteSize}
				onClick={onClick}
				color={highlighted ? typeColors['grass'] : undefined}
			/>
		);
	}
	if (category === 'Research') {
		return (
			<HiBeaker
				size={battleSpriteSize}
				onClick={onClick}
				color={highlighted ? typeColors['grass'] : undefined}
			/>
		);
	}
	if (category === 'Exploration') {
		return (
			<GiMountainRoad
				size={battleSpriteSize}
				onClick={onClick}
				color={highlighted ? typeColors['grass'] : undefined}
			/>
		);
	}
	return (
		<PiFarm
			size={battleSpriteSize}
			onClick={onClick}
			color={highlighted ? typeColors['grass'] : undefined}
		/>
	);
};
