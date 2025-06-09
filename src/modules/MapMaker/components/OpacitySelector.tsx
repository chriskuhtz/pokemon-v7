import { FloatyMenu } from './FloatyMenu';

export const OpacitySelector = ({
	setOpacity,
	opacity,
}: {
	setOpacity: React.Dispatch<number>;
	opacity: number;
}) => {
	return (
		<FloatyMenu top={16} left={window.innerWidth - 112}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexDirection: 'column',
				}}
			>
				<strong>Overlay Opacity</strong>

				{[0.25, 0.6, 0.75, 1].map((val) => (
					<strong
						key={val}
						style={{
							cursor: 'pointer',
							color: opacity === val ? 'white' : 'black',
							backgroundColor: opacity === val ? 'darkred' : undefined,
							borderRadius: '8px',
							padding: '0 .25rem',
						}}
						onClick={() => setOpacity(val)}
					>
						{val * 100}%
					</strong>
				))}
			</div>
		</FloatyMenu>
	);
};
