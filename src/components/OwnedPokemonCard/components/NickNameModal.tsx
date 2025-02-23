import { Modal } from '../../../uiComponents/Modal/Modal';

export const NickNameModal = ({
	open,
	close,
	nickname,
	setNickName,
}: {
	open: boolean;
	close: () => void;
	nickname: string | undefined;
	setNickName: (x: string | undefined) => void;
}) => {
	return (
		<Modal open={open} close={close}>
			<div>
				<h4>Your Pokemons Nickname:</h4>
				<input
					placeholder={'nickname'}
					value={nickname}
					onChange={(e) => setNickName(e.target.value)}
				/>
			</div>
		</Modal>
	);
};
