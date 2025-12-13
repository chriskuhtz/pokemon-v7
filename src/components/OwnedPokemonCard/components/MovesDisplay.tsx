import { useCallback, useContext, useMemo } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import {
	MdOutlineRadioButtonChecked,
	MdRadioButtonUnchecked,
} from 'react-icons/md';
import { battleSpriteSize } from '../../../constants/gameData/gameData';
import { MoveName } from '../../../constants/movesCheckList';
import { getCurrentPP } from '../../../functions/getCurrentPP';
import { getMovesArray } from '../../../functions/getMovesArray';
import {
	withActivatedMove,
	withChangedMoves,
	withDeActivatedMove,
} from '../../../functions/withChangedMoves';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import {
	OwnedPokemon,
	OwnedPokemonMove,
} from '../../../interfaces/OwnedPokemon';
import { Card } from '../../../uiComponents/Card/Card';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { MoveInfoButton } from '../../MoveInfoButton/MoveInfoButton';

export const MovesDisplay = ({
	ownedPokemon,
	onlyCurrent,
}: {
	ownedPokemon: OwnedPokemon;
	onlyCurrent?: boolean;
}) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { res: battleMon, invalidate } = useGetBattleTeam([ownedPokemon], {});

	const currentMoves = useMemo(
		() => getMovesArray(ownedPokemon),
		[ownedPokemon]
	);

	const updateMoves = useCallback(
		(id: string, newMoves: OwnedPokemonMove[]) => {
			patchSaveFileReducer({
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id === id) {
						return withChangedMoves(p, newMoves);
					}

					return p;
				}),
			});
		},
		[patchSaveFileReducer, saveFile.pokemon]
	);

	const reorder = (dir: 'UP' | 'DOWN', name: MoveName) => {
		const focused = currentMoves.find((m) => m.name === name);
		const index = currentMoves.findIndex((m) => m.name === name);
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

		updateMoves(ownedPokemon.id, newMoves);
	};

	const activateMove = (name: MoveName) => {
		patchSaveFileReducer({
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id === ownedPokemon.id) {
					return withActivatedMove(ownedPokemon, name);
				}

				return p;
			}),
		});
		invalidate();
	};
	const deActivateMove = (move: OwnedPokemonMove) => {
		patchSaveFileReducer({
			pokemon: saveFile.pokemon.map((p) => {
				if (p.id === ownedPokemon.id) {
					return withDeActivatedMove(ownedPokemon, move);
				}

				return p;
			}),
		});
		invalidate();
	};
	const b = battleMon?.at(0);

	if (!b) {
		return <></>;
	}
	return (
		<Stack mode="column">
			{currentMoves.map((o) => (
				<MoveDisplayListEntry
					key={o.name}
					o={o.name}
					battlePokemon={b}
					reorder={(dir) => reorder(dir, o.name)}
					onlyCurrent={!!onlyCurrent}
					currentMoves={currentMoves.map((c) => c.name)}
					activateMove={() => activateMove(o.name)}
					deActivateMove={() => deActivateMove(o)}
				/>
			))}
			{!onlyCurrent &&
				ownedPokemon.unlockedMoves
					.filter((u) => !currentMoves.some((c) => c.name === u))
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
										!currentMoves.some((c) => c.name === o) &&
										currentMoves.length === 4
									}
									icon={<MdRadioButtonUnchecked />}
									onClick={() => {
										if (!currentMoves.some((c) => c.name === o)) {
											if (currentMoves.length === 4) {
												return;
											} else activateMove(o);
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

const MoveDisplayListEntry = ({
	o,
	onlyCurrent,
	currentMoves,
	reorder,
	activateMove,
	deActivateMove,
	battlePokemon,
}: {
	o: MoveName;
	battlePokemon: BattlePokemon;
	onlyCurrent: boolean;
	currentMoves: MoveName[];
	reorder: (dir: 'UP' | 'DOWN') => void;
	activateMove: () => void;
	deActivateMove: () => void;
}) => {
	const battleMove = getMovesArray(battlePokemon).find((b) => b.name === o);
	if (!battleMove) {
		return <></>;
	}
	const currentPP = getCurrentPP(battlePokemon, battleMove);
	return (
		<div
			key={o}
			style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
		>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
				{onlyCurrent || currentMoves.length === 1
					? []
					: [
							<FaArrowUp
								onClick={(e) => {
									e.stopPropagation();
									reorder('UP');
								}}
							/>,
							<FaArrowDown
								onClick={(e) => {
									e.stopPropagation();
									reorder('DOWN');
								}}
							/>,
					  ]}
			</div>
			<div style={{ flexGrow: 1 }}>
				<Card
					key={o}
					actionElements={[
						<img
							height={battleSpriteSize}
							src={`/typeIcons/${battleMove.data.type.name}.png`}
						/>,
					]}
					disabled={!currentMoves.includes(o) && currentMoves.length === 4}
					icon={<MdOutlineRadioButtonChecked />}
					onClick={() => {
						if (onlyCurrent) {
							return;
						}
						if (currentMoves.includes(o)) {
							if (currentMoves.length === 1) {
								return;
							} else deActivateMove();
						}
						if (!currentMoves.includes(o)) {
							if (currentMoves.length === 4) {
								return;
							} else activateMove();
						}
					}}
					content={
						<div>
							<h4>
								{battleMove.name} (
								{battleMove.data.power ? `${battleMove.data.power} ` : ''}
								{battleMove.data.damage_class.name.slice(0, 4)})
							</h4>

							<div>
								<strong>
									PP: {currentPP}/{battleMove.data.pp}
								</strong>
							</div>
						</div>
					}
				/>
			</div>
			<MoveInfoButton movename={o} />
		</div>
	);
};
