import { baseSize } from '../../constants/gameData';

export const IconSolarSystem = ({
	sunUrl,
	firstPlanetUrl,
}: {
	sunUrl: string;
	firstPlanetUrl: string;
}) => {
	return (
		<div
			style={{
				marginBottom: `${-baseSize / 2}px`,
				width: `${baseSize * 1.5}px`,
			}}
		>
			<img
				style={{ border: '2px solid black', borderRadius: '9000px' }}
				src={sunUrl}
			/>
			<img
				style={{
					position: 'relative',
					top: `${-baseSize / 2}px`,
					right: `${-baseSize}px`,
				}}
				src={firstPlanetUrl}
			/>
		</div>
	);
};
