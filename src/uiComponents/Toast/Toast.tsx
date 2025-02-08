export const Toast = ({ message }: { message: string }) => {
	return (
		<div
			style={{
				position: 'absolute',
				left: '.5rem',
				padding: '1rem 2rem',
				top: '.5rem',
				backgroundColor: 'rgba(0,0,0,.8)',
				color: 'white',
				borderRadius: '1rem',
			}}
		>
			{message}
		</div>
	);
};
