import { BsBackpack4 } from 'react-icons/bs';
import { FaFistRaised } from 'react-icons/fa';
import { MdCatchingPokemon } from 'react-icons/md';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const MainMenu = ({
	navigate,
}: {
	navigate: (x: string) => void;
}): JSX.Element => {
	return (
		<Page headline="Main Menu:">
			<Stack mode="column">
				<Card
					onClick={() => navigate('BAG')}
					content={<h4>Bag</h4>}
					icon={<BsBackpack4 size={30} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('TEAM')}
					content={<h4>Team</h4>}
					icon={<MdCatchingPokemon size={30} />}
					actionElements={[]}
				/>
				<Card
					onClick={() => navigate('BATTLE')}
					content={<h4>Random Encounter</h4>}
					icon={<FaFistRaised size={30} />}
					actionElements={[]}
				/>
			</Stack>
		</Page>
	);
};
