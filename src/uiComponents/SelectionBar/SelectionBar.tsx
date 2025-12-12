import React from 'react';
import { Stack } from '../Stack/Stack';

export const SelectionBar = ({
	options,
	select,
	selected,
}: {
	options: string[];
	select: (x: string) => void;
	selected: string | undefined;
}) => {
	return (
		<Stack mode={'row'}>
			{options.map((o, i) => (
				<React.Fragment key={o}>
					{i > 0 && <strong>|</strong>}
					<strong
						style={{
							whiteSpace: 'nowrap',
							textDecoration: selected === o ? 'underline' : undefined,
						}}
						onClick={() => select(o)}
					>
						{o}
					</strong>
				</React.Fragment>
			))}
		</Stack>
	);
};
