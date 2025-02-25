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

const defaultStarters = [133, 4, 7];
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
		<Stack mode="column" alignItems="center">
			<Sprite id={SpriteEnum['oak']} rotating={false} />
			<h3>I see, so you are {name}.</h3>
			<h3>Thank you for deciding to join our research outpost</h3>
			<h3>Our Goal is to learn everything about the pokemon of this region</h3>
			<h3>There are many ways to contribute.</h3>
			<h3>Just talk to the people in the camp.</h3>
			<h3>Be kind, brave and curious...</h3>
			<button onClick={() => proceed(name, chosenStarter)}>Continue</button>
		</Stack>
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
