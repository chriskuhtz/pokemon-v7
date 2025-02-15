import { useState } from 'react';
import { MdHealing } from 'react-icons/md';
import { baseSize } from '../../../constants/gameData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { HealingItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const HealAction = ({
	item,
	healablePokemon,
	healPokemon,
}: {
	item: HealingItemType;
	healablePokemon: OwnedPokemon[];
	healPokemon: (pokemon: OwnedPokemon, item: HealingItemType) => void;
}) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			{open && healablePokemon.length > 0 && (
				<Banner>
					<h3>Which Pokemon should receive the {item}:</h3>
					{healablePokemon.map((p) => (
						<img
							key={p.id}
							src={getPokemonSprite(p.dexId)}
							onClick={() => {
								healPokemon(p, item);
							}}
							tabIndex={0}
							role="button"
							onKeyDown={(e) => {
								e.stopPropagation();
								if (e.key === 'Enter') {
									healPokemon(p, item);
								}
							}}
						/>
					))}
				</Banner>
			)}
			<MdHealing
				tabIndex={0}
				role="button"
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'Enter') {
						setOpen(true);
					}
				}}
				onClick={() => setOpen(true)}
				size={baseSize / 2}
			/>
		</>
	);
};
