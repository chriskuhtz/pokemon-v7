import { CSSProperties, ReactNode } from 'react';
import { baseSize } from '../../constants/gameData';

export const IconSolarSystem = ({
	sun,
	firstPlanet,
	secondPlanetUrl,
	thirdPlanetUrl,
	fourthPlanetUrl,
	fifthPlanetUrl,
	onClick,
}: {
	sun: { url: string; styles?: CSSProperties };
	firstPlanet?: ReactNode;
	secondPlanetUrl?: string;
	thirdPlanetUrl?: string;
	fourthPlanetUrl?: string;
	fifthPlanetUrl?: string;
	onClick?: () => void;
}) => {
	return (
		<div
			style={{
				width: `${baseSize * 1.5}px`,
				height: `${baseSize * 1.5}px`,
				position: 'relative',
			}}
		>
			<img
				role={onClick ? 'button' : undefined}
				tabIndex={onClick ? 0 : undefined}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (onClick && e.key === 'Enter') {
						onClick();
					}
				}}
				onClick={onClick}
				style={{
					...sun.styles,
					border: '2px solid black',
					borderRadius: '9000px',
					width: baseSize,
					height: baseSize,
					padding: baseSize * 0.25,
				}}
				src={sun.url}
			/>
			{firstPlanet && (
				<div
					style={{
						position: 'absolute',
						top: `${-baseSize / 6}px`,
						left: `${baseSize / 2}px`,
					}}
				>
					{typeof firstPlanet === 'string' ? (
						<img height={baseSize / 2} width={baseSize / 2} src={firstPlanet} />
					) : (
						firstPlanet
					)}
				</div>
			)}

			{secondPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${baseSize / 16}px`,
						right: `${-baseSize / 16}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={secondPlanetUrl}
				/>
			)}

			{thirdPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${baseSize / 2}px`,
						right: `${-baseSize / 4}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={thirdPlanetUrl}
				/>
			)}
			{fourthPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${baseSize}px`,
						right: `${-baseSize / 16}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={fourthPlanetUrl}
				/>
			)}
			{fifthPlanetUrl && (
				<img
					style={{
						position: 'absolute',
						top: `${(baseSize * 7.5) / 6}px`,
						left: `${baseSize / 2}px`,
					}}
					height={baseSize / 2}
					width={baseSize / 2}
					src={fifthPlanetUrl}
				/>
			)}
		</div>
	);
};
