import { App } from '../../App';
import { animationTimer } from '../../constants/gameData';
import { useToasts } from '../../hooks/useToasts';
import { Toast } from './Toast';

export const ToastContainer = () => {
	const { latestToast, addToast } = useToasts(animationTimer * 2);
	return (
		<>
			{latestToast && <Toast toast={latestToast} />}
			<App activeToast={!!latestToast} addToast={addToast} />
		</>
	);
};
