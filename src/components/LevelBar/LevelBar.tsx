import { calculateLevelData } from '../../functions/calculateLevelData';

export const LevelBar = ({ xp }: { xp: number }) => {
	return <strong>Lvl: {calculateLevelData(xp).level}</strong>;
};
