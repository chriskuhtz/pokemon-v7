import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { Stack } from '../../uiComponents/Stack/Stack';
import { BstSection } from '../BstSection/BstSection';
import { NatureSection } from '../NatureSection/NatureSection';
import { EVsSection } from './components/EvSection';
import { IVsSection } from './components/IvSection';

export const StatDisplay = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}) => {
	return (
		<div style={{ maxWidth: '100dvw' }}>
			<Stack mode="column">
				<NatureSection nature={ownedPokemon.nature} />
				<BstSection data={data} ownedPokemon={ownedPokemon} />
				<EVsSection
					type={data.types[0].type.name}
					effortValues={ownedPokemon.effortValues}
				/>
				<IVsSection
					name={ownedPokemon.name}
					type={data.types[0].type.name}
					intrinsicValues={ownedPokemon.intrinsicValues}
				/>
			</Stack>
		</div>
	);
};
