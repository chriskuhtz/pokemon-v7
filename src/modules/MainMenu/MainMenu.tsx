import { BsBackpack4, BsCashCoin } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

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
			</Stack>
		</Page>
	);
};
