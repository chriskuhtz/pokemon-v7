import { battleSpriteSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { PokeballType } from '../../../interfaces/Item';
import { BattleStep } from '../Battle';

export const PlayerLane = ({
	dexId,
	ballType,
	battleStep,
	voidSteps,
}: {
	dexId: number;
	ballType: PokeballType;
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
					src={getItemUrl(ballType)}
				/>
			</div>
		);
	}
	return (
		<div className="playerLane">
			<img
				width={battleSpriteSize}
				height={battleSpriteSize}
				src={getPokemonSprite(dexId, 'back')}
			/>
		</div>
	);
};
