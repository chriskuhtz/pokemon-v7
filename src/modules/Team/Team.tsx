import React, { useMemo, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { OwnedPokemonCard } from '../../components/OwnedPokemonCard/OwnedPokemonCard';
import { baseSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { getTypeNames } from '../../functions/getTypeNames';
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
		consumedItem?: ItemType
	) => void;
}): JSX.Element => {
	const { res, invalidate } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true }))
	);

	const [focused, setFocused] = useState<OwnedPokemon>(team[0]);

	const focusedData = useMemo(
		() => res?.find((r) => r.dexId === focused.dexId)?.data,
		[res, focused]
	);

	const reorder = (dir: 'UP' | 'DOWN') => {
		const index = team.findIndex((p) => p.id === focused.id);
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
			if (p.id === focused.id) {
				return displaced;
			}
			return p;
		});

		setTeam(newTeam);
	};

	if (!focusedData || !res) {
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
								>
									{index !== 0 && pokemon.id === focused.id && (
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
										onClick={() => setFocused(pokemon)}
										key={pokemon.id}
										sun={{ url: getPokemonSprite(pokemon.dexId) }}
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
									{pokemon.id === focused.id && index !== team.length - 1 && (
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
					evolve={(newDexId: number, newName: string, item?: ItemType) => {
						evolve(focused.id, newDexId, focusedData.name, newName, item);
						invalidate();
					}}
					data={focusedData}
					key={focused.id}
					pokemon={focused}
					inventory={inventory}
					takeHeldItem={() => changeHeldItem(focused.id)}
					giveHeldItem={(newItem: ItemType) =>
						changeHeldItem(focused.id, newItem)
					}
				/>
			</Stack>
		</Page>
	);
};
