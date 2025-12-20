import React, { useContext } from 'react';
import { MoveName } from '../../constants/movesCheckList';
import { getCostForLearnMethod } from '../../functions/getCostForLearnMethod';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Stack } from '../../uiComponents/Stack/Stack';
import { MoveEditorListEntry } from './components/MoveEditorListEntry';
import { useMoveEditor } from './hooks/useMoveEditor';

export const MoveEditor = ({
	ownedPokemon,
}: {
	ownedPokemon: OwnedPokemon;
}) => {
	const {
		onlyLearnable,
		setOnlyLearnable,
		options,
		unlockMove,
		moveToConfirm,
		setMoveToConfirm,
	} = useMoveEditor({ ownedPokemon });
	const { saveFile } = useContext(SaveFileContext);

	return (
		<Stack mode={'column'}>
			<button key={'button'} onClick={() => setOnlyLearnable(!onlyLearnable)}>
				{onlyLearnable ? 'Show all moves' : 'Only show learnable'}
			</button>
			{options.map((m) => {
				const payment = getCostForLearnMethod(
					m.move.name as MoveName,
					m.version_group_details[0].move_learn_method.name
				);
				if (onlyLearnable && !m.learnable) {
					return <React.Fragment key={m.move.name}></React.Fragment>;
				}
				return (
					<MoveEditorListEntry
						m={m}
						payment={payment}
						ownedPokemon={ownedPokemon}
						missingPayment={saveFile.bag[payment] < 1}
						unlockMove={unlockMove}
						moveToConfirm={moveToConfirm}
						setMoveToConfirm={setMoveToConfirm}
					/>
				);
			})}
		</Stack>
	);
};
