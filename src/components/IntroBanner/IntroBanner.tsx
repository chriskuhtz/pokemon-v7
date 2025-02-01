import React from 'react';
import { Banner } from '../../uiComponents/Banner/Banner';

export const IntroBanner = ({
	name,
	sprite,
}: {
	name: string;
	sprite: React.JSX.Element;
}) => {
	return (
		<Banner>
			<React.Fragment>
				Encountered a wild {name} {sprite}
			</React.Fragment>
		</Banner>
	);
};
