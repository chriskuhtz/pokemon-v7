import React, { useMemo, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { OwnedPokemonCard } from '../../components/OwnedPokemonCard/OwnedPokemonCard';
import { baseSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getTypeNames } from '../../functions/getTypeNames';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { IconSolarSystem } from '../../uiComponents/IconSolarSystem/IconSolarSystem';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Team = ({
	team,
	goBack,
	setTeam,
	changeHeldItem,
	inventory,
	evolve,
}: {
	team: OwnedPokemon[];
	goBack: () => void;
	setTeam: (newTeam: OwnedPokemon[]) => void;
	inventory: Inventory;
	changeHeldItem: (pokemonId: string, newItem?: ItemType) => void;
	evolve: (
		id: string,
		newDexId: number,
		name: string,
		newName: string,
		consumeHeldItem: boolean,
		consumedItem?: ItemType
	) => void;
}): JSX.Element => {
	const { res, invalidate } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true }))
	);

	const [focusedId, setFocusedId] = useState<string>(team[0].id);

	const focused = useMemo(
		() => team?.find((r) => r.id === focusedId),
		[team, focusedId]
	);
	const focusedData = useMemo(
		() => res?.find((r) => r.dexId === focused?.dexId)?.data,
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
							const d = res.find((r) => r.dexId === pokemon.dexId)?.data;

							if (!d) {
								return <React.Fragment key={index}></React.Fragment>;
							}
							const typeNames = getTypeNames({
								...pokemon,
								data: d,
							});

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
											size={baseSize / 3}
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
											url: getPokemonSprite(pokemon.dexId),
											styles: isOwnedPokemonKO(pokemon)
												? { filter: 'grayscale(1)' }
												: undefined,
										}}
										firstPlanetUrl={`/typeIcons/${typeNames[0]}.png`}
										secondPlanetUrl={
											typeNames.length > 1
												? `/typeIcons/${typeNames[1]}.png`
												: undefined
										}
										thirdPlanetUrl={getItemUrl(pokemon.ball)}
										fourthPlanetUrl={
											pokemon.heldItemName
												? getItemUrl(pokemon.heldItemName)
												: undefined
										}
									/>
									{pokemon.id === focusedId && index !== team.length - 1 && (
										<FaArrowRight
											onClick={() => reorder('DOWN')}
											size={baseSize / 3}
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
									return {
										...t,
										firstMove: {
											name: newMoveNames[0],
											usedPP: t.firstMove.usedPP,
										},
										secondMove:
											newMoveNames.length > 1
												? {
														name: newMoveNames[1],
														usedPP: t.secondMove?.usedPP ?? 0,
												  }
												: undefined,

										thirdMove:
											newMoveNames.length > 2
												? {
														name: newMoveNames[2],
														usedPP: t.thirdMove?.usedPP ?? 0,
												  }
												: undefined,

										fourthMove:
											newMoveNames.length > 3
												? {
														name: newMoveNames[3],
														usedPP: t.fourthMove?.usedPP ?? 0,
												  }
												: undefined,
									};
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
					evolve={(
						newDexId: number,
						newName: string,
						consumeHeldItem: boolean,
						item?: ItemType
					) => {
						evolve(
							focusedId,
							newDexId,
							focusedData.name,
							newName,
							consumeHeldItem,
							item
						);
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
