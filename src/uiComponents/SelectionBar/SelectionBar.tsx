import React from 'react';
import { Stack } from '../Stack/Stack';

export const SelectionBar = ({
	options,
	select,
	selected,
}: {
	options: { key: string; label: string }[];
	select: (x: string) => void;
	selected: string | undefined;
}) => {
	return (
		<Stack mode={'row'}>
			{options.map((o, i) => (
				<React.Fragment key={o.key}>
					{i > 0 && <strong>|</strong>}
					<strong
						style={{
							whiteSpace: 'nowrap',
							textDecoration: selected === o.key ? 'underline' : undefined,
						}}
						onClick={() => select(o.key)}
					>
						{o.label}
					</strong>
				</React.Fragment>
			))}
		</Stack>
	);
};
