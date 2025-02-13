import { App } from '../../App';
import { useToasts } from '../../hooks/useToasts';
import { Toast } from './Toast';

export const ToastContainer = () => {
	const { latestToast, addToast } = useToasts();
	return (
		<>
			{latestToast && <Toast message={latestToast} />}
			<App latestToast={latestToast} addToast={addToast} />
		</>
	);
};
