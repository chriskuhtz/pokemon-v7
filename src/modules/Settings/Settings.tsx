import { useState } from 'react';
import { SettingsObject } from '../../interfaces/SaveFile';
import { Page } from '../../uiComponents/Page/Page';

export const Settings = ({
	proceed,
}: {
	proceed: (settings: SettingsObject) => void;
}): JSX.Element => {
	const [state, setState] = useState<SettingsObject>({
		randomStarters: false,
		disqualifyFaintedPokemon: false,
		randomHeldItems: false,
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
				<SettingsRow
					value={state.randomStarters}
					setValue={(x) => setState({ ...state, randomStarters: x })}
					label={'Do you want to randomize your starter pokemon choices:'}
				/>
				<SettingsRow
					value={state.randomHeldItems}
					setValue={(x) => setState({ ...state, randomHeldItems: x })}
					label={'Do you want to randomize the held items of wild pokemon:'}
				/>{' '}
				<SettingsRow
					value={state.disqualifyFaintedPokemon}
					setValue={(x) => setState({ ...state, disqualifyFaintedPokemon: x })}
					label={
						'	Should your defeated Pokemon automatically be released into the wild:'
					}
					description={'Losing a battle = complete reset'}
				/>
			</div>

			<h3
				style={{
					borderTop: '1px solid black',
					paddingTop: '2rem',
					color: 'darkred',
				}}
			>
				These settings cannot be changed later
			</h3>
			<br />
			<button style={{ width: '100%' }} onClick={() => proceed(state)}>
				Lets go
			</button>
		</Page>
	);
};

export const SettingsRow = ({
	label,
	value,
	setValue,
	description,
}: {
	value: boolean;
	setValue: (x: boolean) => void;
	label: string;
	description?: string;
}) => {
	return (
		<>
			<div>
				<h4 style={{ margin: 0 }}>{label}</h4>
				{description && <strong>{description}</strong>}
			</div>
			<button
				style={{
					backgroundColor: !value ? 'black' : 'white',

					color: !value ? 'white' : 'black',
				}}
				onClick={() => setValue(false)}
			>
				No
			</button>
			<button
				style={{
					backgroundColor: value ? 'black' : 'white',

					color: value ? 'white' : 'black',
				}}
				onClick={() => setValue(true)}
			>
				Yes
			</button>
		</>
	);
};
