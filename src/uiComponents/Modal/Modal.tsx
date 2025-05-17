import { IoMdCloseCircle } from 'react-icons/io';
import { battleSpriteSize } from '../../constants/gameData';

export const Modal = ({
	open,
	close,
	children,
}: {
	open: boolean;
	close: () => void;
	children: React.JSX.Element;
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
				width: 'calc(100dvw - 4rem)',
				height: '100dvh',
				backgroundColor: 'rgba(0,0,0,.8)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9000,
				padding: '2rem',
			}}
		>
			<div
				style={{
					padding: '2rem',
					borderRadius: '1rem',
					border: '2px solid black',
					backgroundColor: 'white',
					maxHeight: '80%',
					overflow: 'scroll',
					color: 'black',
				}}
			>
				<IoMdCloseCircle
					role="button"
					size={battleSpriteSize}
					tabIndex={0}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === 'Enter') {
							close();
						}
					}}
					onClick={close}
				/>
				{children}
			</div>
		</div>
	);
};
