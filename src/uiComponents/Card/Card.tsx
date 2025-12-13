import React, { ReactNode } from 'react';
import { portraitMode } from '../../constants/gameData/gameData';
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
			style={
				disabled
					? {
							backgroundColor: 'gray',
							color: 'white',
							filter: 'grayscale(1)',
					  }
					: undefined
			}
			onKeyDown={(e) => {
				e.stopPropagation();
				if (!disabled && e.key === 'Enter' && onClick) {
					onClick();
				}
			}}
		>
			<div>{icon}</div>
			<div>{content}</div>
			<div
				style={{
					display: 'flex',
					gap: '.5rem',
					alignItems: 'center',
					flexDirection: portraitMode ? 'row' : 'column',
				}}
			>
				{actionElements.map((a, i) => (
					<React.Fragment key={i}>{a}</React.Fragment>
				))}
			</div>
		</div>
	);
};
