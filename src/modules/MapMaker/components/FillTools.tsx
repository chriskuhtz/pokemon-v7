import { LayerName } from '../hooks/useMapEditor';
import { FloatyMenu } from './FloatyMenu';

export const FillTools = ({
	activeTab,
	clearLayer,
	randomFill,
	replaceAll,
}: {
	activeTab: LayerName;
	clearLayer: (x: LayerName) => void;
	randomFill: (x: LayerName, y: number) => void;
	replaceAll: (x: LayerName) => void;
}) => {
	return (
		<FloatyMenu top={16} left={window.innerWidth - 432}>
			<div style={{ display: 'flex', gap: '.5rem' }}>
				{activeTab !== 'Base' && (
					<button
						style={{ padding: '.5rem', borderRadius: '.5rem' }}
						onClick={() => clearLayer(activeTab)}
					>
						clear
					</button>
				)}
				<button
					style={{
						padding: '.5rem',
						borderRadius: '.5rem',
					}}
					onClick={() => randomFill(activeTab, 0.1)}
				>
					Random 10%
				</button>
				<button
					style={{
						padding: '.5rem',
						borderRadius: '.5rem',
					}}
					onClick={() => randomFill(activeTab, 1)}
				>
					100%
				</button>
				<button
					style={{
						padding: '.5rem',
						borderRadius: '.5rem',
					}}
					onClick={() => replaceAll(activeTab)}
				>
					Replace all
				</button>
			</div>
		</FloatyMenu>
	);
};
