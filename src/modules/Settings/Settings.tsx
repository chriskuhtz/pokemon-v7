import { useContext, useState } from 'react';
import { QuestsRecord } from '../../constants/checkLists/questsRecord';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { getRandomItem } from '../../interfaces/Item';
import { SettingsObject } from '../../interfaces/SaveFile';
import { Page } from '../../uiComponents/Page/Page';
import { ToggleRow } from '../../uiComponents/ToggleRow/ToggleRow';

export const randomQuestRewards = 'randomQuestRewards';
export const Settings = (): JSX.Element => {
	const { patchSaveFileReducer } = useContext(SaveFileContext);

	const [state, setState] = useState<SettingsObject>({
		fasterDays: false,
		doubleXpRates: false,
		rogueLike: false,
		noItemsInBattle: false,
		randomStarters: false,
		randomOverworldItems: false,
		randomQuestRewards: false,
		randomSwarms: false,
		releaseFaintedPokemon: false,
		//randomHeldItems: false,
	});

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
		});
	};
	return (
		<Page headline="Settings:">
			<button style={{ width: '100%' }} onClick={() => proceed()}>
				I am not reading that, lets go
			</button>
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
					value={state.fasterDays}
					setValue={(x) => setState({ ...state, fasterDays: x })}
					label={'Should Days take 4 hours instead of 24?'}
					description="Does not reduce growing etc. times, just changes time of day more often "
				/>
				<ToggleRow
					value={state.doubleXpRates}
					setValue={(x) => setState({ ...state, doubleXpRates: x })}
					label={'Double Xp Rates'}
				/>
				<h2>Difficulty:</h2> <span />
				<span />
				<ToggleRow
					value={state.rogueLike}
					setValue={(x) => setState({ ...state, rogueLike: x })}
					label={'Roguelike mode:'}
					description="Losing a battle completely resets your save file"
				/>
				<ToggleRow
					value={state.releaseFaintedPokemon}
					setValue={(x) => setState({ ...state, releaseFaintedPokemon: x })}
					label={'Defeated Pokemon are released into the wild:'}
					description="Losing a battle also completely resets your save file"
				/>
				<ToggleRow
					value={state.noItemsInBattle}
					setValue={(x) => setState({ ...state, noItemsInBattle: x })}
					label={'No Healing Items allowed in Battle:'}
				/>
				<h2>Randomization:</h2> <span />
				<span />
				<ToggleRow
					value={state.randomStarters}
					setValue={(x) => setState({ ...state, randomStarters: x })}
					label={'Do you want random starter pokemon choices:'}
					description={'makes 1 questline impossible'}
				/>
				<ToggleRow
					value={state.randomOverworldItems}
					setValue={(x) => setState({ ...state, randomOverworldItems: x })}
					label={'Random Overworld Items:'}
					description="increases Risk of Softlock"
				/>
				<ToggleRow
					value={state.randomQuestRewards}
					setValue={(x) => setState({ ...state, randomQuestRewards: x })}
					label={'Random Quest Rewards:'}
					description="increases Risk of Softlock"
				/>
				<ToggleRow
					value={state.randomSwarms}
					setValue={(x) => setState({ ...state, randomSwarms: x })}
					label={'Random Pokemon Swarms:'}
					description="can be weird: e.g. swarms of mewtwo"
				/>
				{/* <ToggleRow
					value={state.randomHeldItems}
					setValue={(x) => setState({ ...state, randomHeldItems: x })}
					label={'Do you want to randomize the held items of wild pokemon:'}
				/>{' '}
				<ToggleRow
					value={state.disqualifyFaintedPokemon}
					setValue={(x) => setState({ ...state, disqualifyFaintedPokemon: x })}
					label={'	Should your defeated Pokemon be released back into the wild:'}
					description={'Losing a battle = complete reset'}
				/> */}
			</div>
			<br />
			<br />
			<button style={{ width: '100%' }} onClick={() => proceed()}>
				Lets go
			</button>
		</Page>
	);
};
