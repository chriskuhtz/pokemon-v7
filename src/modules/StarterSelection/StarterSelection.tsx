import { useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';
import { getPokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { Sprite } from '../../components/Sprite/Sprite';
import {
	CampUpgrade,
	campUpgradeNames,
} from '../../constants/checkLists/campUpgrades';
import {
	battleSpriteSize,
	shinyChance,
	testPokemon,
} from '../../constants/gameData';
import { PokemonName } from '../../constants/pokemonNames';
import { typeColors } from '../../constants/typeColors';
import { addPokemonToDex } from '../../functions/addPokemonToDex';
import { getItemUrl } from '../../functions/getItemUrl';
import { getRandomPokemonName } from '../../functions/getRandomPokemonId';
import { reduceBattlePokemonToOwnedPokemon } from '../../functions/reduceBattlePokemonToOwnedPokemon';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { CompleteInventory } from '../../interfaces/Inventory';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { EmptyStatObject } from '../../interfaces/StatObject';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
const defaultStarters: PokemonName[] = ['bulbasaur', 'charmander', 'squirtle'];
const randomStarterOptions = [
	getRandomPokemonName(),
	getRandomPokemonName(),
	getRandomPokemonName(),
];
export const StarterSelection = (): JSX.Element => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const options = saveFile.settings?.randomStarters
		? randomStarterOptions
		: defaultStarters;

	const { res: fullStarters } = useGetBattleTeam(
		options.map((o) => ({
			...testPokemon,
			name: o,
			id: v4(),
			effortValues: EmptyStatObject,
		})),
		{
			assignLearnsetMoves: true,
			assignGender: true,
			assignNaturalAbility: true,
			generateIvs: true,
		}
	);
	const [chosenStarter, setChosenStarter] = useState<
		BattlePokemon | undefined
	>();
	const [name, setName] = useState<string | undefined>('');
	const [finished, setFinished] = useState<boolean>(false);

	const proceed = useCallback(() => {
		if (!name || !chosenStarter) {
			return;
		}
		const mon = reduceBattlePokemonToOwnedPokemon({
			...chosenStarter,
			ownerId: name,
			shiny: Math.random() < shinyChance,
		});

		const pokedex = addPokemonToDex(saveFile.pokedex, mon.name, 'camp', true);

		const devmode = !!window.localStorage.getItem('devmode');

		if (devmode) {
			patchSaveFileReducer({
				...saveFile,
				playerId: name,
				pokemon: [{ ...mon, xp: 1250000 }],
				storage: CompleteInventory,
				campUpgrades: Object.fromEntries(
					campUpgradeNames.map((key) => [key, true])
				) as Record<CampUpgrade, boolean>,
				meta: { activeTab: 'OVERWORLD' },
				starterPokemon: mon.name,
				pokedex,
			});
		} else
			patchSaveFileReducer({
				...saveFile,
				playerId: name,
				pokemon: [mon],
				meta: { activeTab: 'OVERWORLD' },
				starterPokemon: mon.name,
				pokedex,
			});
	}, [chosenStarter, name, patchSaveFileReducer, saveFile]);

	if (!fullStarters) {
		return <LoadingScreen />;
	}

	return finished && name && chosenStarter ? (
		<Page headline="">
			<Stack mode="column" alignItems="center">
				<Sprite canvasKey={'oak'} id={SpriteEnum['oak']} rotating={false} />
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
				<button onClick={() => proceed()}>Continue</button>
			</Stack>
		</Page>
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
					{fullStarters.map((o) => (
						<img
							role="button"
							tabIndex={0}
							key={o.id}
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
							height={battleSpriteSize * (o === chosenStarter ? 3 : 1.5)}
							width={battleSpriteSize * (o === chosenStarter ? 3 : 1.5)}
							src={
								o === chosenStarter
									? getPokemonSprite(o.name, { shiny: o.shiny })
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
