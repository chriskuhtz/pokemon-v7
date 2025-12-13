import React from 'react';
import { Stack } from '../Stack/Stack';

export const SelectionBar = ({
	options,
	select,
	selected,
	allowUndefined,
}: {
	options: { key: string; label: string }[];
	select: (x: string | undefined) => void;
	selected: string | undefined;
	allowUndefined: boolean;
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
						onClick={() => {
							if (allowUndefined && o.key === selected) {
								select(undefined);
								return;
							}
							select(o.key);
						}}
					>
						{o.label}
					</strong>
				</React.Fragment>
			))}
		</Stack>
	);
};
