import { useState } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getRandomPokemonId } from '../../functions/getRandomPokemonId';
import { Banner } from '../../uiComponents/Banner/Banner';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useBattleMessages } from '../Battle/hooks/useBattleMessages';

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
	const { latestMessage, addMultipleMessages } = useBattleMessages();
	const options = randomStarters ? randomStarterOptions : defaultStarters;
	const [chosenStarter, setChosenStarter] = useState<number | undefined>();
	const [name, setName] = useState<string | undefined>('');

	const finishForm = (name: string, starterDexId: number) => {
		addMultipleMessages([
			{ message: `I see, so you are ${name}` },
			{ message: `You chose an excellent first pokemon` },
			{
				message: `Now have fun exploring the world of pokemon`,
				onRemoval: () => proceed(name, starterDexId),
			},
		]);
	};
	return latestMessage ? (
		<Banner>
			<h2>{latestMessage.message}</h2>
		</Banner>
	) : (
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
							role="button"
							tabIndex={0}
							key={o}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									if (!name) {
										setChosenStarter(o);
									} else finishForm(name, o);
								}
							}}
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
					disabled={!name || !chosenStarter}
					onClick={() => finishForm(name ?? '', chosenStarter ?? 0)}
				>
					Proceed
				</button>
			</Stack>
		</Page>
	);
};
