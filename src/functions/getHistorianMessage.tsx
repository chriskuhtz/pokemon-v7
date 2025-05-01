export const getHistorianMessage = (): string[] => {
	const day = new Date().getDay();
	if (day === 0) {
		return [
			'Legends say that a cute but extremely powerful pokemon',
			'is sometimes seen during the day in the center of orenji forest',
			'by people carrying its favorite berry',
			'i think it was a payapa berry',
			'come back tomorrow for a different tale',
		];
	}
	if (day % 2 === 1) {
		return [
			'Legends say, The Bird of Fire might appear',
			'at night, in a cave nearby',
			'If a Trainer carries its mineral essence with him',
			'come back tomorrow for a different tale',
		];
	}
	return [
		'Legends say, The Bird of Thunder might appear',
		'at dawn, on an island nearby',
		'If a Trainer carries its mineral essence with him',
		'come back tomorrow for a different tale',
	];
};
