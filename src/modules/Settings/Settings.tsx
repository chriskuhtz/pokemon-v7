import { useContext, useState } from 'react';
import { QuestsRecord } from '../../constants/questsRecord';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { getRandomBall, getRandomItem } from '../../interfaces/Item';
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
				<h2>Difficulty:</h2> <span />
				<span />
				<ToggleRow
					value={!!state.smarterOpponents}
					setValue={(x) => setState({ ...state, smarterOpponents: x })}
					label={'Smarter Opponents:'}
					description="Double Battle Opponents can choose their second move after the first is executed"
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
