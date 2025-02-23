import { OwnedPokemonCard } from '../../components/OwnedPokemonCard/OwnedPokemonCard';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Team = ({
	team,
	goBack,
	setTeam,
	changeHeldItem,
	inventory,
}: {
	team: OwnedPokemon[];
	goBack: () => void;
	setTeam: (newTeam: OwnedPokemon[]) => void;
	inventory: Inventory;
	changeHeldItem: (pokemonId: string, newItem?: ItemType) => void;
}): JSX.Element => {
	const { res } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true }))
	);

	if (!res) {
		return <LoadingScreen />;
	}

	return (
		<Page goBack={goBack} headline="Team:">
			<Stack mode="column">
				{team.map((pokemon, index) => (
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
						data={res[index].data}
						key={pokemon.id}
						pokemon={pokemon}
						inventory={inventory}
						takeHeldItem={() => changeHeldItem(pokemon.id)}
						giveHeldItem={(newItem: ItemType) =>
							changeHeldItem(pokemon.id, newItem)
						}
						reorder={(dir: 'UP' | 'DOWN') => {
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
									return pokemon;
								}
								if (p.id === pokemon.id) {
									return displaced;
								}
								return p;
							});

							setTeam(newTeam);
						}}
					/>
				))}
			</Stack>
		</Page>
	);
};
