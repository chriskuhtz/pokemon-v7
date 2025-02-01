import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattleStep, Opponent } from '../Battle';

export const EnemyLane = ({
	opponent,
	battleStep,
	voidSteps,
}: {
	opponent: Opponent;
	battleStep: BattleStep;
	voidSteps: BattleStep[];
}) => {
	if (voidSteps.includes(battleStep)) {
		return <div></div>;
	}
	if (battleStep === 'OPPONENT_EMERGE') {
		return (
			<div className="enemyLane">
				<img
					style={{ paddingTop: 78 }}
					width={156}
					height={78}
					src={`/inBattle/emergingGrass.png`}
				/>
			</div>
		);
	}
	return (
		<div className="enemyLane">
			<img width={156} height={156} src={getPokemonSprite(opponent.dexId)} />
		</div>
	);
};
