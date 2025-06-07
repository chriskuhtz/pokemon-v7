import { useContext, useMemo, useState } from 'react';
import { BsBackpack4 } from 'react-icons/bs';
import { FaFistRaised, FaRunning } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import { ItemSprite } from '../../../components/ItemSprite/ItemSprite';
import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { battleSpriteSize, portraitMode } from '../../../constants/gameData';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getHeldItem } from '../../../functions/getHeldItem';
import { getMovesArray } from '../../../functions/getMovesArray';
import { getPlayerPokemon } from '../../../functions/getPlayerPokemon';
import { getTypeNames } from '../../../functions/getTypeNames';
import { isTrapped } from '../../../functions/isTrapped';
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
import {
	ActionType,
	BattleFieldEffect,
	ChooseActionPayload,
} from '../BattleField';

export const canRunOrSwitch = (
	controlled: BattlePokemon,
	battleFieldEffects: BattleFieldEffect[]
): boolean => {
	const runAwayer =
		controlled.ability === 'run-away' ||
		getHeldItem(controlled) === 'smoke-ball' ||
		getHeldItem(controlled) === 'shed-shell';

	if (runAwayer) {
		return true;
	}
	const trapped = isTrapped(controlled);
	const shadowTagged =
		controlled.ability !== 'shadow-tag' &&
		battleFieldEffects.some(
			(b) => b.type === 'shadow-tag' && b.ownerId !== controlled.ownerId
		);
	const arenaTrapped =
		controlled.ability !== 'levitate' &&
		!getTypeNames(controlled).includes('flying') &&
		battleFieldEffects.some(
			(b) => b.type === 'arena-trap' && b.ownerId !== controlled.ownerId
		);
	const magnetPulled =
		getTypeNames(controlled).includes('steel') &&
		battleFieldEffects.some(
			(b) => b.type === 'magnet-pull' && b.ownerId !== controlled.ownerId
		);
	const spiderWebbed = battleFieldEffects.some(
		(b) => b.type === 'spider-web' && b.ownerId !== controlled.ownerId
	);
	const meanLooked = controlled.secondaryAilments.some(
		(b) => b.type === 'mean-looked'
	);
	const ingrained = controlled.secondaryAilments.some(
		(b) => b.type === 'ingrained'
	);
	return !(
		trapped ||
		shadowTagged ||
		arenaTrapped ||
		magnetPulled ||
		spiderWebbed ||
		meanLooked ||
		ingrained
	);
};
export function ActionSelection({
	controlled,
	inventory,
	setChosenAction,
	chooseAction,
	allTargets,
	catchingAllowed,
	runningAllowed,
	battleFieldEffects,
}: {
	controlled: BattlePokemon;
	inventory: Inventory;
	setChosenAction: (x: ActionType) => void;
	chooseAction: (x: ChooseActionPayload) => void;
	allTargets: BattlePokemon[];
	catchingAllowed: boolean;
	runningAllowed: boolean;
	battleFieldEffects: BattleFieldEffect[];
}) {
	const [subgroup, setSubGroup] = useState<'MOVES' | 'ITEMS' | undefined>();
	const {
		saveFile: { settings },
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
				if (isPokeball(item) && catchingAllowed) {
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
						getPlayerPokemon(allTargets).some((t) =>
							canBenefitFromItem(t, item)
						))
				);
			}) as [ItemType, number][],
		[allTargets, catchingAllowed, inventory, settings?.noItemsInBattle]
	);

	const canSwitch = useMemo(
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
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					flexDirection: portraitMode ? 'column' : 'row',
				}}
			>
				{subgroup === 'MOVES' ? (
					getMovesArray(controlled, {
						filterOutDisabled: true,
						considerTorment: true,
						considerTaunt: true,
						considerEncore: true,
					}).map((m) => (
						<MoveCard
							move={m}
							key={m.name}
							onClick={() => setChosenAction(m.name)}
							boostedBy={
								controlled.ppBoostedMoves.find(
									(boosted) => boosted.name === m.name
								)?.stage
							}
						/>
					))
				) : (
					<Card
						onClick={() => setSubGroup('MOVES')}
						content={'Attack'}
						actionElements={[]}
						icon={<FaFistRaised height={battleSpriteSize} />}
					/>
				)}
				<Card
					disabled={!canSwitch}
					onClick={() => setChosenAction('SWITCH')}
					content={'Switch Pokemon'}
					actionElements={[]}
					icon={<FaArrowsRotate height={battleSpriteSize} />}
				/>

				{subgroup === 'ITEMS' ? (
					allowedItems.map(([item, amount]) => {
						return (
							<button
								style={{ display: 'flex', alignItems: 'center' }}
								onClick={() => setChosenAction(item)}
								key={item}
							>
								<ItemSprite item={item} />
								{item} ({amount})
							</button>
						);
					})
				) : (
					<Card
						disabled={allowedItems.length === 0}
						onClick={() => setSubGroup('ITEMS')}
						content={'ITEMS'}
						actionElements={[]}
						icon={<BsBackpack4 height={battleSpriteSize} />}
					/>
				)}

				{runningAllowed && (
					<Card
						disabled={!canSwitch}
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
			</div>
		</div>
	);
}
