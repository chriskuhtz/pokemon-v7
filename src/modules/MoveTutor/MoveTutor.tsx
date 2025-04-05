import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import {
	handledMoves,
	MoveName,
} from '../../constants/checkLists/movesCheckList';
import { nameToIdMap } from '../../constants/pokemonNames';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getItemUrl } from '../../functions/getItemUrl';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { LearnMethod } from '../../interfaces/PokemonData';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { moveIsTeachable } from '../../functions/moveIsAvailable';

export const MoveTutor = () => {
	const { saveFile } = useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const [id, setId] = useState<string | undefined>();

	const pokemonWithId = useMemo(
		() => team.find((t) => t.id === id),
		[id, team]
	);

	const navigate = useNavigate();
	return (
		<Page
			headline="Move Tutor"
			goBack={() => navigate('MOVE_TUTOR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{!id && <strong>Which Pokemon should I teach a move to?</strong>}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr',
						padding: '2rem',
						columnGap: '1rem',
						rowGap: '4rem',
					}}
				>
					{team.map((t) => (
						<PokemonSprite
							key={t.id}
							onClick={() => setId(t.id)}
							name={t.name}
							sizeFactor={id === t.id ? 3 : 1}
							config={{ officalArtwork: true, shiny: t.shiny }}
						/>
					))}
				</div>
				{pokemonWithId && <MoveEditor ownedPokemon={pokemonWithId} />}
			</Stack>
		</Page>
	);
};

const MoveEditor = ({ ownedPokemon }: { ownedPokemon: OwnedPokemon }) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const unlockMove = useCallback(
		(move: MoveName, payment: ItemType) => {
			if (saveFile.bag[payment] < 1) {
				console.log('yaya', payment, move);
				return;
			}
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [payment]: 1 }, true),
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id === ownedPokemon.id) {
						return {
							...ownedPokemon,
							unlockedMoves: [...ownedPokemon.unlockedMoves, move],
						};
					}

					return p;
				}),
			});
		},
		[ownedPokemon, patchSaveFileReducer, saveFile.bag, saveFile.pokemon]
	);
	const { res: data, invalidate } = useGetPokemonData(
		nameToIdMap[ownedPokemon.name]
	);

	useEffect(() => {
		if (data?.name && ownedPokemon.name !== data.name) {
			invalidate();
		}
	}, [data, invalidate, ownedPokemon]);

	const options = useMemo(() => {
		console.log(ownedPokemon.unlockedMoves);
		if (!data) {
			return [];
		}
		return data.moves.filter(
			(m) =>
				handledMoves.includes(m.move.name as MoveName) &&
				!ownedPokemon.unlockedMoves.includes(m.move.name as MoveName)
		);
	}, [data, ownedPokemon]);

	const getCostForLearnMethod = (learnMethod: LearnMethod): ItemType => {
		if (learnMethod === 'level-up') {
			return 'berry-juice';
		}
		if (learnMethod === 'egg' || learnMethod === 'tutor') {
			return 'lava-cookie';
		}
		return 'big-malasada';
	};

	return (
		<Stack mode={'column'}>
			{options.map((m) => {
				const payment = getCostForLearnMethod(
					m.version_group_details[0].move_learn_method.name
				);
				const available = moveIsTeachable(
					m,
					calculateLevelData(ownedPokemon.xp).level
				);
				return (
					<Card
						key={m.move.name}
						onClick={() => unlockMove(m.move.name as MoveName, payment)}
						actionElements={[]}
						icon={<img src={getItemUrl(payment)} />}
						disabled={saveFile.bag[payment] < 1 || !available}
						content={
							<strong>
								{available
									? m.move.name
									: `${m.move.name} available at Lvl ${m.version_group_details[0].level_learned_at}`}
							</strong>
						}
					/>
				);
			})}
		</Stack>
	);
};
