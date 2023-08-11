import { useEffect, useState } from 'react';
import { ConversationInfo } from '~/constants/interface';
import { mockConversation } from '~/mock/conversation.mock';

interface ReturnType {
  conversation: ConversationInfo | null;
}

interface UseConversationType {
  conversationId: string;
}

function useConversation({ conversationId }: UseConversationType): ReturnType {
  const [conversation, setConversation] = useState<ConversationInfo | null>(
    null
  );

  // TODO: listen to socket and update conversation
  useEffect(() => {
    mockConversation()
      .getConversation(conversationId)
      .then((res) => {
        setConversation(res.data);
      });
  }, []);

  return { conversation };
}

export default useConversation;
