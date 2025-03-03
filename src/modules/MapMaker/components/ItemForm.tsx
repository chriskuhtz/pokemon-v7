import { useState } from 'react';
import { ItemType, itemTypes } from '../../../interfaces/Item';
import { OverworldItem } from '../../../interfaces/OverworldMap';

export const ItemForm = ({
	initial,
	submit,
}: {
	submit: (x: OverworldItem) => void;
	initial: OverworldItem;
}) => {
	const [form, setForm] = useState<OverworldItem>(initial);

	return (
		<div
			id="ItemForm"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				padding: '1rem',
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
				onClick={() => submit(form)}
			>
				Add
			</button>
		</div>
	);
};
