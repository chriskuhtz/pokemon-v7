import { IoMdMenu } from 'react-icons/io';

export const Overworld = ({ openMenu }: { openMenu: () => void }) => {
	return (
		<div>
			<IoMdMenu onClick={openMenu} size={30} />
			Overworld
		</div>
	);
};
