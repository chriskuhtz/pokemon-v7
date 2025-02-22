import { useState } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getRandomPokemonId } from '../../functions/getRandomPokemonId';
import { Message } from '../../hooks/useMessageQueue';
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
	latestMessage,
	addMultipleMessages,
}: {
	randomStarters: boolean;
	proceed: (name: string, starterDexId: number) => void;
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	interjectMessage: (message: Message) => void;
}): JSX.Element => {
	const options = randomStarters ? randomStarterOptions : defaultStarters;
	const [chosenStarter, setChosenStarter] = useState<number | undefined>();
	const [name, setName] = useState<string | undefined>('');

	const finishForm = (name: string, starterDexId: number) => {
		addMultipleMessages([
			{ message: `I see, so you are ${name}` },
			{ message: `Thank you for deciding to join our research outpost` },
			{
				message: `Our Goal is to learn everything about the pokemon of this region`,
			},
			{ message: `There are many ways to contribute` },
			{ message: `Just talk to the people in the camp` },
			{
				message: `Be kind, brave and curious`,
				onRemoval: () => proceed(name, starterDexId),
			},
		]);
	};
	return latestMessage ? (
		<></>
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
					onClick={() => finishForm(name ?? '', chosenStarter ?? 0)}
				>
					Proceed
				</button>
			</Stack>
		</Page>
	);
};
