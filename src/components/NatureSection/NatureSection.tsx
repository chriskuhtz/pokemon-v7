import { Nature, natures } from '../../interfaces/Natures';
import { Card } from '../../uiComponents/Card/Card';

export const NatureSection = ({ nature }: { nature: Nature }) => {
	const mods = natures[nature];
	return (
		<Card
			actionElements={[]}
			icon={<h3>+/-</h3>}
			content={
				<>
					<strong
						style={{
							display: 'flex',
							gap: '.5rem',
							alignItems: 'center',
						}}
					>
						<span>{nature} Nature: </span>
						<span>{!mods.buff && <p>Neutral Nature</p>}</span>
						<span>{mods.buff && <p>+ 10% {mods.buff}</p>} </span>
						<span>{mods.debuff && <p>- 10% {mods.debuff}</p>}</span>
					</strong>
				</>
			}
		/>
	);
};
