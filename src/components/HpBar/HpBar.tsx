import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';

export const HpBar = ({ max, damage }: { max: number; damage: number }) => (
	<AnimatedBar max={max} offset={damage} />
);
