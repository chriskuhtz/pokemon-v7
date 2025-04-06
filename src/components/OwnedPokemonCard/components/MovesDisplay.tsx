import { useMemo } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import {
	MdOutlineRadioButtonChecked,
	MdRadioButtonUnchecked,
} from 'react-icons/md';
import { MoveName } from '../../../constants/checkLists/movesCheckList';
import { getMovesArray } from '../../../functions/getMovesArray';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Card } from '../../../uiComponents/Card/Card';
import { Stack } from '../../../uiComponents/Stack/Stack';

export const MovesDisplay = ({
	ownedPokemon,
	setMoves,
}: {
	ownedPokemon: OwnedPokemon;
	setMoves: (id: string, moves: MoveName[]) => void;
}) => {
	const currentMoves = useMemo(
		() => getMovesArray(ownedPokemon).map((m) => m.name),
		[ownedPokemon]
	);

	const reorder = (dir: 'UP' | 'DOWN', name: MoveName) => {
		const focused = currentMoves.find((m) => m === name);
		const index = currentMoves.findIndex((m) => m === name);
		if (!focused) {
			return;
		}

		if (index === 0 && dir == 'UP') {
			return;
		}
		if (index === currentMoves.length - 1 && dir == 'DOWN') {
			return;
		}
		const displaced =
			dir === 'UP' ? currentMoves[index - 1] : currentMoves[index + 1];

		const newMoves = currentMoves.map((p) => {
			if (p === displaced) {
				return focused;
			}
			if (p === focused) {
				return displaced;
			}
			return p;
		});

		setMoves(ownedPokemon.id, newMoves);
	};
	return (
		<Stack mode="column">
			{currentMoves.map((o) => (
				<Card
					key={o}
					actionElements={[
						<FaArrowUp onClick={() => reorder('UP', o)} />,
						<FaArrowDown onClick={() => reorder('DOWN', o)} />,
					]}
					disabled={!currentMoves.includes(o) && currentMoves.length === 4}
					icon={<MdOutlineRadioButtonChecked />}
					onClick={() => {
						if (currentMoves.includes(o)) {
							if (currentMoves.length === 1) {
								return;
							} else
								setMoves(
									ownedPokemon.id,
									currentMoves.filter((c) => c !== o)
								);
						}
						if (!currentMoves.includes(o)) {
							if (currentMoves.length === 4) {
								return;
							} else setMoves(ownedPokemon.id, [...currentMoves, o]);
						}
					}}
					content={<strong>{o}</strong>}
				/>
			))}
			{ownedPokemon.unlockedMoves
				.filter((u) => !currentMoves.includes(u))
				.map((o) => (
					<Card
						key={o}
						actionElements={[]}
						disabled={!currentMoves.includes(o) && currentMoves.length === 4}
						icon={<MdRadioButtonUnchecked />}
						onClick={() => {
							if (currentMoves.includes(o)) {
								if (currentMoves.length === 1) {
									return;
								} else
									setMoves(
										ownedPokemon.id,
										currentMoves.filter((c) => c !== o)
									);
							}
							if (!currentMoves.includes(o)) {
								if (currentMoves.length === 4) {
									return;
								} else setMoves(ownedPokemon.id, [...currentMoves, o]);
							}
						}}
						content={<strong>{o}</strong>}
					/>
				))}
		</Stack>
	);
};
