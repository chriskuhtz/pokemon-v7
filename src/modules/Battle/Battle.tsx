import React from 'react';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';

export const BattleWrapper = ({
	leave,
	opponents,
	team,
}: {
	leave: () => void;
	opponents: OwnedPokemon[];
	team: OwnedPokemon[];
}): JSX.Element => {
	const { res: battleOpponents } = useGetBattleTeam(opponents);
	const { res: battleTeam } = useGetBattleTeam(team);

	if (!battleOpponents || !battleTeam) {
		return <LoadingScreen />;
	}
	return <Battle leave={leave} opponents={battleOpponents} team={battleTeam} />;
};

const Battle = ({
	leave,
	opponents,
	team,
}: {
	leave: () => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
}): JSX.Element => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				Encountered this crew:
				{opponents.map((opponent) => (
					<React.Fragment key={opponent.id}>
						<strong>{opponent.data.name}</strong>
						<img src={getPokemonSprite(opponent.dexId)} />
					</React.Fragment>
				))}
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				Our Gang:
				{team.map((teamMember) => (
					<React.Fragment key={teamMember.id}>
						<img src={getPokemonSprite(teamMember.dexId, 'back')} />
						<strong>{teamMember.data.name}</strong>
					</React.Fragment>
				))}
			</div>
			<div>What should we do:</div>
			<button onClick={leave}>Leave</button>
		</div>
	);
};
