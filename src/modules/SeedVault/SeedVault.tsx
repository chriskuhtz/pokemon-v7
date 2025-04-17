import { useCallback, useContext, useMemo } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import {
	isApricorn,
	isBerry,
	isHerb,
	isItem,
	ItemType,
	itemTypes,
} from '../../interfaces/Item';
import { Occupant } from '../../interfaces/OverworldMap';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const SeedVault = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const possibleDonations: ItemType[] = useMemo(() => {
		return Object.entries(saveFile.bag)
			.filter(([item, amount]) => {
				return (
					amount > 0 &&
					(isBerry(item) || isApricorn(item) || isHerb(item)) &&
					!(saveFile.seedVault ?? []).includes(item)
				);
			})
			.map(([item]) => item)
			.filter(isItem);
	}, [saveFile]);

	const donate = useCallback(
		(item: ItemType) => {
			addMessage({
				message: `donated a ${item} to the seed vault`,
				needsNoConfirmation: true,
			});
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [item]: -1 }),
				researchPoints: saveFile.researchPoints + 1,
				seedVault: [...(saveFile.seedVault ?? []), item],
			});
		},
		[addMessage, patchSaveFileReducer, saveFile]
	);
	const collectibles: ItemType[] = useMemo(() => {
		if (!saveFile.seedVault || saveFile.seedVault.length === 0) {
			return [];
		}

		return saveFile.seedVault.filter((s) => saveFile.bag[s] === 0);
	}, [saveFile]);

	const collect = useCallback(
		(item: ItemType) => {
			addMessage({
				message: `collected a new ${item} from the seed vault`,
				needsNoConfirmation: true,
			});
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [item]: 1 }),
				researchPoints: saveFile.researchPoints - 1,
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.bag, saveFile.researchPoints]
	);
	const navigate = useNavigate();

	return (
		<Page
			headline="Seed Vault"
			goBack={() => navigate('SEED_VAULT', 'OVERWORLD')}
		>
			<h3>
				You can donate Species of Berries and Apricorns to the seed vault to
				receive research points
			</h3>
			<h3>
				If you run out of a donated species later, you can buy it again for 1
				research point
			</h3>
			<h3>Species registered:</h3>
			<AnimatedBar
				max={
					itemTypes.filter(
						(item) => isBerry(item) || isApricorn(item) || isHerb(item)
					).length
				}
				offset={saveFile.seedVault.length}
			/>
			{possibleDonations.length > 0 && (
				<>
					<h3>Donate:</h3>
					<Stack mode="column">
						{possibleDonations.map((s) => (
							<Card
								icon={<ItemSprite item={s} />}
								content={
									<strong>{`donate ${s} and receive 1 research point`}</strong>
								}
								onClick={() => donate(s)}
								actionElements={[]}
							/>
						))}
					</Stack>
				</>
			)}
			{collectibles.length > 0 && saveFile.researchPoints > 0 && (
				<>
					<h3>Collect:</h3>
					<Stack mode="column">
						{collectibles.map((s) => (
							<Card
								icon={<ItemSprite item={s} />}
								content={<strong>{`collect ${s} for 1 research point`}</strong>}
								onClick={() => collect(s)}
								actionElements={[]}
							/>
						))}
					</Stack>
				</>
			)}
		</Page>
	);
};

export const seedvaultResearcher: Occupant[] = [
	{
		type: 'ROUTER_NPC',
		dialogue: ['I am creating a catalogue of the local fauna'],
		to: 'SEED_VAULT',
		x: 14,
		y: 17,
		orientation: 'UP',
		sprite: SpriteEnum.scientistMale,
		id: 'seedvault researcher',
		conditionFunction: (s) => s.campUpgrades['create seed vault'],
	},
];
