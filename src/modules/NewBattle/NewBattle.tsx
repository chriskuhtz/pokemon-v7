import { AddToastFunction } from '../../hooks/useToasts';
import { Challenger } from '../../interfaces/Challenger';
import { IntroBanner } from './components/IntroBanner';
import { useChallenger } from './hooks/useChallenger';

export const NewBattle = ({
	player,
	opponent,
	addToast,
}: {
	player: Challenger;
	opponent: Challenger;
	addToast: AddToastFunction;
}): JSX.Element => {
	const { challenger: battlePlayer, setChallenger: setBattlePlayer } =
		useChallenger(player);
	const { challenger: battleOpponent, setChallenger: setBattleOpponent } =
		useChallenger(opponent);

	if (!battlePlayer || !battleOpponent) {
		return <IntroBanner player={player} opponent={opponent} />;
	}

	return <div></div>;
};
