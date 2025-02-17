import React from 'react';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';

export const BattleWrapper = ({
	leave,
	opponents,
}: {
	leave: () => void;
	opponents: OwnedPokemon[];
}): JSX.Element => {
	const { res } = useGetBattleTeam(opponents);

	if (!res) {
		return <LoadingScreen />;
	}
	return <Battle leave={leave} opponents={res} />;
};

const Battle = ({
	leave,
	opponents,
}: {
	leave: () => void;
	opponents: BattlePokemon[];
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
			<div>What should we do:</div>
			<button onClick={leave}>Leave</button>
		</div>
	);
};
