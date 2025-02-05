import React, { ReactNode } from 'react';
import './Card.css';

export const Card = ({
	icon,
	content,
	actionElements,
	onClick,
	disabled,
}: {
	icon: ReactNode;
	content: ReactNode;
	actionElements: React.JSX.Element[];
	onClick?: () => void;
	disabled?: boolean;
}) => {
	return (
		<div
			tabIndex={0}
			role={onClick && !disabled ? 'button' : 'none'}
			onClick={disabled ? undefined : onClick}
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
