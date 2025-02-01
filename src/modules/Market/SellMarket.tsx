import { Page } from '../../uiComponents/Page/Page';

export const SellMarket = ({ goBack }: { goBack: () => void }): JSX.Element => {
	return (
		<Page
			goBack={goBack}
			headline="What do you want to sell:"
			children={undefined}
		></Page>
	);
};
