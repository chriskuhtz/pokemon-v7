import { Page } from '../../uiComponents/Page/Page';

export const BuyMarket = ({ goBack }: { goBack: () => void }): JSX.Element => {
	return (
		<Page
			goBack={goBack}
			headline="What do you want to buy:"
			children={undefined}
		></Page>
	);
};
