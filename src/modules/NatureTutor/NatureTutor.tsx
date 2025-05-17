import { useCallback, useContext, useMemo, useState } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { FlavourfullBerriesTable, ItemType } from '../../interfaces/Item';
import { Nature, natureNames, natures } from '../../interfaces/Natures';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const NatureTutor = () => {
	const { saveFile } = useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const [id, setId] = useState<string>(team[0].id);

	const pokemonWithId = useMemo(
		() => team.find((t) => t.id === id),
		[id, team]
	);

	const navigate = useNavigate();
	return (
		<Page
			headline="Nature Tutor"
			goBack={() => navigate('NATURE_TUTOR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{!id && <strong>Which Pokemon´s Nature should we change?</strong>}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
						padding: '2rem',
						columnGap: '1rem',
					}}
				>
					{team.map((t) => (
						<PokemonSprite
							key={t.id}
							onClick={() => setId(t.id)}
							name={t.name}
							sizeFactor={id === t.id ? 3 : 1}
							config={{ officalArtwork: true, shiny: t.shiny }}
						/>
					))}
				</div>
				{pokemonWithId && <NatureEditor ownedPokemon={pokemonWithId} />}
			</Stack>
		</Page>
	);
};

const NatureEditor = ({ ownedPokemon }: { ownedPokemon: OwnedPokemon }) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const [natureToConfirm, setNatureToConfirm] = useState<Nature | undefined>();

	const changeNature = useCallback(
		(nature: Nature, payment: ItemType) => {
			if (saveFile.bag[payment] < 1) {
				return;
			}
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [payment]: 1 }, true),
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id === ownedPokemon.id) {
						return {
							...ownedPokemon,
							nature,
						};
					}

					return p;
				}),
			});
			addMessage({
				message: `${ownedPokemon.name}´s Nature became ${nature}`,
				needsNoConfirmation: true,
			});
			setNatureToConfirm(undefined);
		},
		[
			addMessage,
			ownedPokemon,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.pokemon,
		]
	);

	const options = useMemo(() => {
		return natureNames.filter((n) => ownedPokemon.nature !== n);
	}, [ownedPokemon.nature]);

	const getCostForLearnMethod = (nature: Nature): ItemType => {
		return Object.entries(FlavourfullBerriesTable).find(([, natures]) =>
			natures.includes(nature)
		)?.[0] as ItemType;
	};

	return (
		<Stack mode={'column'}>
			{options.map((n) => {
				const payment = getCostForLearnMethod(n);
				const mods = natures[n];
				const disabled = saveFile.bag[payment] < 1;

				if (!mods.buff) {
					return <></>;
				}
				return (
					<Card
						key={n}
						onClick={() => setNatureToConfirm(n)}
						actionElements={
							!disabled && natureToConfirm === n
								? [
										<strong onClick={() => changeNature(n, payment)}>
											Confirm
										</strong>,
								  ]
								: []
						}
						icon={<ItemSprite item={payment} />}
						disabled={disabled}
						content={
							<div style={{ display: 'flex', gap: '.5rem' }}>
								<strong>
									{n}: {disabled && ` (1 ${payment} required)`}
								</strong>
								{mods.buff && <strong>+ 10% {mods.buff}</strong>}
								{mods.debuff && <strong>- 10% {mods.debuff}</strong>}
							</div>
						}
					/>
				);
			})}
		</Stack>
	);
};
