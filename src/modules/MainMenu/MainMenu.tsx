import { BsBackpack4, BsCashCoin } from 'react-icons/bs';
import { FaFistRaised } from 'react-icons/fa';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

import { FaCartPlus } from 'react-icons/fa';
import { RoutesType } from '../../App';
import { baseSize } from '../../constants/gameData';
export const MainMenu = ({
	navigate,
	goBack,
	money,
}: {
	navigate: (x: RoutesType) => void;
	goBack: () => void;
	money: number;
}): JSX.Element => {
	return (
		<Page headline="Main Menu:" goBack={goBack}>
			<Stack mode="column">
				<Card
					content={<h4>Money: {money}$</h4>}
					icon={<BsCashCoin size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('BAG')}
					content={<h4>Bag</h4>}
					icon={<BsBackpack4 size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('TEAM')}
					content={<h4>Team</h4>}
					icon={<MdCatchingPokemon size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('BATTLE')}
					content={<h4>Random Encounter</h4>}
					icon={<FaFistRaised size={baseSize / 2} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('MARKET')}
					content={<h4>Market</h4>}
					icon={<FaCartPlus size={baseSize / 2} />}
					actionElements={[]}
				/>
			</Stack>
		</Page>
	);
};
