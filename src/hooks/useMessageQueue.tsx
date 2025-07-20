import React, {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { animationTimer } from '../constants/gameData/gameData';

export interface Message {
	message: string;
	onRemoval?: () => void;
	clearStackOnRemoval?: boolean;
	needsNoConfirmation?: boolean;
	icon?: ReactNode;
}

export interface UseMessageQueue {
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	confirmLatestMessage: () => void;
}
export const useMessageQueue = (speed?: number): UseMessageQueue => {
	const [messages, setMessages] = useState<Message[]>([]);
	const addMessage = useCallback((message: Message) => {
		setMessages((messages) => [...messages, message]);
	}, []);
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
		if (!messages[0].needsNoConfirmation) {
			return;
		}
		const t = setTimeout(() => {
			confirmLatestMessage();
		}, speed ?? animationTimer);

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

export const MessageQueueContext = React.createContext({} as UseMessageQueue);

export const MessageQueueProvider = ({ children }: { children: ReactNode }) => {
	const value = useMessageQueue();

	return (
		<MessageQueueContext.Provider value={value}>
			{children}
		</MessageQueueContext.Provider>
	);
};
