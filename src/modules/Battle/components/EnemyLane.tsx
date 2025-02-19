import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { baseSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export function EnemyLane({
	onFieldOpponents,
}: {
	onFieldOpponents: BattlePokemon[];
}) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '.5rem',
				}}
			>
				{onFieldOpponents.map((t) => (
					<BattlePokemonInfo pokemon={t} key={t.id} />
				))}
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{onFieldOpponents.map((t) => {
					if (t.status === 'CAUGHT') {
						return (
							<img height={baseSize} key={t.id} src={getItemUrl(t.ball)} />
						);
					}
					if (t.status === 'CATCHING_1') {
						return (
							<img
								style={{ transform: 'translate(0, -2rem)' }}
								height={baseSize}
								key={t.id}
								src={getItemUrl(t.ball)}
							/>
						);
					}
					if (t.status === 'CATCHING_2') {
						return (
							<img
								style={{ transform: 'rotate(45deg)' }}
								height={baseSize}
								key={t.id}
								src={getItemUrl(t.ball)}
							/>
						);
					}
					if (t.status === 'CATCHING_3') {
						return (
							<img
								style={{ transform: 'rotate(315deg)' }}
								height={baseSize}
								key={t.id}
								src={getItemUrl(t.ball)}
							/>
						);
					}

					return (
						<img
							height={baseSize * 2}
							key={t.id}
							src={getPokemonSprite(t.dexId)}
						/>
					);
				})}
			</div>
		</div>
	);
}
