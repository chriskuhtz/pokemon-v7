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
				<h4 style={{ margin: 0 }}>
					Do you want to randomize your starter pokemon choices:
				</h4>
				<button
					style={{
						backgroundColor: state.randomStarters === false ? 'black' : 'white',

						color: state.randomStarters === false ? 'white' : 'black',
					}}
					onClick={() => setState({ ...state, randomStarters: false })}
				>
					No
				</button>
				<button
					style={{
						backgroundColor: state.randomStarters === true ? 'black' : 'white',

						color: state.randomStarters === true ? 'white' : 'black',
					}}
					onClick={() => setState({ ...state, randomStarters: true })}
				>
					Yes
				</button>
				<div>
					<h4 style={{ margin: 0 }}>
						Should your defeated Pokemon automatically be released into the
						wild:
					</h4>
					<strong>(Losing a battle = complete reset)</strong>
				</div>
				<button
					style={{
						backgroundColor:
							state.disqualifyFaintedPokemon === false ? 'black' : 'white',

						color: state.disqualifyFaintedPokemon === false ? 'white' : 'black',
					}}
					onClick={() =>
						setState({ ...state, disqualifyFaintedPokemon: false })
					}
				>
					No
				</button>
				<button
					style={{
						backgroundColor:
							state.disqualifyFaintedPokemon === true ? 'black' : 'white',

						color: state.disqualifyFaintedPokemon === true ? 'white' : 'black',
					}}
					onClick={() => setState({ ...state, disqualifyFaintedPokemon: true })}
				>
					Yes
				</button>
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
