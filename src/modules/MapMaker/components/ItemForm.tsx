import { useState } from 'react';
import { ItemType, itemTypes } from '../../../interfaces/Item';
import { Occupant, OverworldItem } from '../../../interfaces/OverworldMap';

export const ItemForm = ({
	addOccupant,
}: {
	addOccupant: (x: Occupant) => void;
}) => {
	const [form, setForm] = useState<OverworldItem>({
		id: 'enter an id',
		type: 'ITEM',
		item: 'poke-ball',
		amount: 1,
		x: 0,
		y: 0,
		conditionFunction: () => true,
	});

	return (
		<div
			id="ItemForm"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				padding: '1rem',
				border: '1px solid white',
				borderRadius: '1rem',
			}}
		>
			<h2>Item Form:</h2>
			<input
				onChange={(e) => setForm({ ...form, id: e.target.value })}
				placeholder="Id"
				value={form?.id}
			/>
			<select
				onChange={(e) => setForm({ ...form, item: e.target.value as ItemType })}
				name="Item"
			>
				{itemTypes.map((i) => (
					<option key={i} value={i}>
						{i}
					</option>
				))}
			</select>
			<input
				onChange={(e) =>
					setForm({ ...form, amount: Number.parseInt(e.target.value) })
				}
				type="number"
				placeholder="Amount"
			/>
			<input
				onChange={(e) =>
					setForm({ ...form, x: Number.parseInt(e.target.value) })
				}
				type="number"
				placeholder="X"
			/>
			<input
				onChange={(e) =>
					setForm({ ...form, y: Number.parseInt(e.target.value) })
				}
				type="number"
				placeholder="Y"
			/>

			<button
				style={{ color: 'white', borderColor: 'white' }}
				onClick={() => addOccupant(form)}
			>
				Add
			</button>
		</div>
	);
};
