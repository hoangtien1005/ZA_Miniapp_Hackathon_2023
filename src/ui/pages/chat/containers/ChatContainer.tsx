import React, { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useChatService } from '~/adapters/app-service/chat.service';
import { useSocketService } from '~/adapters/app-service/socket.service';
import { userProfileState } from '~/adapters/store/atoms/user';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { useConversation } from '~/ui/hooks/use-chat';
import ChatHeader from '~/ui/shared/Chat/ChatHeader';
import ChatView from '~/ui/shared/Chat/ChatView';
import InputSection from '~/ui/shared/Input/InputSection';

const ChatContainer: FC = () => {
  const { conversationId } = useParams();
  const { data, loading, error } = {
    data: [],
    loading: false,
    error: null,
  };

  const { conversation } = useConversation({ conversationId });
  const [currentUser] = useRecoilState(userProfileState);

  const socketService = useSocketService();

  useEffect(() => {
    socketService.connect('hi');
    socketService.onMessage('connect', function () {
      console.log('Client has connected to the server!');
    });
  }, []);

  const [inputSectionOffset, setInputSectionOffset] = useState(0);

  const [replyInfo, setReplyInfo] = useState(null);

  return (
    <div className="flex">
      {/* <SideBar /> */}

      <div className="flex h-screen flex-grow flex-col items-stretch">
        {loading ? (
          <>
            <div className="border-dark-lighten h-20 border-b"></div>
            <div className="flex-grow"></div>
            <InputSection disabled />
          </>
        ) : error ||
          !conversation?.users?.includes(currentUser?.uid as string) ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <img className="h-32 w-32 object-cover" src="/error.svg" alt="" />
            <p className="text-center text-lg">Conversation does not exists</p>
          </div>
        ) : (
          <>
            <ChatHeader conversation={conversation} />
            <ChatView
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              inputSectionOffset={inputSectionOffset}
              conversation={conversation}
            />
            <InputSection
              setInputSectionOffset={setInputSectionOffset}
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              disabled={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default withLayoutWrapper(ChatContainer);
