import { useCallback, useEffect, useMemo, useState } from 'react';
import { animationTimer } from '../../../constants/gameData';
import { BattleMessage } from '../BattleField';

export const useBattleMessages = () => {
	const [messages, setMessages] = useState<BattleMessage[]>([]);
	const addMessage = useCallback((message: BattleMessage) => {
		setMessages((messages) => [...messages, message]);
	}, []);
	const addMultipleMessages = useCallback((newMessages: BattleMessage[]) => {
		setMessages((messages) => [...messages, ...newMessages]);
	}, []);
	useEffect(() => {
		if (messages.length === 0) {
			return;
		}
		const t = setTimeout(() => {
			if (messages[0].onRemoval) {
				messages[0].onRemoval();
			}
			if (messages[0].clearStackOnRemoval) {
				setMessages([]);
				return;
			}

			setMessages(messages.slice(1));
		}, animationTimer);

		return () => clearTimeout(t);
	}, [messages]);
	const latestMessage = useMemo(
		() => (messages.length > 0 ? messages[0] : undefined),
		[messages]
	);

	return { latestMessage, addMessage, addMultipleMessages };
};
