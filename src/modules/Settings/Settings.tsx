import { useState } from 'react';
import { SettingsObject } from '../../interfaces/SaveFile';
import { Page } from '../../uiComponents/Page/Page';
import { ToggleRow } from '../../uiComponents/ToggleRow/ToggleRow';

export const Settings = ({
	proceed,
}: {
	proceed: (settings: SettingsObject) => void;
}): JSX.Element => {
	const [state, setState] = useState<SettingsObject>({
		randomStarters: false,
		rogueLike: false,
		//disqualifyFaintedPokemon: false,
		//randomHeldItems: false,
	});
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
					label={'Do you want to randomize your starter pokemon choices:'}
				/>
				<ToggleRow
					value={state.rogueLike}
					setValue={(x) => setState({ ...state, rogueLike: x })}
					label={'Roguelike mode:'}
					description="Losing a battle completely resets your save file"
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
			<button style={{ width: '100%' }} onClick={() => proceed(state)}>
				Lets go
			</button>
		</Page>
	);
};
