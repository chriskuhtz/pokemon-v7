import { maxBst } from '../../constants/baseStatRecord';
import { HIDDEN_STATS } from '../../constants/hiddenStats';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';

export const BstExplanation = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}): JSX.Element => {
	return (
		<>
			<p>
				Total Base Stats (equal for all {ownedPokemon.name}), compared to the
				strongest Pokemon:
			</p>
			<AnimatedBar
				max={maxBst}
				offset={
					maxBst -
					data.stats.reduce((sum, summand) => {
						if (HIDDEN_STATS.includes(summand.stat.name)) {
							return sum;
						}
						return sum + summand.base_stat;
					}, 0)
				}
			/>
		</>
	);
};
