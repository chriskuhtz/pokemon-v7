import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';

export const Battle = ({
	leave,
	opponent,
}: {
	leave: () => void;
	opponent: OwnedPokemon;
}): JSX.Element => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			<div>
				Encountered this guy <img src={getPokemonSprite(opponent.dexId)} />
			</div>
			<div>What should we do:</div>
			<button onClick={leave}>Leave</button>
		</div>
	);
};
