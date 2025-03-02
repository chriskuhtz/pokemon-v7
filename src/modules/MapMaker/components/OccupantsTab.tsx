import { FaTrash } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { Occupant, OverworldMap } from '../../../interfaces/OverworldMap';
import { Card } from '../../../uiComponents/Card/Card';
import { ItemForm } from './ItemForm';

export const OccupantsTab = ({
	newMap,
	removeOccupant,
	addOccupant,
}: {
	newMap: OverworldMap;
	removeOccupant: (id: string) => void;
	addOccupant: (x: Occupant) => void;
}) => {
	return (
		<div
			style={{
				height: '80dvh',
				padding: '2rem',
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			{newMap.occupants.map((o) => {
				return (
					<Card
						key={o.id}
						icon={<IoPersonSharp />}
						content={
							<strong>
								{o.id}|{o.x}/{o.y}
							</strong>
						}
						actionElements={[<FaTrash onClick={() => removeOccupant(o.id)} />]}
					/>
				);
			})}
			<ItemForm addOccupant={addOccupant} />
		</div>
	);
};
