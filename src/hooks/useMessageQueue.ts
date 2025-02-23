import { useCallback, useEffect, useMemo, useState } from 'react';
import { animationTimer } from '../constants/gameData';

export interface Message {
	message: string;
	onRemoval?: () => void;
	clearStackOnRemoval?: boolean;
	needsConfirmation?: boolean;
}
export const useMessageQueue = (
	speed?: number
): {
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	confirmLatestMessage: () => void;
} => {
	const [messages, setMessages] = useState<Message[]>([]);
	const addMessage = useCallback(
		(message: Message) => {
			setMessages([...messages, message]);
		},
		[messages]
	);
	const addMultipleMessages = useCallback((newMessages: Message[]) => {
		setMessages((messages) => [...messages, ...newMessages]);
	}, []);

	const confirmLatestMessage = useCallback(() => {
		if (messages[0].onRemoval) {
			messages[0].onRemoval();
		}
		if (messages[0].clearStackOnRemoval) {
			setMessages([]);
			return;
		}
		setMessages(messages.slice(1));
	}, [messages]);

	useEffect(() => {
		if (messages.length === 0) {
			return;
		}
		if (messages[0].needsConfirmation) {
			return;
		}
		const t = setTimeout(() => {
			confirmLatestMessage();
		}, speed ?? animationTimer * 2);

		return () => clearTimeout(t);
	}, [confirmLatestMessage, messages, speed]);

	const latestMessage = useMemo(
		() => (messages.length > 0 ? messages[0] : undefined),
		[messages]
	);

	return {
		latestMessage,
		addMessage,
		addMultipleMessages,
		confirmLatestMessage,
	};
};
