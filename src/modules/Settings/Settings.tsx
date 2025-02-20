import { useEffect, useState } from 'react';
import { animationTimer, baseSize } from '../../constants/gameData';
import { getNextClockWiseDirection } from '../../functions/getNextClockwiseDirection';
import { CharacterOrientation } from '../../interfaces/SaveFile';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useDrawCharacter } from '../Overworld/hooks/useDrawCharacter';

export const Settings = ({
	proceed,
}: {
	proceed: (randomStarters: boolean) => void;
}): JSX.Element => {
	return (
		<Page headline="Settings:">
			<Stack mode="column" alignItems="center">
				<h3 style={{ margin: 0 }}>
					Do you want to randomize your starter pokemon choices:
				</h3>
				<Stack mode="row" justifyContent="stretch">
					<button onClick={() => proceed(false)}> No</button>
					<button onClick={() => proceed(true)}>Yes</button>
				</Stack>
			</Stack>
		</Page>
	);
};

export const SpriteSelection = ({
	proceed,
}: {
	proceed: (sprite: string) => void;
}): JSX.Element => {
	return (
		<Page headline="What do you look like:">
			<Stack mode="row" justifyContent="stretch">
				{Object.values(SpriteEnum).map((s) => (
					<Sprite id={`NPC_${s}`} onClick={() => proceed(`NPC_${s}`)} />
				))}
			</Stack>
		</Page>
	);
};

export const useRotate = (): CharacterOrientation => {
	const [cur, setCur] = useState<CharacterOrientation>('DOWN');
	useEffect(() => {
		const t = setTimeout(
			() => setCur(getNextClockWiseDirection(cur)),
			animationTimer
		);

		return () => clearTimeout(t);
	}, [cur]);

	return cur;
};
export const Sprite = ({
	id,
	onClick,
}: {
	id: string;
	onClick: () => void;
}) => {
	const orientation = useRotate();
	useDrawCharacter(
		id,
		{
			x: 0,
			y: 0,
			forwardFoot: 'CENTER1',
			orientation,
			mapId: 'testMap',
		},
		id
	);

	return (
		<canvas
			width={baseSize}
			height={baseSize}
			onClick={onClick}
			id={id}
		></canvas>
	);
};
