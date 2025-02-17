export const Battle = ({ leave }: { leave: () => void }): JSX.Element => {
	return (
		<div>
			Lets take this real slow, big dog <button onClick={leave}>Leave</button>
		</div>
	);
};
