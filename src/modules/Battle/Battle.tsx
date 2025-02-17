import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';

export const BattleWrapper = ({
	leave,
	opponent,
}: {
	leave: () => void;
	opponent: OwnedPokemon;
}): JSX.Element => {
	const { res } = useGetBattleTeam([opponent]);

	if (!res) {
		return <LoadingScreen />;
	}
	return <Battle leave={leave} opponent={res[0]} />;
};

const Battle = ({
	leave,
	opponent,
}: {
	leave: () => void;
	opponent: BattlePokemon;
}): JSX.Element => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				Encountered a <strong>{opponent.data.name}</strong>
				<img src={getPokemonSprite(opponent.dexId)} />
			</div>
			<div>What should we do:</div>
			<button onClick={leave}>Leave</button>
		</div>
	);
};
