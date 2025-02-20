import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Settings = ({
	proceed,
}: {
	proceed: (randomStarters: boolean) => void;
}): JSX.Element => {
	return (
		<Page headline="Settings:">
			<Stack mode="column" alignItems="center">
				<h3 style={{ margin: 0 }}>
					Do you want to randomize your starter pokemon choices:
				</h3>
				<Stack mode="row" justifyContent="stretch">
					<button onClick={() => proceed(false)}> No</button>
					<button onClick={() => proceed(true)}>Yes</button>
				</Stack>
			</Stack>
		</Page>
	);
};
