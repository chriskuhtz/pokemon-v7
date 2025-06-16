import { useContext, useState } from 'react';
import { QuestsRecord } from '../../constants/questsRecord';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { getRandomBall, getRandomItem } from '../../interfaces/Item';
import { RoutesType } from '../../interfaces/Routing';
import { SettingsObject } from '../../interfaces/SaveFile';
import { Page } from '../../uiComponents/Page/Page';
import { ToggleRow } from '../../uiComponents/ToggleRow/ToggleRow';

export const randomQuestRewards = 'randomQuestRewards';
export const Settings = ({ backTo }: { backTo?: RoutesType }): JSX.Element => {
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);

	const [state, setState] = useState<SettingsObject>(
		saveFile.settings ?? {
			fasterDays: false,
			doubleXpRates: false,
			rogueLike: false,
			releaseFaintedPokemon: false,
			noItemsInBattle: false,
			randomStarters: false,
			randomOverworldItems: false,
			randomQuestRewards: false,
			randomSwarms: false,
			randomAbilities: false,
			randomHeldItems: false,
			randomLearnSets: false,
			smarterOpponents: false,
			hideMovementButtons: false,
			minimalGrindingMode: false,
			unlimitedPathfindingRange: false,
			seekOutEncounters: false,
		}
	);

	const proceed = () => {
		if (state.randomQuestRewards) {
			window.localStorage.setItem(
				randomQuestRewards,
				JSON.stringify(
					Object.fromEntries(
						Object.entries(QuestsRecord).map(([name, quest]) => {
							return [
								name,
								{
									...quest,
									rewardItems: {
										[getRandomItem()]: Math.floor(1 + Math.random() * 9),
										[getRandomBall()]: Math.floor(1 + Math.random() * 4),
									},
								},
							];
						})
					)
				)
			);
		} else window.localStorage.removeItem(randomQuestRewards);

		if (state.fasterDays) {
			window.localStorage.setItem('fasterDays', 'true');
		} else window.localStorage.removeItem('fasterDays');
		patchSaveFileReducer({
			settings: state,
			meta: {
				activeTab: backTo ? backTo : saveFile.meta.activeTab,
			},
		});
	};
	return (
		<Page
			goBack={
				backTo
					? () => {
							proceed();
					  }
					: undefined
			}
			headline="Settings:"
		>
			{!backTo && (
				<button style={{ width: '100%' }} onClick={() => proceed()}>
					I am not reading that, lets go
				</button>
			)}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '8fr 1fr 1fr',
					rowGap: '1rem',
					columnGap: '.5rem',
					alignItems: 'center',
				}}
			>
				<h2>Quality of life:</h2>
				<span />
				<span />
				<ToggleRow
					value={!!state.fasterDays}
					setValue={(x) => setState({ ...state, fasterDays: x })}
					label={'Should Days take 4 hours instead of 24?'}
					description="Does not reduce growing etc. times, just changes time of day more often "
				/>
				<ToggleRow
					value={!!state.doubleXpRates}
					setValue={(x) => setState({ ...state, doubleXpRates: x })}
					label={'Double Xp Rates'}
				/>
				<ToggleRow
					value={!!state.minimalGrindingMode}
					setValue={(x) => setState({ ...state, minimalGrindingMode: x })}
					label={'Minimal Grinding Mode'}
					description="Effort- and Individual Stats are ignored for you and opponents"
				/>
				<h2>Movement:</h2> <span />
				<span />
				<ToggleRow
					value={!!state.hideMovementButtons}
					setValue={(x) => setState({ ...state, hideMovementButtons: x })}
					label={'Hide Movement Buttons'}
				/>
				<ToggleRow
					value={!!state.seekOutEncounters}
					setValue={(x) => setState({ ...state, seekOutEncounters: x })}
					label={'Seek Encounters'}
					description="Choose the movement path with the most wild pokemon"
				/>
				<ToggleRow
					value={!!state.unlimitedPathfindingRange}
					setValue={(x) => setState({ ...state, unlimitedPathfindingRange: x })}
					label={'Unlimited Pathfinder'}
					description="Walk through the entire map with one click, otherwise limited to ~15 fields"
				/>
				<h2>Difficulty:</h2> <span />
				<span />
				<ToggleRow
					value={!!state.smarterOpponents}
					setValue={(x) => setState({ ...state, smarterOpponents: x })}
					label={'"Smarter" Opponents:'}
					description="Double Battle Opponents can reconsider their moves during the turn"
				/>
				<ToggleRow
					value={!!state.rogueLike}
					setValue={(x) => setState({ ...state, rogueLike: x })}
					label={'Roguelike mode:'}
					description="Losing a battle completely resets your save file"
				/>
				<ToggleRow
					value={!!state.releaseFaintedPokemon}
					setValue={(x) => setState({ ...state, releaseFaintedPokemon: x })}
					label={'Defeated Pokemon are released into the wild:'}
					description="Losing a battle also completely resets your save file"
				/>
				<ToggleRow
					value={!!state.noItemsInBattle}
					setValue={(x) => setState({ ...state, noItemsInBattle: x })}
					label={'No Healing Items allowed in Battle:'}
				/>
				<h2>Randomization:</h2> <span />
				<span />
				<ToggleRow
					value={!!state.randomStarters}
					setValue={(x) => setState({ ...state, randomStarters: x })}
					label={'Do you want random starter pokemon choices:'}
					description={'can make 1 questline impossible'}
				/>
				<ToggleRow
					value={!!state.randomOverworldItems}
					setValue={(x) => setState({ ...state, randomOverworldItems: x })}
					label={'Random Overworld Items:'}
				/>
				<ToggleRow
					value={!!state.randomQuestRewards}
					setValue={(x) => setState({ ...state, randomQuestRewards: x })}
					label={'Random Quest Rewards:'}
				/>
				<ToggleRow
					value={!!state.randomSwarms}
					setValue={(x) => setState({ ...state, randomSwarms: x })}
					label={'Random Pokemon Swarms:'}
					description="can be weird: e.g. swarms of mewtwo"
				/>
				<ToggleRow
					value={!!state.randomHeldItems}
					setValue={(x) => setState({ ...state, randomHeldItems: x })}
					label={'Random Held Items:'}
				/>
				<ToggleRow
					value={!!state.randomAbilities}
					setValue={(x) => setState({ ...state, randomAbilities: x })}
					label={'Random Abilities:'}
				/>
				<ToggleRow
					value={!!state.randomLearnSets}
					setValue={(x) => setState({ ...state, randomLearnSets: x })}
					label={'Random Learnable Moves:'}
				/>
			</div>
			<br />
			<br />
			<button style={{ width: '100%' }} onClick={() => proceed()}>
				Lets go
			</button>
		</Page>
	);
};
