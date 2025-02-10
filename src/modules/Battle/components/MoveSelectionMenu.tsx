import { useMemo } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MoveCard } from '../../../components/MoveCard/MoveCard';
import { baseSize } from '../../../constants/gameData';
import { determineCrit } from '../../../functions/determineCrit';
import { determineMultiHits } from '../../../functions/determineMultiHits';
import { recommendMove } from '../../../functions/recommendMove';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../interfaces/Weather';
import { BattleAction } from '../hooks/UseBattleSteps/useBattleSteps';

export const MoveSelectionMenu = ({
	chooseMove,
	player,
	opponent,
	battleWeather,
	goBack,
}: {
	chooseMove: (x: BattleAction) => void;
	opponent: BattlePokemon;
	player: BattlePokemon;
	battleWeather: WeatherType | undefined;
	goBack: () => void;
}) => {
	const { firstMove, secondMove, thirdMove, fourthMove } = player;
	const recommendedMove = useMemo(() => {
		return recommendMove(player, opponent, battleWeather);
	}, [battleWeather, opponent, player]);

	return (
		<div
			style={{
				display: 'grid',
				gap: '.5rem',
				alignItems: 'center',
				gridTemplateColumns: '1fr 3fr 3fr 3fr 3fr',
				padding: '0 .5rem',
			}}
		>
			<IoIosArrowBack
				role="button"
				tabIndex={0}
				size={baseSize / 2}
				onClick={goBack}
			/>
			{[firstMove, secondMove, thirdMove, fourthMove].map((m) => {
				if (m) {
					return (
						<MoveCard
							key={m.name}
							move={m}
							highlighted={recommendedMove.name === m.name}
							note={recommendedMove.name === m.name ? 'Recommended' : undefined}
							onClick={() =>
								chooseMove({
									...m,
									crit: determineCrit(
										m.name,
										m.data.meta.crit_rate,
										opponent.ability
									),

									multiHits: determineMultiHits(m),
								})
							}
						/>
					);
				}
			})}
		</div>
	);
};
