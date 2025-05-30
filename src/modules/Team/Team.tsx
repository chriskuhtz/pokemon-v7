import React, { useCallback, useContext, useMemo, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { OwnedPokemonCard } from '../../components/OwnedPokemonCard/OwnedPokemonCard';
import { getPokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { battleSpriteSize } from '../../constants/gameData';
import { getHeldItem } from '../../functions/getHeldItem';
import { getItemUrl } from '../../functions/getItemUrl';
import { getTypeNames } from '../../functions/getTypeNames';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { withChangedMoves } from '../../functions/withChangedMoves';

export const Team = ({
	team,
	goBack,
	changeHeldItem,
	inventory,
	initialFocus,
}: {
	team: OwnedPokemon[];
	initialFocus: string;
	goBack: () => void;
	inventory: Inventory;
	changeHeldItem: (pokemonId: string, newItem?: ItemType) => void;
}): JSX.Element => {
	const {
		evolvePokemonReducer: evolve,
		patchSaveFileReducer,
		saveFile,
	} = useContext(SaveFileContext);
	const { res, invalidate } = useGetBattleTeam(team, {});

	const setTeam = useCallback(
		(newTeam: OwnedPokemon[]) => {
			patchSaveFileReducer({
				pokemon: [...newTeam, ...saveFile.pokemon.filter((p) => !p.onTeam)],
			});
		},
		[patchSaveFileReducer, saveFile.pokemon]
	);

	const [focusedId, setFocusedId] = useState<string>(initialFocus);

	const focused = useMemo(
		() => team?.find((r) => r.id === focusedId),
		[team, focusedId]
	);
	const focusedData = useMemo(
		() => res?.find((r) => r.name === focused?.name)?.data,
		[res, focused]
	);

	const reorder = (dir: 'UP' | 'DOWN') => {
		if (!focused) {
			return;
		}
		const index = team.findIndex((p) => p.id === focusedId);
		if (index === 0 && dir == 'UP') {
			return;
		}
		if (index === team.length - 1 && dir == 'DOWN') {
			return;
		}
		const displaced =
			dir === 'UP' ? { ...team[index - 1] } : { ...team[index + 1] };

		const newTeam = team.map((p) => {
			if (p.id === displaced.id) {
				return focused;
			}
			if (p.id === focusedId) {
				return displaced;
			}
			return p;
		});

		setTeam(newTeam);
	};

	if (!focusedData || !res || !focused) {
		return <LoadingScreen />;
	}

	return (
		<Page goBack={goBack} headline="Team:">
			<Stack mode="column">
				<div
					style={{
						padding: '1rem',
						border: '2px solid black',
						borderRadius: '1rem',
					}}
				>
					<Stack alignItems="center" mode="row" justifyContent="space-evenly">
						{team.map((pokemon, index) => {
							const d = res.find((r) => r.name === pokemon.name)?.data;

							if (!d) {
								return <React.Fragment key={index}></React.Fragment>;
							}
							const typeNames = getTypeNames({
								...pokemon,
								data: d,
							});

							const heldItem = getHeldItem(pokemon);

							return (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '.5rem',
									}}
									key={pokemon.id}
								>
									{index !== 0 && pokemon.id === focusedId && (
										<FaArrowLeft
											onClick={() => reorder('UP')}
											size={battleSpriteSize}
											role="button"
											tabIndex={0}
											onKeyDown={(e) => {
												e.stopPropagation();
												if (e.key === 'Enter') {
													reorder('UP');
												}
											}}
										/>
									)}
									<IconSolarSystem
										onClick={() => setFocusedId(pokemon.id)}
										sun={{
											url: getPokemonSprite(pokemon.name, {
												shiny: pokemon.shiny,
											}),
											styles: isOwnedPokemonKO(pokemon)
												? { filter: 'grayscale(1)' }
												: undefined,
										}}
										firstPlanet={`/typeIcons/${typeNames[0]}.png`}
										secondPlanetUrl={
											typeNames.length > 1
												? `/typeIcons/${typeNames[1]}.png`
												: undefined
										}
										thirdPlanetUrl={getItemUrl(pokemon.ball)}
										fourthPlanetUrl={
											heldItem ? getItemUrl(heldItem) : undefined
										}
									/>
									{pokemon.id === focusedId && index !== team.length - 1 && (
										<FaArrowRight
											onClick={() => reorder('DOWN')}
											size={battleSpriteSize}
											role="button"
											tabIndex={0}
											onKeyDown={(e) => {
												e.stopPropagation();
												if (e.key === 'Enter') {
													reorder('DOWN');
												}
											}}
										/>
									)}
								</div>
							);
						})}
					</Stack>
				</div>
				<OwnedPokemonCard
					setMoves={(id, newMoveNames) => {
						setTeam(
							team.map((t) => {
								if (t.id === id) {
									return withChangedMoves(t, newMoveNames);
								}

								return t;
							})
						);
					}}
					setNickName={(id, nickname) => {
						setTeam(
							team.map((t) => {
								if (t.id === id) {
									return {
										...t,
										nickname,
									};
								}

								return t;
							})
						);
					}}
					evolve={(payload) => {
						evolve(payload);
						invalidate();
					}}
					data={focusedData}
					key={focusedId}
					pokemon={focused}
					inventory={inventory}
					takeHeldItem={() => changeHeldItem(focusedId)}
					giveHeldItem={(newItem: ItemType) =>
						changeHeldItem(focusedId, newItem)
					}
				/>
			</Stack>
		</Page>
	);
};
