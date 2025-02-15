import { App } from '../../App';
import { useToasts } from '../../hooks/useToasts';
import { Toast } from './Toast';

export const ToastContainer = () => {
	const { latestToast, addToast } = useToasts();
	return (
		<>
			{latestToast && <Toast toast={latestToast} />}
			<App activeToast={!!latestToast} addToast={addToast} />
		</>
	);
};
