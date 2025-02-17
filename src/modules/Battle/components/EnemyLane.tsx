import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export function EnemyLane({
	onFieldOpponents,
}: {
	onFieldOpponents: BattlePokemon[];
}) {
	return (
		<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
			{onFieldOpponents.map((t) => (
				<img key={t.id} src={getPokemonSprite(t.dexId)} />
			))}
		</div>
	);
}
