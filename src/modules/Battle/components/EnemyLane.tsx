import { battleSpriteSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { PokeballType } from '../../../interfaces/Item';
import { BattleStep } from '../types/BattleStep';
import { BattlePokemonInfoBox } from './BattlePokemonInfoBox';

export const EnemyLane = ({
	opponentPokemon,
	battleStep,
	voidSteps,
	catchProcessBall,
}: {
	opponentPokemon: BattlePokemon;
	battleStep: BattleStep;
	voidSteps: BattleStep[];
	catchProcessBall?: PokeballType;
}) => {
	if (voidSteps.includes(battleStep)) {
		return <div></div>;
	}
	if (
		(battleStep === 'CATCHING_PROCESS_2' && catchProcessBall) ||
		(battleStep === 'CATCHING_SUCCESS' && catchProcessBall)
	) {
		return (
			<div className="enemyLane">
				<img
					style={{ padding: battleSpriteSize / 4 }}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(catchProcessBall)}
				/>
			</div>
		);
	}
	if (battleStep === 'CATCHING_PROCESS_3' && catchProcessBall) {
		return (
			<div className="enemyLane">
				<img
					style={{ padding: battleSpriteSize / 4, rotate: '45deg' }}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(catchProcessBall)}
				/>
			</div>
		);
	}
	if (battleStep === 'CATCHING_PROCESS_4' && catchProcessBall) {
		return (
			<div className="enemyLane">
				<img
					style={{ padding: battleSpriteSize / 4, rotate: '315deg' }}
					width={battleSpriteSize / 2}
					height={battleSpriteSize / 2}
					src={getItemUrl(catchProcessBall)}
				/>
			</div>
		);
	}
	if (battleStep === 'OPPONENT_EMERGE') {
		return (
			<div className="enemyLane">
				<img
					width={battleSpriteSize}
					height={battleSpriteSize}
					src={getPokemonSprite(opponentPokemon.dexId)}
					style={{ marginRight: -battleSpriteSize }}
				/>
				<img
					style={{ position: 'relative', top: battleSpriteSize / 2 }}
					width={battleSpriteSize}
					height={battleSpriteSize / 2}
					src={`/inBattle/emergingGrass.png`}
				/>
			</div>
		);
	}
	return (
		<div className="enemyLane">
			<BattlePokemonInfoBox pokemon={opponentPokemon} />
		</div>
	);
};
