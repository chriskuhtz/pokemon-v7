import { HpBar } from '../../../components/HpBar/HpBar';
import { battleSpriteSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { BattleStep } from '../types/BattleStep';
export const PlayerLane = ({
	pokemon,

	battleStep,
	voidSteps,
}: {
	pokemon: BattlePokemon;
	battleStep: BattleStep;
	voidSteps: BattleStep[];
}) => {
	if (voidSteps.includes(battleStep)) {
		return <div></div>;
	}
	if (battleStep === 'PLAYER_EMERGE' || battleStep === 'OPPONENT_EMERGE') {
		return (
			<div className="playerLane">
				<img
					style={{
						paddingTop: battleSpriteSize / 2,
						paddingLeft: battleSpriteSize / 4,
					}}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(pokemon.ball)}
				/>
			</div>
		);
	}
	return (
		<div className="playerLane">
			<img
				width={battleSpriteSize}
				height={battleSpriteSize}
				src={getPokemonSprite(pokemon.dexId, 'back')}
			/>
			<HpBar max={pokemon.stats.hp} damage={pokemon.damage} />
		</div>
	);
};
