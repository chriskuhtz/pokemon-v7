import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import {
	battleSpriteSize,
	portraitMode,
} from '../../../constants/gameData/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getSizeFactor } from '../../../functions/getSizeFactor';
import { useLocationBattlePlatform } from '../../../hooks/useLocationColors';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export function EnemyLane({
	onFieldOpponents,
	spriteGeneration,
}: {
	onFieldOpponents: BattlePokemon[];
	spriteGeneration?: 1;
}) {
	const platform = useLocationBattlePlatform();
	return (
		<div
			style={{
				display: 'flex',
				alignItems: portraitMode ? 'flex-end' : 'center',
				flexDirection: portraitMode ? 'column' : 'row',
			}}
		>
			<div
				style={{
					display: 'grid',
					alignItems: 'center',
					gap: '.5rem',
					gridTemplateColumns: '1fr 1fr',
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
					backgroundImage: `url('/battlePlatforms/${platform}.png')`,
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
					minWidth: '300px',
					justifyContent: 'center',
					height: 100,
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
							sizeFactor={
								getSizeFactor(t.data.height) * (spriteGeneration ? 2 : 1)
							}
							key={t.id}
							name={t.name}
							config={{ shiny: t.shiny, spriteGeneration }}
						/>
					);
				})}
			</div>
		</div>
	);
}
