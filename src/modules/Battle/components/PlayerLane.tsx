import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { PokeballType } from '../../../interfaces/Item';
import { BattleStep } from '../Battle';

export const PlayerLane = ({
	activePlayerPokemonId,
	ballType,
	battleStep,
	voidSteps,
}: {
	activePlayerPokemonId: number;
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
					style={{ paddingTop: 78, paddingLeft: 39 }}
					width={78}
					height={78}
					src={getItemUrl(ballType)}
				/>
			</div>
		);
	}
	return (
		<div className="playerLane">
			<img
				width={156}
				height={156}
				src={getPokemonSprite(activePlayerPokemonId, 'back')}
			/>
		</div>
	);
};
