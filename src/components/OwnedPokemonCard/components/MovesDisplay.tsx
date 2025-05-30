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
import { MoveInfoButton } from '../../MoveInfoButton/MoveInfoButton';

export const MovesDisplay = ({
	ownedPokemon,
	setMoves,
	onlyCurrent,
}: {
	ownedPokemon: OwnedPokemon;
	setMoves: (id: string, moves: MoveName[]) => void;
	onlyCurrent?: boolean;
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
				<div
					key={o}
					style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
				>
					<div style={{ flexGrow: 1 }}>
						<Card
							key={o}
							actionElements={
								onlyCurrent
									? []
									: [
											<FaArrowUp
												onClick={(e) => {
													e.stopPropagation();
													reorder('UP', o);
												}}
											/>,
											<FaArrowDown
												onClick={(e) => {
													e.stopPropagation();
													reorder('DOWN', o);
												}}
											/>,
									  ]
							}
							disabled={!currentMoves.includes(o) && currentMoves.length === 4}
							icon={<MdOutlineRadioButtonChecked />}
							onClick={() => {
								if (onlyCurrent) {
									return;
								}
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
					</div>
					<MoveInfoButton movename={o} />
				</div>
			))}
			{!onlyCurrent &&
				ownedPokemon.unlockedMoves
					.filter((u) => !currentMoves.includes(u))
					.map((o) => (
						<div
							key={o}
							style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
						>
							<div style={{ flexGrow: 1 }}>
								<Card
									key={o}
									actionElements={[]}
									disabled={
										!currentMoves.includes(o) && currentMoves.length === 4
									}
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
							</div>
							<MoveInfoButton movename={o} />
						</div>
					))}
		</Stack>
	);
};
