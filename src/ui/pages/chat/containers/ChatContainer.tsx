import React, { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useSocketService } from '~/adapters/app-service/socket.service';
import { userProfileState } from '~/adapters/store/atoms/user';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { useConversation } from '~/ui/hooks/use-chat';
import ChatHeader from '~/ui/pages/chat/components/Chat/ChatHeader';
import ChatView from '~/ui/pages/chat/components/Chat/ChatView';
import InputSection from '~/ui/shared/Input/InputSection';
import BookingPin from '../components/BookingPin/BookingPin';

const ChatContainer: FC = () => {
  const { conversationId, bookingId } = useParams();
  const { data, loading, error } = {
    data: [],
    loading: false,
    error: null,
  };

  const { conversation } = useConversation({ conversationId });
  const [currentUser] = useRecoilState(userProfileState);
  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  const [replyInfo, setReplyInfo] = useState(null);

  const socketService = useSocketService();

  useEffect(() => {
    socketService.connect('hi');
    socketService.onMessage('connect', function () {
      console.log('Client has connected to the server!');
    });
  }, []);

  return (
    <div className="flex">
      {/* <SideBar /> */}

      <div className="flex flex-grow flex-col items-stretch mt-[36px]">
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
            {/* <ChatHeader conversation={conversation} /> */}
            <BookingPin
              bookingId={bookingId}
              partnerId={
                conversation.users.filter((id) => id !== currentUser?.uid)[0]
              }
            />
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
