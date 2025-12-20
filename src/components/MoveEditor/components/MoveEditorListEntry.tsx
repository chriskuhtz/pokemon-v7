import { MoveName } from '../../../constants/movesCheckList';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { moveIsTeachable } from '../../../functions/moveIsAvailable';
import { LearnableMove } from '../../../hooks/useLearnableMoves';
import { ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Card } from '../../../uiComponents/Card/Card';
import { ItemSprite } from '../../ItemSprite/ItemSprite';
import { MoveInfoButton } from '../../MoveInfoButton/MoveInfoButton';

export const MoveEditorListEntry = ({
	m,
	ownedPokemon,
	moveToConfirm,
	setMoveToConfirm,
	unlockMove,
	missingPayment,
	payment,
}: {
	m: LearnableMove;
	ownedPokemon: OwnedPokemon;
	setMoveToConfirm: (m: MoveName) => void;
	moveToConfirm: MoveName | undefined;
	unlockMove: (m: MoveName, payment: ItemType) => void;
	missingPayment: boolean;
	payment: ItemType;
}): JSX.Element => {
	const available = moveIsTeachable(
		m,
		calculateLevelData(ownedPokemon.xp, ownedPokemon.growthRate).level
	);

	return (
		<div
			key={m.move.name}
			style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
		>
			<div style={{ flexGrow: 1 }}>
				<Card
					key={m.move.name}
					onClick={() => setMoveToConfirm(m.move.name as MoveName)}
					actionElements={
						m.learnable && moveToConfirm === m.move.name
							? [
									<strong
										onClick={() => unlockMove(m.move.name as MoveName, payment)}
									>
										Confirm
									</strong>,
							  ]
							: []
					}
					icon={<ItemSprite item={payment} />}
					disabled={!m.learnable}
					content={
						<>
							<strong>
								{available
									? m.move.name
									: `${m.move.name} available at Lvl ${m.version_group_details[0].level_learned_at}`}
							</strong>
							<strong>{missingPayment && ` : ${payment} required`}</strong>
						</>
					}
				/>{' '}
			</div>
			<MoveInfoButton movename={m.move.name as MoveName} />
		</div>
	);
};
