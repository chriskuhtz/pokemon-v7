import { useState, useMemo, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { MoveName } from '../../../constants/checkLists/movesCheckList';
import { baseSize } from '../../../constants/gameData';
import { getMovesArray } from '../../../functions/getMovesArray';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { SelectionListModal } from '../../../uiComponents/SelectionListModal/SelectionListModal';

export const MovesDisplay = ({
	ownedPokemon,
	data,
	setMoves,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	setMoves: (id: string, moves: MoveName[]) => void;
}) => {
	const [editing, setEditing] = useState<boolean>(false);
	const currentMoves = useMemo(
		() => getMovesArray(ownedPokemon).map((m) => m.name),
		[ownedPokemon]
	);

	const [newMoveNames, setNewMoveNames] = useState<MoveName[]>([]);
	useEffect(() => {
		setNewMoveNames(currentMoves);
	}, [currentMoves]);
	const options = useMemo(
		() => [
			...currentMoves,
			...data.moves
				.map((m) => m.move.name)
				.filter((m) => !currentMoves.includes(m as MoveName)),
		],
		[currentMoves, data.moves]
	);

	return (
		<div
			style={{
				margin: '.5rem',
				borderLeft: '1px solid black',
				borderBottom: '1px solid black',
				borderBottomLeftRadius: '.5rem',
			}}
		>
			<SelectionListModal
				close={() => setEditing(false)}
				open={editing}
				selected={newMoveNames}
				options={options}
				toggle={(x) => {
					if (newMoveNames.includes(x as MoveName)) {
						setNewMoveNames((n) => n.filter((m) => m !== x));
					} else setNewMoveNames((n) => [...n, x as MoveName]);
				}}
				onConfirm={() => {
					setMoves(ownedPokemon.id, newMoveNames);
					setEditing(false);
				}}
				min={1}
				max={4}
			/>
			<strong
				style={{
					padding: '1rem .5rem',
					width: '100%',
					display: 'flex',
				}}
			>
				Moves: <MdEdit size={baseSize / 3} onClick={() => setEditing(true)} />
			</strong>
			<div
				style={{
					padding: '1rem .5rem',
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '1rem',
				}}
			>
				{currentMoves.map((m) => (
					<strong key={m}>{m}</strong>
				))}
			</div>
		</div>
	);
};
