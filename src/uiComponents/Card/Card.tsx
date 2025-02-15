import React, { ReactNode } from 'react';
import './Card.css';

export const Card = ({
	icon,
	content,
	actionElements,
	onClick,
	disabled,
	highlighted,
}: {
	icon: ReactNode;
	content: ReactNode;
	actionElements: React.JSX.Element[];
	onClick?: () => void;
	disabled?: boolean;
	highlighted?: boolean;
}) => {
	return (
		<div
			tabIndex={onClick && !disabled ? 0 : undefined}
			role={onClick && !disabled ? 'button' : 'none'}
			onClick={disabled ? undefined : onClick}
			className={`card ${highlighted ? 'highlightedCard' : ''}`}
			onKeyDown={(e) => {
				e.stopPropagation();
				if (!disabled && e.key === 'Enter' && onClick) {
					onClick();
				}
			}}
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
