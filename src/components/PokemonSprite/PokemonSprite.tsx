import { CSSProperties } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { PokemonName } from '../../constants/pokemonNames';
import { internalDex } from '../../constants/internalDexData';

export const getPokemonSprite = (
	name: PokemonName,
	config?: {
		back?: boolean;
		shiny?: boolean;
		grayscale?: boolean;
		officalArtwork?: boolean;
		spriteGeneration?: 1;
	}
): string => {
	const id = internalDex[name].dexId;

	if (config?.spriteGeneration === 1) {
		if (config.back) {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/back/${id}.png`;
		}
		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${id}.png`;
	}

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
		spriteGeneration?: 1;
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
