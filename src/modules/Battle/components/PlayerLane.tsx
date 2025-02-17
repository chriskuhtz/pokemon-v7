import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export function PlayerLane(props: { onFieldTeam: BattlePokemon[] }) {
	return (
		<div
			style={{
				display: 'flex',
			}}
		>
			{props.onFieldTeam.map((t) => (
				<img key={t.id} src={getPokemonSprite(t.dexId, 'back')} />
			))}
		</div>
	);
}
