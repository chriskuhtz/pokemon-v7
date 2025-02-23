export const ToggleRow = ({
	label,
	value,
	setValue,
	description,
}: {
	value: boolean;
	setValue: (x: boolean) => void;
	label: string;
	description?: string;
}) => {
	return (
		<>
			<div>
				<h3 style={{ margin: 0 }}>{label}</h3>
				{description && (
					<strong style={{ color: 'red' }}>({description})</strong>
				)}
			</div>
			<button
				style={{
					backgroundColor: !value ? 'black' : 'white',

					color: !value ? 'white' : 'black',
				}}
				onClick={() => setValue(false)}
			>
				No
			</button>
			<button
				style={{
					backgroundColor: value ? 'black' : 'white',

					color: value ? 'white' : 'black',
				}}
				onClick={() => setValue(true)}
			>
				Yes
			</button>
		</>
	);
};
