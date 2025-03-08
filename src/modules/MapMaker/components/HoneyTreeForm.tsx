import { useState } from 'react';
import { OverworldHoneyTree } from '../../../interfaces/OverworldMap';

export const HoneyTreeForm = ({
	initial,
	submit,
}: {
	submit: (x: OverworldHoneyTree) => void;
	initial: OverworldHoneyTree;
}) => {
	const [form, setForm] = useState<OverworldHoneyTree>(initial);

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
			<h2>Honey Tree Form:</h2>
			<input
				onChange={(e) => setForm({ ...form, id: e.target.value })}
				placeholder="Id"
				value={form?.id}
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
