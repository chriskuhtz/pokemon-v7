import { Sprite } from '../../components/Sprite/Sprite';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Intro = ({
	setHasReadIntro,
}: {
	setHasReadIntro: (x: boolean) => void;
}) => {
	return (
		<Page headline="">
			<div style={{ padding: '2rem' }}>
				<Stack alignItems="center" mode="column">
					<div>
						<Sprite
							canvasKey={'yaya'}
							rotating={false}
							key={'yaya'}
							id={`136`}
						/>
					</div>
					<h3>Welcome to Pokemon Kuma</h3>
					<ol style={{ lineHeight: '1.5rem' }}>
						<li>
							<strong>
								This Single Player Game runs in your Browser and saves to your
								localstorage.
							</strong>
						</li>
						<li>
							<strong>There are no Accounts, Tracking, Cookies, etc.</strong>
						</li>
						<li>
							<strong>
								For obvious reasons, there is also no form of monetization.
							</strong>
						</li>
						<li>
							<strong>
								The recommended Screen is a sideways smartphone, but all screen
								sizes are supported.
							</strong>
						</li>
						<li>
							<strong>
								Keyboard controls are also supported, but might be janky at
								points.
							</strong>
						</li>
						<li>
							<strong>You can report Bugs and Feedback in the Menu.</strong>
						</li>
						<li>
							<strong>
								If I know you personally, please choose a name i can recognize,
								in case i have questions about your reports.
							</strong>
						</li>
						<li>
							<strong>
								The Game is in active development, but i dont expect breaking
								changes anymore. <br /> so you should never have to reset your
								savefile because of updates.
							</strong>
						</li>
						<li>
							<strong>
								To receive the latest updates, refresh your Page when you come
								back to the game
							</strong>
						</li>
					</ol>

					<button
						onClick={() => {
							setHasReadIntro(true);
							window.localStorage.setItem('hasReadIntro', 'true');
						}}
					>
						Got it, lets go
					</button>
				</Stack>
			</div>
		</Page>
	);
};
