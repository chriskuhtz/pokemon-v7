import { useCallback, useEffect, useMemo, useState } from 'react';
import { animationTimer } from '../constants/gameData';

export interface Message {
	message: string;
	onRemoval?: () => void;
	clearStackOnRemoval?: boolean;
}
export const useMessageQueue = (
	speed?: number
): {
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	interjectMessage: (message: Message) => void;
} => {
	const [messages, setMessages] = useState<Message[]>([]);
	const addMessage = useCallback((message: Message) => {
		setMessages((messages) => [...messages, message]);
	}, []);
	const addMultipleMessages = useCallback((newMessages: Message[]) => {
		setMessages((messages) => [...messages, ...newMessages]);
	}, []);
	const interjectMessage = useCallback((message: Message) => {
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
