import React, { ReactNode, useState } from 'react';

export const BaseSizeContext = React.createContext(
	{} as { baseSize: number; setBaseSize: (x: number) => void }
);

export const BaseSizeProvider = ({ children }: { children: ReactNode }) => {
	const [baseSize, setBaseSize] = useState<number>(32);

	return (
		<BaseSizeContext.Provider value={{ baseSize, setBaseSize }}>
			{children}
		</BaseSizeContext.Provider>
	);
};
