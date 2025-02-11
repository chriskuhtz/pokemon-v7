import { battleSpriteSize } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

import { useState } from 'react';
export const StarterSelection = ({
	proceed,
}: {
	proceed: (name: string, starterDexId: number) => void;
}): JSX.Element => {
	const options = [1, 4, 7];
	const [chosenStarter, setChosenStarter] = useState<number>(options[0]);
	const [name, setName] = useState<string | undefined>('');
	return (
		<Page headline="Intro:">
			<Stack mode="column" alignItems="center">
				{' '}
				<Stack mode="row" justifyContent="center">
					<h3>What is your name:</h3>
					<input value={name} onChange={(e) => setName(e.target.value)} />
				</Stack>
				<h3 style={{ margin: 0 }}>Which starter will you choose:</h3>
				<Stack mode="row" justifyContent="center">
					{options.map((o) => (
						<img
							key={o}
							style={{
								borderRadius: 9000,
								border:
									o === chosenStarter
										? `2px solid ${typeColors['dark']}`
										: undefined,
							}}
							height={battleSpriteSize}
							width={battleSpriteSize}
							src={getPokemonSprite(o)}
							onClick={() => setChosenStarter(o)}
						/>
					))}
				</Stack>
				<button
					disabled={!name}
					onClick={() => proceed(name ?? '', chosenStarter)}
				>
					Proceed
				</button>
			</Stack>
		</Page>
	);
};
