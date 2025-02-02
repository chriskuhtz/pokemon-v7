import React, { ReactNode } from 'react';
import './Card.css';

export const Card = ({
	icon,
	content,
	actionElements,
	onClick,
}: {
	icon: ReactNode;
	content: ReactNode;
	actionElements: React.JSX.Element[];
	onClick?: () => void;
}) => {
	return (
		<div
			tabIndex={0}
			role={onClick ? 'button' : 'none'}
			onClick={onClick}
			className="card"
		>
			{icon}
			{content}
			<div className="actionElements">
				{actionElements.map((a, i) => (
					<React.Fragment key={i}>{a}</React.Fragment>
				))}
			</div>
		</div>
	);
};
