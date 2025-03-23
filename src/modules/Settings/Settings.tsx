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
		randomStarters: false,
		rogueLike: false,
		randomOverworldItems: false,
		randomQuestRewards: false,
		fasterDays: false,
		//disqualifyFaintedPokemon: false,
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
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '8fr 1fr 1fr',
					rowGap: '1rem',
					columnGap: '.5rem',
					alignItems: 'center',
				}}
			>
				<ToggleRow
					value={state.randomStarters}
					setValue={(x) => setState({ ...state, randomStarters: x })}
					label={'Do you want random starter pokemon choices:'}
					description={'makes 1 questline impossible'}
				/>
				<ToggleRow
					value={state.rogueLike}
					setValue={(x) => setState({ ...state, rogueLike: x })}
					label={'Roguelike mode:'}
					description="Losing a battle completely resets your save file"
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
					value={state.fasterDays}
					setValue={(x) => setState({ ...state, fasterDays: x })}
					label={'Should Days take 4 hours instead of 24?'}
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
