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
				marginBottom: '-36px',
				width: '96px',
			}}
		>
			<img
				style={{ border: '2px solid black', borderRadius: '9000px' }}
				src={sunUrl}
			/>
			<img
				style={{ position: 'relative', top: '-32px', right: '-64px' }}
				src={firstPlanetUrl}
			/>
		</div>
	);
};
