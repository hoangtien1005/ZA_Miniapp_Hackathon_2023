import { useEffect, useState } from 'react';
import { MessageData, mockMessage } from '~/mock/message.mock';

interface ReturnType {
  data: MessageData | null;
}

interface UseConversationType {
  conversationId: string;
}

function useMessage({ conversationId }: UseConversationType): ReturnType {
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

export default useMessage;
