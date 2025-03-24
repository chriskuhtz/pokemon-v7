import { CSSProperties } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { nameToIdMap, PokemonName } from '../../constants/pokemonNames';

export const getPokemonSprite = (
	name: PokemonName,
	config?: {
		back?: boolean;
		shiny?: boolean;
		grayscale?: boolean;
		officalArtwork?: boolean;
	}
): string => {
	const id = nameToIdMap[name];

	if (id > 905 || config?.officalArtwork) {
		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
			config?.shiny ? `shiny/` : ''
		}${id}.png`;
	}

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
		config?.back ? `back/` : ''
	}${config?.shiny ? `shiny/` : ''}${id}.gif`;
};

export const PokemonSprite = ({
	name,
	sizeFactor,
	style,

	onClick,
	className,
	config,
}: {
	name: PokemonName;
	sizeFactor?: number;
	style?: CSSProperties;
	config?: {
		back?: boolean;
		shiny?: boolean;
		grayscale?: boolean;
		officalArtwork?: boolean;
	};
	onClick?: () => void;
	className?: string;
}) => {
	return (
		<img
			className={className}
			onClick={onClick}
			onKeyDown={(e) => {
				if (onClick && e.key === 'Enter') {
					onClick();
				}
			}}
			src={getPokemonSprite(name, config)}
			height={battleSpriteSize * (sizeFactor ?? 1)}
			width={battleSpriteSize * (sizeFactor ?? 1)}
			style={
				style
					? style
					: config?.grayscale
					? { filter: 'grayscale(1)' }
					: undefined
			}
		/>
	);
};
