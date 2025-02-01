import { IoMdMenu } from 'react-icons/io';

export const Overworld = ({ openMenu }: { openMenu: () => void }) => {
	return (
		<div>
			<IoMdMenu
				style={{ position: 'absolute', top: '1.5rem', left: '1rem' }}
				onClick={openMenu}
				size={30}
			/>
		</div>
	);
};
