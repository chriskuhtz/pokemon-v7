import { useCallback, useContext, useMemo, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { AbilityInfoButton } from '../../components/AbilityInfoButton/AbilityInfoButton';
import {
	ItemInfoButton,
	NatureInfoButton,
} from '../../components/ItemInfoButton/ItemInfoButton';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { MovesDisplay } from '../../components/OwnedPokemonCard/components/MovesDisplay';
import { BstSection } from '../../components/OwnedPokemonCard/components/StatDisplay';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { SpriteIcon } from '../../components/SpriteIcon/SpriteIcon';
import {
	battleSpriteSize,
	testPokemon,
	trickXP,
} from '../../constants/gameData';
import { barry } from '../../constants/maps/occupants/barry';
import { trainerBlaine } from '../../constants/maps/occupants/blaine';
import { trainerBrock } from '../../constants/maps/occupants/brock';
import { bruno } from '../../constants/maps/occupants/bruno';
import { champChris } from '../../constants/maps/occupants/champChris';
import { cynthia } from '../../constants/maps/occupants/cynthia';
import { trainerErika } from '../../constants/maps/occupants/erika';
import { trainerGary } from '../../constants/maps/occupants/gary';
import { giovanni } from '../../constants/maps/occupants/giovanni';
import { hugh } from '../../constants/maps/occupants/hugh';
import { trainerJanine } from '../../constants/maps/occupants/janine';
import { karen } from '../../constants/maps/occupants/karen';
import { koga } from '../../constants/maps/occupants/koga';
import { lance } from '../../constants/maps/occupants/lance';
import { trainerMisty } from '../../constants/maps/occupants/misty';
import { n } from '../../constants/maps/occupants/n';
import { red } from '../../constants/maps/occupants/red';
import { trainerSabrina } from '../../constants/maps/occupants/sabrina';
import { silver } from '../../constants/maps/occupants/silver';
import { trainerSurge } from '../../constants/maps/occupants/surge';
import { will } from '../../constants/maps/occupants/will';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getEntryWithOverflow } from '../../functions/filterTargets';
import { getTypeNames } from '../../functions/getTypeNames';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OverworldTrainer, RouterNpc } from '../../interfaces/OverworldMap';
import { SaveFile } from '../../interfaces/SaveFile';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { moveUnlockPayments } from '../MoveTutor/MoveTutor';

interface JournalEntryData {
	trainer: OverworldTrainer;
	xpOverwrite?: number;
	additionalNotes?: string[];
}

const options: JournalEntryData[] = [
	{ trainer: trainerErika },
	{ trainer: trainerJanine },
	{ trainer: trainerBlaine },
	{ trainer: trainerSurge },
	{ trainer: trainerMisty },
	{ trainer: trainerBrock },
	{ trainer: trainerSabrina },
	{ trainer: trainerGary },
	{
		trainer: will,
		additionalNotes: ['Matches your level * .8 after level 66'],
	},
	{
		trainer: koga,
		additionalNotes: ['Matches your level * .85 after level 67'],
	},
	{
		trainer: bruno,
		additionalNotes: ['Matches your level * .9 after level 68'],
	},
	{
		trainer: karen,
		additionalNotes: ['Matches your level * .95 after level 69'],
	},
	{ trainer: lance, additionalNotes: ['Matches your level after level 70'] },
	{ trainer: giovanni, additionalNotes: ['Matches your level after level 60'] },
	{
		trainer: barry,
		xpOverwrite: 6859,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: barry,
		xpOverwrite: 46655,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: barry,
		xpOverwrite: trickXP,
		additionalNotes: [
			'Matches your level',
			'Selects randomly from the following pokemon',
			'3 pokemon if under lvl 50',
			'4 pokemon if under lvl 60',
			'5 pokemon if under lvl 70',
			'6 otherwise',
		],
	},
	{
		trainer: silver,
		xpOverwrite: 6859,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: silver,
		xpOverwrite: 46655,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: silver,
		xpOverwrite: trickXP,
		additionalNotes: [
			'Matches your level',
			'Selects randomly from the following pokemon',
			'3 pokemon if under lvl 50',
			'4 pokemon if under lvl 60',
			'5 pokemon if under lvl 70',
			'6 otherwise',
		],
	},
	{
		trainer: hugh,
		xpOverwrite: 6859,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: hugh,
		xpOverwrite: 46655,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: hugh,
		xpOverwrite: trickXP,
		additionalNotes: [
			'Matches your level',
			'Selects randomly from the following pokemon',
			'3 pokemon if under lvl 50',
			'4 pokemon if under lvl 60',
			'5 pokemon if under lvl 70',
			'6 otherwise',
		],
	},
	{
		trainer: n,
		xpOverwrite: 6859,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: n,
		xpOverwrite: 46655,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: n,
		xpOverwrite: trickXP,
		additionalNotes: [
			'Matches your level',
			'Selects randomly from the following pokemon',
			'3 pokemon if under lvl 50',
			'4 pokemon if under lvl 60',
			'5 pokemon if under lvl 70',
			'6 otherwise',
		],
	},
	{
		trainer: red,
		xpOverwrite: 6859,
		additionalNotes: ['Might be a time traveller', 'Matches your level'],
	},
	{
		trainer: red,
		xpOverwrite: 46655,
		additionalNotes: ['Might be a time traveller', 'Matches your level'],
	},
	{
		trainer: red,
		xpOverwrite: trickXP,
		additionalNotes: [
			'Might be a time traveller',
			'Matches your level',
			'Selects randomly from the following pokemon',
			'3 pokemon if under lvl 50',
			'4 pokemon if under lvl 60',
			'5 pokemon if under lvl 70',
			'6 otherwise',
		],
	},
	{
		trainer: cynthia,
		xpOverwrite: 6859,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: cynthia,
		xpOverwrite: 46655,
		additionalNotes: ['Matches your level'],
	},
	{
		trainer: cynthia,
		xpOverwrite: trickXP,
		additionalNotes: [
			'Matches your level',
			'Selects randomly from the following pokemon',
			'3 pokemon if under lvl 50',
			'4 pokemon if under lvl 60',
			'5 pokemon if under lvl 70',
			'6 otherwise',
		],
	},
	{
		trainer: champChris,
		additionalNotes: ['Matches your level after level 70'],
	},
];

export const BattleJournalist = (): JSX.Element => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const [activeEntry, setActiveEntry] = useState<JournalEntryData>();
	const { addMessage } = useContext(MessageQueueContext);

	const navigate = useNavigate();

	const openTrainerNotes = useCallback(
		(data: JournalEntryData, cost: ItemType) => {
			addMessage({
				icon: <ItemSprite item={cost} />,
				message: `Handed over 1 ${cost} in exchange for notes about ${data.trainer.id}`,
			});
			setActiveEntry(data);
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [cost]: 1 }, true),
			});
		},
		[addMessage, patchSaveFileReducer, saveFile.bag]
	);

	return (
		<Page
			headline="Battle Journalist"
			goBack={() => navigate('BATTLE_JOURALIST', 'OVERWORLD')}
		>
			{activeEntry ? (
				<JournalEntry
					key={activeEntry.trainer.id}
					data={activeEntry}
					saveFile={saveFile}
					leave={() => setActiveEntry(undefined)}
				/>
			) : (
				<Stack mode="column">
					<h3>Trade Snacks for a look at the Journalists Notes:</h3>
					{options.map((data, index) => {
						const cost = getEntryWithOverflow(moveUnlockPayments, index);
						return (
							<Card
								disabled={saveFile.bag[cost] <= 0}
								onClick={() => openTrainerNotes(data, cost)}
								key={data.trainer.id + data.xpOverwrite}
								icon={
									data.trainer.profilePicture ? (
										<img src={`${data.trainer.profilePicture}`} />
									) : (
										<SpriteIcon sprite={data.trainer.sprite} />
									)
								}
								content={
									data.xpOverwrite ? (
										<strong>
											Notes about {data.trainer.id} at lvl{' '}
											{calculateLevelData(data.xpOverwrite, 'medium').level} or
											lower
										</strong>
									) : (
										<strong>Notes about {data.trainer.id}</strong>
									)
								}
								actionElements={[<ItemSprite item={cost} />]}
							/>
						);
					})}
				</Stack>
			)}
		</Page>
	);
};

export const battleJournalist: RouterNpc = {
	id: 'battle-journalist',
	conditionFunction: (s) => s.campUpgrades['battle journalist'],
	dialogue: [
		'Whats good, big dog',
		"I've gabbed and gossiped",
		'with all the gnarly trainers around here',
		'Just bring me something tasty',
		'and we can have a look at my notes',
	],
	x: 29,
	y: 27,
	orientation: 'RIGHT',
	sprite: SpriteEnum.gangster,
	type: 'ROUTER_NPC',
	to: 'BATTLE_JOURALIST',
};

export const JournalEntry = ({
	data,
	saveFile,
	leave,
}: {
	data: JournalEntryData;
	saveFile: SaveFile;
	leave: () => void;
}) => {
	const { xpOverwrite, trainer, additionalNotes } = data;
	const team = useMemo(() => {
		if (xpOverwrite) {
			return trainer.team({
				...saveFile,
				pokemon: [{ ...testPokemon, xp: xpOverwrite, onTeam: true }],
			});
		}
		return trainer.team(saveFile);
	}, [saveFile, trainer, xpOverwrite]);
	const { res, invalidate } = useGetBattleTeam(team, {});

	if (!res) {
		return <></>;
	}

	return (
		<div
			style={{
				padding: '1rem',
				border: '2px solid black',
				borderRadius: '8px',
				borderTopLeftRadius: '32px',
			}}
		>
			<IoMdCloseCircle
				role="button"
				size={battleSpriteSize}
				tabIndex={0}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'Enter') {
						leave();
						invalidate();
					}
				}}
				onClick={() => {
					leave();
					invalidate();
				}}
			/>
			{trainer.profilePicture ? (
				<img src={`${trainer.profilePicture}`} />
			) : (
				<SpriteIcon sprite={trainer.sprite} />
			)}
			<h3>{trainer.id}</h3>
			{(additionalNotes ?? []).map((note) => (
				<p key={note}>
					<strong>{note}</strong>
				</p>
			))}
			<h3>Team</h3>
			<Stack mode="column" gap={1}>
				{res.map((mon) => (
					<div key={mon.id} style={{ borderTop: '2px solid black' }}>
						<Stack mode="column" alignItems="stretch">
							<Stack mode="row" alignItems="center">
								<PokemonSprite sizeFactor={2} name={mon.name} />
								<div>
									{getTypeNames(mon).map((t) => (
										<img
											key={t}
											height={battleSpriteSize}
											src={`/typeIcons/${t}.png`}
										/>
									))}
								</div>
								<h3>
									{mon.name} | Lvl:
									{calculateLevelData(mon.xp, mon.growthRate).level}
								</h3>{' '}
							</Stack>
							<Stack
								mode="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<Stack mode="row" alignItems="center">
									Ability: {mon.ability}{' '}
									<AbilityInfoButton abilityName={mon.ability} />
								</Stack>
								<div></div>
								<Stack mode="row" alignItems="center">
									{mon.nature} Nature
									<NatureInfoButton nature={mon.nature} />
								</Stack>
								{mon.heldItemName && (
									<Stack mode="row" alignItems="center">
										Held Item: {mon.heldItemName}{' '}
										<ItemInfoButton itemName={mon.heldItemName} />
									</Stack>
								)}
							</Stack>

							<BstSection hideExplanation ownedPokemon={mon} data={mon.data} />
							<MovesDisplay
								onlyCurrent
								ownedPokemon={mon}
								setMoves={() => {}}
							/>
						</Stack>
					</div>
				))}
			</Stack>
		</div>
	);
};
