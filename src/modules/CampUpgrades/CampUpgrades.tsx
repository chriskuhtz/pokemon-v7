import { useCallback, useContext, useMemo, useState } from 'react';
import { FaCheckCircle, FaFistRaised } from 'react-icons/fa';
import { GiMountainRoad } from 'react-icons/gi';
import { HiBeaker } from 'react-icons/hi';
import { MdFormatListBulleted } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import {
	CampUpgrade,
	campUpgradeCategories,
	CampUpgradeCategory,
	campUpgradeConditions,
	campUpgradeCostScale,
	campUpgradeExplanations,
	campUpgradeNames,
} from '../../constants/gameData/campUpgrades';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { QuestName, QuestsRecord } from '../../constants/gameData/questsRecord';
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
	'Quest Reward',
];

export const CampUpgrades = ({
	goBack,
}: {
	goBack: () => void;
}): JSX.Element => {
	const [filter, setFilter] = useState<CampUpgradeCategory>('Research');

	const { addMessage } = useContext(MessageQueueContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const { campUpgrades, researchPoints } = saveFile;

	const currentPrices: Record<CampUpgradeCategory, number> = Object.fromEntries(
		categories.map((cat) => [
			cat,
			campUpgradeCostScale +
				Object.entries(campUpgrades).filter(
					([key, unlocked]) =>
						!!unlocked && campUpgradeCategories[key as CampUpgrade] === cat
				).length *
					campUpgradeCostScale,
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
			patchSaveFileReducer({
				researchPoints: researchPoints - currentPrices[filter],
				campUpgrades: { ...campUpgrades, [id]: true },
			});
		},
		[
			addMessage,
			campUpgrades,
			currentPrices,
			filter,
			patchSaveFileReducer,
			researchPoints,
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
					<UpgradeCard
						upgrade={upgrade}
						price={currentPrices[filter]}
						unlock={unlock}
					/>
				))}
			</Stack>
		</Page>
	);
};

const UpgradeCard = ({
	upgrade,
	price,
	unlock,
}: {
	upgrade: CampUpgrade;
	price: number;
	unlock: (id: CampUpgrade) => void;
}) => {
	const { saveFile } = useContext(SaveFileContext);

	const { campUpgrades, researchPoints } = saveFile;

	if (campUpgradeCategories[upgrade] === 'Quest Reward') {
		const requiredQuest = Object.entries(QuestsRecord)
			.find(([, value]) => value.campUpgrade === upgrade)
			?.at(0) as QuestName | undefined;

		return (
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
						{requiredQuest && (
							<div>
								Required Quest:
								<strong>{replaceRouteName(requiredQuest)}</strong>
							</div>
						)}
					</div>
				}
				actionElements={[]}
				icon={<CampUpgradeIcon category={campUpgradeCategories[upgrade]} />}
			/>
		);
	}
	return (
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
					{!campUpgrades[upgrade] && <h4>Research Points: {price}</h4>}
				</div>
			}
			actionElements={
				campUpgrades[upgrade]
					? [<FaCheckCircle size={battleSpriteSize} />]
					: [
							<button
								disabled={price > researchPoints}
								onClick={() => unlock(upgrade)}
							>
								{price <= researchPoints
									? 'Unlock'
									: 'More Research Points needed'}
							</button>,
					  ]
			}
			icon={<CampUpgradeIcon category={campUpgradeCategories[upgrade]} />}
		/>
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
	if (category === 'Quest Reward') {
		return (
			<MdFormatListBulleted
				size={battleSpriteSize}
				onClick={onClick}
				color={highlighted ? typeColors['grass'] : undefined}
			/>
		);
	}
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
