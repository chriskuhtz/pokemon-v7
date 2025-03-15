import { BsCashCoin } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { battleSpriteSize } from '../../constants/gameData';
import { RoutesType } from '../../interfaces/Routing';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
export const Market = ({
	goBack,
	navigate,
}: {
	goBack: () => void;
	navigate: (x: RoutesType) => void;
}): JSX.Element => {
	return (
		<Page goBack={goBack} headline="Market:">
			<Stack mode="column">
				<Card
					onClick={() => navigate('BUY_MARKET')}
					content={<h4>Buy</h4>}
					icon={<FaCartPlus size={battleSpriteSize} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('SELL_MARKET')}
					content={<h4>Sell</h4>}
					icon={<BsCashCoin size={battleSpriteSize} />}
					actionElements={[]}
				/>
			</Stack>
		</Page>
	);
};
