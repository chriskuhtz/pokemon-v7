import { useCallback, useEffect, useMemo, useState } from 'react';
import { animationTimer } from '../constants/gameData';
import { BattleMessage } from '../modules/Battle/BattleField';

export const useMessageQueue = (speed?: number) => {
	const [messages, setMessages] = useState<BattleMessage[]>([]);
	const addMessage = useCallback((message: BattleMessage) => {
		setMessages((messages) => [...messages, message]);
	}, []);
	const addMultipleMessages = useCallback((newMessages: BattleMessage[]) => {
		setMessages((messages) => [...messages, ...newMessages]);
	}, []);
	const interjectMessage = useCallback((message: BattleMessage) => {
		setMessages((messages) => [message, ...messages]);
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
		}, speed ?? animationTimer);

		return () => clearTimeout(t);
	}, [messages, speed]);

	const latestMessage = useMemo(
		() => (messages.length > 0 ? messages[0] : undefined),
		[messages]
	);

	return { latestMessage, addMessage, addMultipleMessages, interjectMessage };
};
