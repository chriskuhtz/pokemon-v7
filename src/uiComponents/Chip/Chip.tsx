export const Chip = ({ children }: { children: React.JSX.Element }) => {
	return (
		<div
			style={{
				color: 'white',
				backgroundColor: 'black',
				fontSize: 'smaller',
				borderRadius: 9000,
				padding: '0 .25rem',
				whiteSpace: 'nowrap',
				width: 'min-content',
			}}
		>
			{children}
		</div>
	);
};
