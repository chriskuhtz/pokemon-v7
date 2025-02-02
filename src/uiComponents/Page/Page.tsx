import { ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import './Page.css';

export const Page = ({
	goBack,
	headline,
	children,
}: {
	goBack?: () => void;
	headline: string;
	children: ReactNode;
}) => {
	return (
		<div className="page">
			<h2 className="headline">
				{goBack ? (
					<IoIosArrowBack role="button" tabIndex={0} onClick={goBack} />
				) : (
					<div className="placeholder"></div>
				)}{' '}
				{headline}
			</h2>
			{children}
		</div>
	);
};
