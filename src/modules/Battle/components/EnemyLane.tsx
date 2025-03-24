import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { battleSpriteSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
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
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					backgroundImage: "url('/battlePlatforms/grass.png')",
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
					minWidth: '300px',
					justifyContent: 'center',
				}}
			>
				{onFieldOpponents.map((t) => {
					if (t.status === 'CAUGHT') {
						return (
							<img
								height={battleSpriteSize}
								key={t.id}
								src={getItemUrl(t.ball)}
							/>
						);
					}
					if (t.status === 'CATCHING_1') {
						return (
							<img
								style={{ transform: 'translate(0, -2rem)' }}
								height={battleSpriteSize}
								key={t.id}
								src={getItemUrl(t.ball)}
							/>
						);
					}
					if (t.status === 'CATCHING_2') {
						return (
							<img
								style={{ transform: 'rotate(45deg)' }}
								height={battleSpriteSize}
								key={t.id}
								src={getItemUrl(t.ball)}
							/>
						);
					}
					if (t.status === 'CATCHING_3') {
						return (
							<img
								style={{ transform: 'rotate(315deg)' }}
								height={battleSpriteSize}
								key={t.id}
								src={getItemUrl(t.ball)}
							/>
						);
					}

					return (
						<PokemonSprite
							style={{ margin: '2rem 1rem' }}
							key={t.id}
							name={t.name}
							config={{ shiny: t.shiny }}
						/>
					);
				})}
			</div>
		</div>
	);
}
