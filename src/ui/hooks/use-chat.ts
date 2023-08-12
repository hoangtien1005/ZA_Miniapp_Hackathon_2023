import { useEffect, useState } from 'react';
import { useChatService } from '~/adapters/app-service/chat.service';
import { ConversationInfo } from '~/constants/interface';
import { MessageData, mockMessage } from '~/mock/message.mock';

interface ConversationReturnType {
  conversation: ConversationInfo | null;
}

interface MessageReturnType {
  data: MessageData | null;
}

interface UseConversationType {
  conversationId?: string;
}

export function useConversation({
  conversationId,
}: UseConversationType): ConversationReturnType {
  const chatService = useChatService();
  const [conversation, setConversation] = useState<ConversationInfo | null>(
    null
  );

  console.log('conversationId', conversationId);

  // TODO: listen to socket and update conversation
  useEffect(() => {
    if (!conversationId) return;
    chatService.getConversation(conversationId).then((data) => {
      setConversation(data);
    });
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;
    chatService.getAllMessages({ conversationId }).then((res) => {});
  }, [conversationId]);

  return { conversation };
}

export function useMessage({
  conversationId,
}: UseConversationType): MessageReturnType {
  const [messages, setMessages] = useState<MessageData | null>(null);

  // TODO: listen to socket and update conversation
  useEffect(() => {
    mockMessage()
      .getMessages(conversationId)
      .then((res) => {
        setMessages(res.data);
      });
  }, []);

  return { data: messages };
}
