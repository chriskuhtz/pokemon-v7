import { Sprite } from '../../components/Sprite/Sprite';
import { getRandomIndex } from '../../functions/filterTargets';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Banner } from '../Banner/Banner';

export const LoadingScreen = () => {
	return (
		<Banner>
			<h3>
				<Sprite
					id={
						Object.values(SpriteEnum)[
							getRandomIndex(Object.values(SpriteEnum).length)
						]
					}
					onClick={() => {}}
					rotating
				/>
				LOADING
				<Sprite
					id={
						Object.values(SpriteEnum)[
							getRandomIndex(Object.values(SpriteEnum).length)
						]
					}
					onClick={() => {}}
					rotating
				/>
			</h3>
		</Banner>
	);
};
