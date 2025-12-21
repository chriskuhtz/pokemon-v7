import { useContext, useMemo, useState } from 'react';
import { BsBackpack4 } from 'react-icons/bs';
import { FaFistRaised, FaRunning } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import { ItemSprite } from '../../../components/ItemSprite/ItemSprite';
import { MoveCard } from '../../../components/MoveCard/MoveCard';
import {
	battleSpriteSize,
	portraitMode,
} from '../../../constants/gameData/gameData';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { canRunOrSwitch } from '../../../functions/canRunOrSwitch';
import { getMovesArray } from '../../../functions/getMovesArray';
import { getPlayerPokemon } from '../../../functions/getPlayerPokemon';
import { isKO } from '../../../functions/isKo';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	isHealingItem,
	isPokeball,
	isPPRestorationItem,
	isRunawayItem,
	isXItem,
	ItemType,
} from '../../../interfaces/Item';
import { Card } from '../../../uiComponents/Card/Card';
import { Stack } from '../../../uiComponents/Stack/Stack';
import {
	ActionType,
	BattleFieldEffect,
	ChooseActionPayload,
} from '../BattleField';

export function ActionSelection({
	controlled,
	inventory,
	setChosenAction,
	chooseAction,
	allTargets,

	runningAllowed,
	battleFieldEffects,
	disabled,
	catchingForbiddenReason,
}: {
	controlled: BattlePokemon;
	inventory: Inventory;
	setChosenAction: (x: ActionType) => void;
	chooseAction: (x: ChooseActionPayload) => void;
	allTargets: BattlePokemon[];
	runningAllowed: boolean;
	battleFieldEffects: BattleFieldEffect[];
	disabled: boolean;
	catchingForbiddenReason: string | undefined;
}) {
	const [subgroup, setSubGroup] = useState<'MOVES' | 'ITEMS' | undefined>();
	const {
		saveFile: { settings, playerId },
	} = useContext(SaveFileContext);

	const allowedItems: [ItemType, number][] = useMemo(
		() =>
			Object.entries(inventory).filter(([item, amount]) => {
				const realAmount =
					amount -
					allTargets.reduce(
						(sum, summand) =>
							sum +
							(summand.moveQueue.some(
								(m) =>
									(m.type === 'InBattleItem' && m.item === item) ||
									(m.type === 'CatchProcessInfo' && m.ball === item)
							)
								? 1
								: 0),
						0
					);

				if (realAmount <= 0) {
					return false;
				}
				if (isPokeball(item)) {
					return true;
				}
				if (settings?.noItemsInBattle) {
					return false;
				}

				return (
					isRunawayItem(item) ||
					((isHealingItem(item) ||
						isPPRestorationItem(item) ||
						isXItem(item)) &&
						getPlayerPokemon(allTargets, playerId).some((t) =>
							canBenefitFromItem(t, item)
						))
				);
			}) as [ItemType, number][],
		[allTargets, inventory, playerId, settings?.noItemsInBattle]
	);

	const runOrSwitchPossible = useMemo(
		() => canRunOrSwitch(controlled, battleFieldEffects),
		[battleFieldEffects, controlled]
	);

	return (
		<div
			style={{
				padding: '.5rem',
				textWrap: 'nowrap',
			}}
		>
			<strong>What should {controlled.data.name} do?</strong>
			<Stack
				mode={portraitMode ? 'column' : 'row'}
				gap={portraitMode ? 0.25 : 0.5}
			>
				{subgroup === 'MOVES' ? (
					getMovesArray(controlled, {
						filterOutDisabled: true,
						considerTorment: true,
						considerTaunt: true,
						considerEncore: true,
					}).map((m) => (
						<MoveCard
							pokemon={controlled}
							move={m}
							key={m.name}
							onClick={() => setChosenAction(m.name)}
						/>
					))
				) : (
					<Card
						disabled={disabled}
						onClick={() => setSubGroup('MOVES')}
						content={'Attack'}
						actionElements={[]}
						icon={<FaFistRaised height={battleSpriteSize} />}
					/>
				)}
				<Card
					disabled={
						disabled ||
						!runOrSwitchPossible ||
						allTargets.filter((p) => p.ownerId === playerId && !isKO(p))
							.length === 1
					}
					onClick={() => setChosenAction('SWITCH')}
					content={'Switch Pokemon'}
					actionElements={[]}
					icon={<FaArrowsRotate height={battleSpriteSize} />}
				/>

				{subgroup === 'ITEMS' ? (
					allowedItems.map(([item, amount]) => {
						let content = `${item} (${amount})`;

						if (isPokeball(item) && catchingForbiddenReason) {
							content = catchingForbiddenReason;
						}
						return (
							<button
								style={{ display: 'flex', alignItems: 'center' }}
								onClick={() => setChosenAction(item)}
								key={item}
								disabled={
									disabled || !!(isPokeball(item) && catchingForbiddenReason)
								}
							>
								<ItemSprite item={item} />
								{content}
							</button>
						);
					})
				) : (
					<Card
						disabled={disabled || allowedItems.length === 0}
						onClick={() => setSubGroup('ITEMS')}
						content={'ITEMS'}
						actionElements={[]}
						icon={<BsBackpack4 height={battleSpriteSize} />}
					/>
				)}

				{runningAllowed && (
					<Card
						disabled={disabled || !runOrSwitchPossible}
						onClick={() =>
							chooseAction({
								userId: controlled.id,
								actionName: 'RUN_AWAY',
								targetId: '',
							})
						}
						content={'Run Away'}
						actionElements={[]}
						icon={<FaRunning height={battleSpriteSize} />}
					/>
				)}
			</Stack>
		</div>
	);
}
