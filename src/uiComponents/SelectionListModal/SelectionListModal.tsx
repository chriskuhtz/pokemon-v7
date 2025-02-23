import { Stack } from '../Stack/Stack';

export const SelectionListModal = ({
	options,
	selected,
	toggle,
	min,
	max,
	onConfirm,
	open,
}: {
	options: string[];
	selected: string[];
	toggle: (x: string) => void;
	min: number;
	max: number;
	onConfirm?: () => void;
	open: boolean;
}) => {
	if (!open) {
		return <></>;
	}
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100dvw',
				height: '100dvh',
				maxHeight: '100dvh',
				overflow: 'hidden',
				backgroundColor: 'rgba(0,0,0,.8)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9000,
			}}
		>
			<div
				style={{
					padding: '1rem',
					margin: '1rem',
					borderRadius: '1rem',
					border: '2px solid black',
					backgroundColor: 'white',
					maxWidth: 'calc(100dvw -2rem)',
					maxHeight: 'calc(100dvh -4rem)',
					overflow: 'scroll',
				}}
			>
				<Stack mode="row" alignItems="stretch">
					{options.map((o) => (
						<button
							style={
								selected.includes(o)
									? { color: 'white', backgroundColor: 'black' }
									: undefined
							}
							onClick={() => toggle(o)}
						>
							{o}
						</button>
					))}
					{onConfirm && (
						<button
							onClick={onConfirm}
							disabled={selected.length < min || selected.length > max}
						>
							Confirm
						</button>
					)}
				</Stack>
			</div>
		</div>
	);
};
