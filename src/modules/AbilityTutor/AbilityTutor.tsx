import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AbilityInfoButton } from '../../components/AbilityInfoButton/AbilityInfoButton';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import {
	AbilityName,
	abilityNames,
} from '../../constants/checkLists/completed/abilityCheckList';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { internalDex } from '../../constants/internalDex';

export const AbilityTutor = () => {
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
			headline="Ability Tutor"
			goBack={() => navigate('ABILITY_TUTOR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{!id && <strong>Which Pokemon's Ability should we change?</strong>}
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
				{pokemonWithId && <AbilityEditor ownedPokemon={pokemonWithId} />}
			</Stack>
		</Page>
	);
};

const AbilityEditor = ({ ownedPokemon }: { ownedPokemon: OwnedPokemon }) => {
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
	const { addMessage } = useContext(MessageQueueContext);

	const [abilityToConfirm, setAbilityToConfirm] = useState<
		AbilityName | undefined
	>();

	const changeAbility = useCallback(
		(ability: AbilityName, payment: ItemType) => {
			if (saveFile.bag[payment] < 1) {
				return;
			}
			patchSaveFileReducer({
				bag: joinInventories(saveFile.bag, { [payment]: 1 }, true),
				pokemon: saveFile.pokemon.map((p) => {
					if (p.id === ownedPokemon.id) {
						return {
							...ownedPokemon,
							ability,
						};
					}

					return p;
				}),
			});
			addMessage({
				message: `${ownedPokemon.name}´s ability became ${ability}`,
				needsNoConfirmation: true,
			});
			setAbilityToConfirm(undefined);
		},
		[
			addMessage,
			ownedPokemon,
			patchSaveFileReducer,
			saveFile.bag,
			saveFile.pokemon,
		]
	);
	const { res: data, invalidate } = useGetPokemonData(
		internalDex[ownedPokemon.name].dexId
	);

	useEffect(() => {
		if (data?.name && ownedPokemon.name !== data.name) {
			invalidate();
		}
	}, [data, invalidate, ownedPokemon]);

	const options: AbilityName[] = useMemo(() => {
		if (!data) {
			return [];
		}
		return data.abilities
			.filter(
				(a) =>
					ownedPokemon.ability !== a.ability.name &&
					([...new Set(abilityNames)] as string[]).includes(a.ability.name)
			)
			.map((a) => a.ability.name as AbilityName);
	}, [data, ownedPokemon.ability]);

	const getCost = (ability: AbilityName): ItemType => {
		const options: ItemType[] = [
			'big-malasada',
			'moomoo-cheese',
			'casteliacone',
			'pewter-crunchies',
			'lumiose-galette',
			'rage-candy-bar',
			'lava-cookie',
			'old-gateau',
			'berry-juice',
		];
		return options[(ability.length * 5) % options.length];
	};

	return (
		<Stack mode={'column'}>
			<Card
				icon={<></>}
				actionElements={[
					<AbilityInfoButton abilityName={ownedPokemon.ability} />,
				]}
				content={
					<h4 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						Current Ability: {ownedPokemon.ability}{' '}
					</h4>
				}
			/>
			{options.map((a) => {
				const payment = getCost(a);

				const disabled = saveFile.bag[payment] < 1;

				return (
					<Card
						key={a}
						onClick={() => setAbilityToConfirm(a)}
						actionElements={
							!disabled && abilityToConfirm === a
								? [
										<strong onClick={() => changeAbility(a, payment)}>
											Confirm
										</strong>,
								  ]
								: [<AbilityInfoButton abilityName={a} />]
						}
						icon={<ItemSprite item={payment} />}
						disabled={disabled}
						content={
							<div style={{ display: 'flex', gap: '.5rem' }}>
								<strong>
									{a}: {disabled && ` (1 ${payment} required)`}
								</strong>
							</div>
						}
					/>
				);
			})}
		</Stack>
	);
};
