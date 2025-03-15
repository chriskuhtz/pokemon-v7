import { useState } from 'react';
import { Sprite } from '../../components/Sprite/Sprite';
import { battleSpriteSize } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getRandomPokemonId } from '../../functions/getRandomPokemonId';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

const defaultStarters = [1, 4, 7];
const randomStarterOptions = [
	getRandomPokemonId(),
	getRandomPokemonId(),
	getRandomPokemonId(),
];
export const StarterSelection = ({
	randomStarters,
	proceed,
}: {
	randomStarters: boolean;
	proceed: (name: string, starterDexId: number) => void;
}): JSX.Element => {
	const options = randomStarters ? randomStarterOptions : defaultStarters;
	const [chosenStarter, setChosenStarter] = useState<number | undefined>();
	const [name, setName] = useState<string | undefined>('');
	const [finished, setFinished] = useState<boolean>(false);

	return finished && name && chosenStarter ? (
		<div style={{ padding: '0 1rem', backgroundColor: 'white' }}>
			<Stack mode="column" alignItems="center">
				<Sprite id={SpriteEnum['oak']} rotating={false} />
				<h3>I see, so you are {name}.</h3>
				<h3>Thank you for accepting the position as my research assistant.</h3>
				<h3>My Name is Samuel Oak.</h3>
				<h3>I have devoted my life to studying pokemon in the Kanto Region.</h3>
				<h3>But now, it is time for a new Adventure.</h3>
				<h3>
					We are establishing a research outpost in the uninhabited Kuma Region.
				</h3>
				<h3>Our Goal is to learn everything about the pokemon here.</h3>
				<h3>We will start out with very limited resources.</h3>
				<h3>
					But if we achieve research breakthroughs, we will attract more
					attention and expand our research camp.
				</h3>

				<h3>Safe travels, I will meet you there.</h3>
				<button onClick={() => proceed(name, chosenStarter)}>Continue</button>
			</Stack>
		</div>
	) : (
		<Page headline="Intro:">
			<Stack mode="column" alignItems="center">
				{' '}
				<Stack mode="row" justifyContent="center">
					<h3>What is your name:</h3>
					<input value={name} onChange={(e) => setName(e.target.value)} />
				</Stack>
				<h3 style={{ margin: 0 }}>Which starter will you choose:</h3>
				<Stack mode="row" justifyContent="center" alignItems="center">
					{options.map((o) => (
						<img
							role="button"
							tabIndex={0}
							key={o}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setChosenStarter(o);
								}
							}}
							style={{
								borderRadius: 9000,
								border:
									o === chosenStarter
										? `2px solid ${typeColors['dark']}`
										: undefined,
							}}
							height={battleSpriteSize / (o === chosenStarter ? 1 : 2)}
							width={battleSpriteSize / (o === chosenStarter ? 1 : 2)}
							src={
								o === chosenStarter
									? getPokemonSprite(o)
									: getItemUrl('poke-ball')
							}
							onClick={() => setChosenStarter(o)}
						/>
					))}
				</Stack>
				<button
					disabled={!name || !chosenStarter}
					onClick={() => setFinished(true)}
				>
					Proceed
				</button>
			</Stack>
		</Page>
	);
};
