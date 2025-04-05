import { useMemo } from 'react';
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

	const options = useMemo(
		() => [
			...currentMoves,
			...ownedPokemon.unlockedMoves.filter((u) => !currentMoves.includes(u)),
		],
		[currentMoves, ownedPokemon.unlockedMoves]
	);

	return (
		<Stack mode="column">
			{options.map((o) => (
				<Card
					key={o}
					actionElements={[]}
					disabled={!currentMoves.includes(o) && currentMoves.length === 4}
					icon={
						currentMoves.includes(o) ? (
							<MdOutlineRadioButtonChecked />
						) : (
							<MdRadioButtonUnchecked />
						)
					}
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
