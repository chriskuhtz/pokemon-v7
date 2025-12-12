import React, { ReactNode, useCallback, useState } from 'react';

export const BaseSizeContext = React.createContext(
	{} as {
		baseSize: number;
		setBaseSize: (x: number) => void;
		increaseBaseSize: () => void;
		decreaseBaseSize: () => void;
		availableBaseSizes: number[];
	}
);

export const BaseSizeProvider = ({
	children,
	allowedBaseSizes,
}: {
	children: ReactNode;
	allowedBaseSizes: number[];
}) => {
	const devmode = !!window.localStorage.getItem('devmode');
	const [baseSize, setBaseSize] = useState<number>(
		allowedBaseSizes.at(0) ?? 32
	);

	const increaseBaseSize = useCallback(() => {
		if (allowedBaseSizes.includes(baseSize * 2) || devmode)
			setBaseSize(baseSize * 2);
	}, [allowedBaseSizes, baseSize, devmode]);
	const decreaseBaseSize = useCallback(() => {
		if (allowedBaseSizes.includes(baseSize / 2) || devmode)
			setBaseSize(baseSize / 2);
	}, [allowedBaseSizes, baseSize, devmode]);

	return (
		<BaseSizeContext.Provider
			value={{
				baseSize,
				setBaseSize,
				increaseBaseSize,
				decreaseBaseSize,
				availableBaseSizes: devmode
					? [4, 8, 16, 32, 64, 128, 256]
					: allowedBaseSizes,
			}}
		>
			{children}
		</BaseSizeContext.Provider>
	);
};
