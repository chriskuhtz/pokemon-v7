import { useEffect, useState } from 'react';
import { animationTimer } from '../../constants/gameData';
import { AddToastFunction } from '../../hooks/useToasts';
import { Challenger } from '../../interfaces/Challenger';
import { IntroBanner } from './components/IntroBanner';
import { useChallenger } from './hooks/useChallenger';

export const NewBattle = ({
	player,
	opponent,
}: {
	player: Challenger;
	opponent: Challenger;
	addToast: AddToastFunction;
	fightersPerSide: number;
}): JSX.Element => {
	const [showBanner, setShowBanner] = useState<boolean>(true);

	const { challenger: battlePlayer } = useChallenger(player);
	const { challenger: battleOpponent } = useChallenger(opponent);

	useEffect(() => {
		if (battlePlayer && battleOpponent && showBanner) {
			const t = setTimeout(() => setShowBanner(false), animationTimer * 2);

			return () => clearTimeout(t);
		}
	}, [battleOpponent, battlePlayer, showBanner]);

	if (showBanner || !battleOpponent || !battlePlayer) {
		return <IntroBanner player={player} opponent={opponent} />;
	}

	return <div>Hello</div>;
};
