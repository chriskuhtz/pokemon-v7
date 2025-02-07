import { battleSpriteSize } from '../../../constants/gameData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const MoveMissedBanner = ({ attacker }: { attacker: BattlePokemon }) => {
	return (
		<Banner>
			<div>
				<h3>{attacker.data.name} missed!</h3>
			</div>

			<img
				height={battleSpriteSize}
				width={battleSpriteSize}
				src={getPokemonSprite(attacker.dexId)}
			/>
		</Banner>
	);
};
