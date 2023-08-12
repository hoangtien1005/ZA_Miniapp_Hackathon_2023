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
import BookingPin from '../components/Chat/BookingPin';
import { WarningExclamationImg } from '~/ui/assets/images';
import Loading from '~/ui/shared/Loading';
import { isNumber } from '~/utils/validate.util';

const validateConversationId = (conversationId: string) => {
  if (!conversationId) {
    return false;
  }

  if (isNumber(+conversationId) && Number(conversationId) < 0) {
    return false;
  }
  return true;
};

const ChatContainer: FC = () => {
  const { conversationId, bookingId } = useParams();
  const { data, loading, error } = {
    data: [],
    loading: false,
    error: null,
  };

  const { conversation } = useConversation({
    conversationId: validateConversationId(conversationId)
      ? conversationId
      : null,
  });

  const [currentUser] = useRecoilState(userProfileState);
  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  const [replyInfo, setReplyInfo] = useState(null);

  const socketService = useSocketService();

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socketService.connect('hi');
    socketService.onMessage('connect', function () {
      console.log('Client has connected to the server!');
      setSocketConnected(true);
    });
  }, []);

  if (!socketConnected) {
    return <Loading />;
  }

  return (
    <div className="flex">
      {/* <SideBar /> */}

      <div className="flex flex-grow flex-col items-stretch mt-[36px] overflow-y-hidden">
        {loading ? (
          <>
            <div className="border-dark-lighten h-20 border-b"></div>
            <div className="flex-grow"></div>
            <InputSection disabled />
          </>
        ) : error ? (
          <>
            <div className="flex h-full w-full flex-col items-center justify-center gap-6">
              <div className="absolute bottom-[150px] flex flex-col justify-center items-center">
                <img
                  src={WarningExclamationImg}
                  width="50px"
                  className="mb-4"
                />
                <p className="text-center text-lg text-sub">Có lỗi xảy ra,</p>
                <p className="text-center text-lg text-sub">
                  vui lòng thử lại sau
                </p>
              </div>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                filter: 'grayscale(1)',
              }}
            >
              <InputSection
                setInputSectionOffset={setInputSectionOffset}
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                disabled
              />
            </div>
          </>
        ) : !conversation?.users?.includes(currentUser?.uid as string) ? (
          <>
            {console.log('here')}
            <BookingPin
              bookingId={bookingId}
              partnerId={
                conversation?.users?.filter(
                  (id) => id !== currentUser?.uid
                )?.[0]
              }
            />
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                filter: 'grayscale(1)',
              }}
            >
              <InputSection
                setInputSectionOffset={setInputSectionOffset}
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                disabled
              />
            </div>
          </>
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
