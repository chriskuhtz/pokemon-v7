import { LayerName } from '../hooks/useMapEditor';
import { FloatyMenu } from './FloatyMenu';

export const LayerSelector = ({
	activeTab,
	setActiveTab,
}: {
	activeTab: LayerName;
	setActiveTab: (x: LayerName) => void;
}) => {
	return (
		<FloatyMenu top={16} left={96}>
			<div
				style={{
					display: 'flex',
					gap: '1rem',
				}}
			>
				<strong>Layer:</strong>
				{[
					'Base',
					'Obstacle',
					'Decoration',
					'Encounter',
					'Foreground',
					'Water',
				].map((t) => (
					<strong
						key={t}
						style={{
							borderRadius: '8px',
							padding: '0 .25rem',
							cursor: 'pointer',
							color: t === activeTab ? 'white' : 'black',
							backgroundColor: t === activeTab ? 'darkred' : undefined,
						}}
						onClick={() => setActiveTab(t as LayerName)}
					>
						{t}
					</strong>
				))}
			</div>
		</FloatyMenu>
	);
};
