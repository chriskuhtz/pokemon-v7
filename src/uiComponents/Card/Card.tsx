import React from 'react';
import './Card.css';

export const Card = ({
	spriteUrl,
	content,
	actionElements,
}: {
	spriteUrl: string;
	content: React.JSX.Element;
	actionElements: React.JSX.Element[];
}) => {
	return (
		<div className="card">
			<img src={spriteUrl} />
			{content}
			<div className="actionElements">
				{actionElements.map((a, i) => (
					<React.Fragment key={i}>{a}</React.Fragment>
				))}
			</div>
		</div>
	);
};
