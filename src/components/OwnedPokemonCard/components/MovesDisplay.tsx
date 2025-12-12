import { useMemo } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import {
	MdOutlineRadioButtonChecked,
	MdRadioButtonUnchecked,
} from 'react-icons/md';
import { battleSpriteSize } from '../../../constants/gameData/gameData';
import { MoveName } from '../../../constants/movesCheckList';
import { getCurrentPP } from '../../../functions/getCurrentPP';
import { getMovesArray } from '../../../functions/getMovesArray';
import { useGetBattleTeam } from '../../../hooks/useGetBattleTeam';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
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
	const { res: battleMon } = useGetBattleTeam([ownedPokemon], {});

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
	const b = battleMon?.at(0);

	if (!b) {
		return <></>;
	}
	return (
		<Stack mode="column">
			{currentMoves.map((o) => (
				<MoveDisplayListEntry
					o={o}
					battlePokemon={b}
					reorder={reorder}
					onlyCurrent={!!onlyCurrent}
					currentMoves={currentMoves}
					setMoves={setMoves}
				/>
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

export const MoveDisplayListEntry = ({
	o,
	onlyCurrent,
	currentMoves,
	reorder,
	setMoves,
	battlePokemon,
}: {
	o: MoveName;
	battlePokemon: BattlePokemon;
	onlyCurrent: boolean;
	currentMoves: MoveName[];
	reorder: (dir: 'UP' | 'DOWN', name: MoveName) => void;
	setMoves: (id: string, moves: MoveName[]) => void;
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
									reorder('UP', o);
								}}
							/>,
							<FaArrowDown
								onClick={(e) => {
									e.stopPropagation();
									reorder('DOWN', o);
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
							} else
								setMoves(
									battlePokemon.id,
									currentMoves.filter((c) => c !== o)
								);
						}
						if (!currentMoves.includes(o)) {
							if (currentMoves.length === 4) {
								return;
							} else setMoves(battlePokemon.id, [...currentMoves, o]);
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
