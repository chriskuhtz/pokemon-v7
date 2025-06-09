import { JSX } from 'react';
import { FaEraser } from 'react-icons/fa';
import { battleSpriteSize } from '../../../constants/gameData';
import { useSnippets } from '../hooks/useSnippets';
import { FloatyMenu } from './FloatyMenu';
import { GroupSelection } from './GroupSelection';
import { Tool } from './MapEditor';
import { SnippetSelection } from './SnippetSelection';

export const ToolSelection = ({
	selected,
	setSelected,
	tileSetUrl,
}: {
	selected: Tool | undefined;
	setSelected: (x: Tool) => void;
	tileSetUrl: string;
}): JSX.Element => {
	const { snippets, addSnippet, removeSnippet } = useSnippets(tileSetUrl);

	return (
		<FloatyMenu zIndex={2} top={80} left={16}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					padding: '1rem 0',
					maxHeight: '80dvh',
					overflow: 'scroll',
				}}
			>
				<div>
					<FaEraser
						onClick={() => setSelected({ type: 'eraser' })}
						size={battleSpriteSize}
						style={{
							color: selected?.type === 'eraser' ? 'green' : 'black',
						}}
					/>
				</div>
				<GroupSelection
					addSnippet={addSnippet}
					selected={selected}
					setSelected={setSelected}
					tileSetUrl={tileSetUrl}
				/>

				<SnippetSelection
					remove={removeSnippet}
					selectSnippet={setSelected}
					tileSetUrl={tileSetUrl}
					snippets={snippets}
				/>
			</div>
		</FloatyMenu>
	);
};
