import { BsBackpack4 } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

import { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GoTasklist } from 'react-icons/go';
import { IoMdExit, IoMdSettings } from 'react-icons/io';
import { RiBookShelfLine } from 'react-icons/ri';
import { BadgesCard } from '../../components/BadgesCard/BadgesCard';
import { BugReportButton } from '../../components/BugReport/BugReport';
import { IdeaButton } from '../../components/IdeaReport/IdeaReport';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import {
	ExportSnapshotCard,
	ImportSnapshotCard,
	ResetSnapshotCard,
} from '../../components/SnapshotCard/SnapshotCard';
import { TrainerCard } from '../../components/TrainerCard/TrainerCard';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { mapsRecord } from '../../constants/gameData/maps/mapsRecord';
import { fullyHealPokemon } from '../../functions/fullyHealPokemon';
import { questMenuAvailable } from '../../functions/questMenuAvailable';
import { LocationContext } from '../../hooks/LocationProvider';
import { GameDataContext } from '../../hooks/useGameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { useQuests } from '../../hooks/useQuests';
import { useReset } from '../../hooks/useReset';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { useTeleport } from '../../hooks/useTeleport';
import { EmptyInventory } from '../../interfaces/Inventory';
import { RoutesType } from '../../interfaces/Routing';

export const MainMenu = ({ goBack }: { goBack: () => void }): JSX.Element => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { location, setLocation } = useContext(LocationContext);
	const { settingsEditable } = useContext(GameDataContext);
	const reset = useReset();
	const [resetConfirmationInProgress, setRCIP] = useState<boolean>(false);
	const { numberOfUncollected } = useQuests();
	const navigate = useNavigate();
	const { addMessage } = useContext(MessageQueueContext);
	const { teleporter, teleportHome } = useTeleport();

	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<TrainerCard />
				<BadgesCard />
				{teleporter && (
					<Card
						onClick={() => teleportHome()}
						content={<h4>Teleport back to camp</h4>}
						icon={
							<PokemonSprite
								name={teleporter.name}
								config={{ officalArtwork: true, shiny: teleporter.shiny }}
							/>
						}
						actionElements={[]}
					/>
				)}
				<FlyingButton />
				{questMenuAvailable(location.mapId) && (
					<Card
						onClick={() => {
							setLocation({
								mapId: 'camp',
								x: 3,
								y: 16,
								orientation: 'LEFT',
								forwardFoot: 'CENTER1',
							});
							patchSaveFileReducer({
								bag: EmptyInventory,
								meta: { ...saveFile.meta, activeTab: 'OVERWORLD' },

								pokemon: saveFile.pokemon.map((p) => {
									if (p.onTeam) {
										return fullyHealPokemon(p);
									}

									return p;
								}),
							});
						}}
						content={<h4>Leave the challenge field</h4>}
						icon={<IoMdExit size={battleSpriteSize} />}
						actionElements={[]}
					/>
				)}
				<RepelButton />
				<LureButton />
				<ExpShareButton />
				<Card
					onClick={() => navigate('MAIN', 'BAG')}
					content={<h4>Bag</h4>}
					icon={<BsBackpack4 size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'TEAM')}
					content={<h4>Team</h4>}
					icon={<MdCatchingPokemon size={battleSpriteSize} />}
					actionElements={[]}
				/>
				{!questMenuAvailable(location.mapId) &&
					!saveFile.settings?.questsTabHidden && (
						<Card
							onClick={() => navigate('MAIN', 'QUESTS')}
							content={<h4>Quests</h4>}
							icon={<GoTasklist size={battleSpriteSize} />}
							actionElements={
								numberOfUncollected > 0
									? [<strong>Uncollected: {numberOfUncollected}</strong>]
									: []
							}
						/>
					)}
				<Card
					onClick={() => navigate('MAIN', 'INTERNAL_DEX')}
					content={<h4>Pokedex</h4>}
					icon={<RiBookShelfLine size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MAIN', 'WIKI')}
					content={<h4>Wiki</h4>}
					icon={<FaSearch size={battleSpriteSize} />}
					actionElements={[]}
				/>
				{settingsEditable && (
					<Card
						onClick={() => navigate('MAIN', 'SETTINGS_IN_GAME')}
						content={<h4>SETTINGS</h4>}
						icon={<IoMdSettings size={battleSpriteSize} />}
						actionElements={[]}
					/>
				)}
				{saveFile.settings?.snapShotExportAvailable && (
					<>
						<ExportSnapshotCard />
						<ImportSnapshotCard />
						<ResetSnapshotCard />
					</>
				)}

				{resetConfirmationInProgress ? (
					<button
						onClick={() =>
							addMessage({
								message: 'Resetting Your Save File',
								onRemoval: () => reset(),
								needsNoConfirmation: true,
							})
						}
						style={{ backgroundColor: 'darkred', color: 'white' }}
					>
						<h3>Are you sure? Click again to confirm</h3>
					</button>
				) : (
					<button
						onClick={() => setRCIP(true)}
						style={{ backgroundColor: 'darkred', color: 'white' }}
					>
						Delete Savefile and reset
					</button>
				)}
				<BugReportButton />
				<IdeaButton />

				{window.localStorage.getItem('devmode') &&
					Object.keys(mapsRecord).map((m) => (
						<Card
							key={m}
							onClick={() => navigate('MAIN', `MAP_MAKER_${m}` as RoutesType)}
							content={<h4>Map Maker {m}</h4>}
							icon={<GoTasklist size={battleSpriteSize} />}
							actionElements={[]}
						/>
					))}
			</Stack>
		</Page>
	);
};

export const ExpShareButton = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	if (saveFile.bag['exp-share'] <= 0 && saveFile.storage['exp-share'] <= 0) {
		return <></>;
	}
	return (
		<Card
			icon={<ItemSprite item={'exp-share'} />}
			onClick={() => {
				patchSaveFileReducer({
					settings: {
						...saveFile.settings,
						expShareActive: !saveFile.settings?.expShareActive,
					},
				});
			}}
			content={
				<h3>
					{saveFile.settings?.expShareActive
						? 'Every Pokemon on team gets Xp'
						: 'Only pokemon that battled get Xp'}
				</h3>
			}
			actionElements={[
				<strong>
					{saveFile.settings?.expShareActive ? 'Xp Share ON' : 'Xp Share Off'}
				</strong>,
			]}
		/>
	);
};
export const RepelButton = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	if (saveFile.activatedRepel) {
		return (
			<Card
				icon={<ItemSprite item={'repel'} />}
				onClick={() => {
					patchSaveFileReducer({
						activatedRepel: undefined,
					});
				}}
				content={<h3>Deactivate Repel</h3>}
				actionElements={[]}
			/>
		);
	}
	if (saveFile.bag['max-repel'] > 0 || saveFile.storage['max-repel'] > 0) {
		return (
			<Card
				icon={<ItemSprite item={'max-repel'} />}
				onClick={() => {
					patchSaveFileReducer({
						activatedRepel: 'max-repel',
					});
				}}
				content={<h3>Repel Pokemon up to level 60</h3>}
				actionElements={[]}
			/>
		);
	}
	if (saveFile.bag['super-repel'] > 0 || saveFile.storage['super-repel'] > 0) {
		return (
			<Card
				icon={<ItemSprite item={'super-repel'} />}
				onClick={() => {
					patchSaveFileReducer({
						activatedRepel: 'super-repel',
					});
				}}
				content={<h3>Repel Pokemon up to level 40</h3>}
				actionElements={[]}
			/>
		);
	}
	if (saveFile.bag['repel'] > 0 || saveFile.storage['repel'] > 0) {
		return (
			<Card
				icon={<ItemSprite item={'repel'} />}
				onClick={() => {
					patchSaveFileReducer({
						activatedRepel: 'repel',
					});
				}}
				content={<h3>Repel Pokemon up to level 20</h3>}
				actionElements={[]}
			/>
		);
	}
	return <></>;
};
export const LureButton = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const hasLure = saveFile.bag['lure'] > 0 || saveFile.storage['lure'] > 0;

	const hasSuperLure =
		saveFile.bag['super-lure'] > 0 || saveFile.storage['super-lure'] > 0;

	const hasMaxLure =
		saveFile.bag['max-lure'] > 0 || saveFile.storage['max-lure'] > 0;
	if (saveFile.activatedLure) {
		return (
			<Card
				icon={<ItemSprite item={saveFile.activatedLure ?? 'lure'} />}
				onClick={() => {
					patchSaveFileReducer({
						activatedLure: undefined,
					});
				}}
				content={<h3>Deactivate {saveFile.activatedLure}</h3>}
				actionElements={[]}
			/>
		);
	}
	if (hasLure || hasSuperLure || hasMaxLure) {
		return (
			<Card
				icon={<ItemSprite item={'lure'} />}
				content={<h3>Choose a Lure</h3>}
				actionElements={[
					hasLure ? (
						<ItemSprite
							item="lure"
							onClick={() => {
								patchSaveFileReducer({
									activatedLure: 'lure',
								});
							}}
						/>
					) : (
						<></>
					),
					hasSuperLure ? (
						<ItemSprite
							item="super-lure"
							onClick={() => {
								patchSaveFileReducer({
									activatedLure: 'super-lure',
								});
							}}
						/>
					) : (
						<></>
					),
					hasMaxLure ? (
						<ItemSprite
							item="max-lure"
							onClick={() => {
								patchSaveFileReducer({
									activatedLure: 'max-lure',
								});
							}}
						/>
					) : (
						<></>
					),
				]}
			/>
		);
	}
	return <></>;
};
export const FlyingButton = () => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);

	if (!saveFile.campUpgrades['pidgeot rider certification']) {
		return <></>;
	}

	const devmode = !!window.localStorage.getItem('devmode');
	if (mapsRecord[location.mapId].area !== 'OPEN' && !devmode) {
		return (
			<Card
				disabled
				content={<h4>Can only fly in the open</h4>}
				icon={
					<PokemonSprite name={'pidgeot'} config={{ officalArtwork: true }} />
				}
				actionElements={[]}
			/>
		);
	}
	return (
		<>
			{saveFile.flying ? (
				<Card
					onClick={() => patchSaveFileReducer({ flying: false })}
					content={<h4>Stop flying</h4>}
					icon={
						<PokemonSprite name={'pidgeot'} config={{ officalArtwork: true }} />
					}
					actionElements={[]}
				/>
			) : (
				<Card
					onClick={() => patchSaveFileReducer({ flying: true })}
					content={<h4>Fly on Pidgeot</h4>}
					icon={
						<PokemonSprite name={'pidgeot'} config={{ officalArtwork: true }} />
					}
					actionElements={[]}
				/>
			)}
		</>
	);
};
