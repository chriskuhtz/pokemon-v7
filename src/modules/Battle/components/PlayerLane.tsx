import { battleSpriteSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getStats } from '../../../functions/getStats';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { BattleStep } from '../types/BattleStep';
import { BattlePokemonInfoBox } from './BattlePokemonInfoBox';
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
			<BattlePokemonInfoBox
				statBoosts={pokemon.statBoosts}
				stats={getStats(pokemon.data.stats, pokemon.xp, pokemon.nature)}
				damage={pokemon.damage}
				dexId={pokemon.dexId}
				xp={pokemon.xp}
				playerSide
			/>
		</div>
	);
};
