import { useMemo } from 'react';
import { battleSpriteSize } from '../../../constants/gameData';
import { determineTypeFactor } from '../../../functions/determineTypeFactor';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattleAttack } from '../../../interfaces/BattleAttack';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const MoveExecutionBanner = ({
	attack,
	attacker,
	target,
}: {
	attacker: BattlePokemon;
	target: BattlePokemon;
	attack: BattleAttack;
}) => {
	const typeFactorMessage = useMemo(() => {
		const typeFactor = determineTypeFactor(target, attack);
		if (typeFactor === 0) {
			return 'It has no effect';
		}
		if (typeFactor > 1) {
			return 'It is very effective';
		}
		if (typeFactor < 1) {
			return 'It is not very effective';
		}

		return;
	}, [attack, target]);
	const critMessage = useMemo(() => {
		return attack.crit ? 'Critical Hit!' : undefined;
	}, [attack]);
	return (
		<Banner>
			<div>
				<h3>
					{attacker.data.name} used {attack.name} against {target.data.name}
				</h3>

				<h5>{typeFactorMessage}</h5>
				<h5>{critMessage}</h5>
			</div>

			<img
				height={battleSpriteSize}
				width={battleSpriteSize}
				src={getPokemonSprite(attacker.dexId)}
			/>
		</Banner>
	);
};
