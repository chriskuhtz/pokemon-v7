import { useEffect, useMemo, useState } from 'react';
import { Sprite } from '../../components/Sprite/Sprite';
import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Page } from '../../uiComponents/Page/Page';

export const Login = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [pw, setPW] = useState<string | undefined>(
		window.localStorage.getItem('pw') ?? undefined
	);
	//@ts-expect-error fu ts
	const correctPW = useMemo(() => pw === import.meta.env.VITE_PASSWORD, [pw]);
	useEffect(() => {
		if (correctPW && pw && window.localStorage.getItem('pw') !== pw) {
			window.localStorage.setItem('pw', pw);
		}
	}, [correctPW, pw]);

	if (!correctPW) {
		return (
			<Page headline="">
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<div>
						<Sprite
							canvasKey={'yaya'}
							rotating={false}
							key={'yaya'}
							id={SpriteEnum.baldy}
						/>
					</div>
					<h3>Password:</h3>
					<input
						onChange={(e) => setPW(e.target.value.toLowerCase())}
						value={pw}
					/>
				</div>
			</Page>
		);
	}

	return children;
};
