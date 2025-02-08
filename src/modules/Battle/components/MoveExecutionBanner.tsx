import { useMemo } from 'react';
import { baseSize, battleSpriteSize } from '../../../constants/gameData';
import { typeColors } from '../../../constants/typeColors';
import { determineTypeFactor } from '../../../functions/determineTypeFactor';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattleAttack } from '../../../interfaces/BattleAttack';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Banner } from '../../../uiComponents/Banner/Banner';
import { hexToRgb } from '../../../functions/hexToRGB';

export const MoveExecutionBanner = ({
	attack,
	attacker,
	target,
	spriteFirst,
}: {
	attacker: BattlePokemon;
	target: BattlePokemon;
	attack: BattleAttack;
	spriteFirst?: boolean;
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
		<Banner
			flexDirection={spriteFirst ? 'row-reverse' : 'row'}
			backgroundColor={hexToRgb(typeColors[attack.data.type.name], 0.8)}
		>
			<img height={baseSize} src={`/typeIcons/${attack.data.type.name}.png`} />
			<div>
				<h3>
					{attacker.data.name} used {attack.name} against {target.data.name}
				</h3>
				{attack.multiHits && (
					<h5
						style={{
							paddingLeft: (attack.multiHits - 1) * 32,
						}}
					>
						Multihit!
					</h5>
				)}
				{typeFactorMessage && <h5>{typeFactorMessage}</h5>}
				{critMessage && <h5>{critMessage}</h5>}
			</div>

			<img
				height={battleSpriteSize}
				width={battleSpriteSize}
				src={getPokemonSprite(attacker.dexId)}
			/>
		</Banner>
	);
};
