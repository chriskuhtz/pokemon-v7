import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import {
	Occupant,
	OCCUPANT_TYPES,
	OccupantType,
	OverworldHiddenItem,
	OverworldItem,
	OverworldMap,
} from '../../../interfaces/OverworldMap';
import { Card } from '../../../uiComponents/Card/Card';
import { ItemForm } from './ItemForm';
import { HiddenItemForm } from './HiddenItemForm';

export const DEFAULT_ITEM: OverworldItem = {
	id: 'enter an id',
	type: 'ITEM',
	item: 'poke-ball',
	amount: 1,
	x: 0,
	y: 0,
	conditionFunction: () => true,
};
export const DEFAULT_HIDDEN_ITEM: OverworldHiddenItem = {
	id: 'enter an id',
	type: 'HIDDEN_ITEM',
	item: 'poke-ball',
	amount: 1,
	x: 0,
	y: 0,
	conditionFunction: () => true,
};
export const OccupantsTab = ({
	newMap,
	removeOccupant,
	addOccupant,
}: {
	newMap: OverworldMap;
	removeOccupant: (id: string) => void;
	addOccupant: (x: Occupant) => void;
}) => {
	const [occupantType, setOccupantType] = useState<OccupantType>('ITEM');
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
			<div style={{ border: '1px solid white', borderRadius: '1rem' }}>
				<div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
					{OCCUPANT_TYPES.map((t) => (
						<button
							key={t}
							style={{ color: t === occupantType ? 'wheat' : 'lightgray' }}
							onClick={() => setOccupantType(t as OccupantType)}
						>
							{t}
						</button>
					))}
				</div>
				{occupantType === 'ITEM' && (
					<ItemForm initial={DEFAULT_ITEM} submit={addOccupant} />
				)}
				{occupantType === 'HIDDEN_ITEM' && (
					<HiddenItemForm initial={DEFAULT_HIDDEN_ITEM} submit={addOccupant} />
				)}
			</div>
		</div>
	);
};
