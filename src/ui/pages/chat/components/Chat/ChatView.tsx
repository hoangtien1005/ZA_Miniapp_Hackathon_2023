import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import AvatarFromId from './AvatarFromId';
import InfiniteScroll from 'react-infinite-scroll-component';
import LeftMessage from '../Message/LeftMessage';
import RightMessage from '../Message/RightMessage';
import { useParams } from 'react-router-dom';
import { Spinner } from 'zmp-ui';
import { ConversationInfo, MessageItem } from '~/constants/interface';
import { useRecoilState } from 'recoil';
import { userProfileState } from '~/adapters/store/atoms/user';
import { useMessage } from '~/ui/hooks/use-chat';
import { useSocketService } from '~/adapters/app-service/socket.service';
import { MessageData } from '~/mock/message.mock';
import { useChatService } from '~/adapters/app-service/chat.service';

interface ChatViewProps {
  conversation: ConversationInfo;
  inputSectionOffset: number;
  replyInfo: any;
  setReplyInfo: (value: any) => void;
}

const ChatView: FC<ChatViewProps> = ({
  conversation,
  inputSectionOffset,
  replyInfo,
  setReplyInfo,
}) => {
  const { conversationId } = useParams();

  const [currentUser] = useRecoilState(userProfileState);

  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const [limitCount, setLimitCount] = useState(10);
  const chatService = useChatService();

  // const { data, loading, error } = useCollectionQuery(
  //   `conversation-data-${conversationId}-${limitCount}`,
  //   query(
  //     collection(db, 'conversations', conversationId as string, 'messages'),
  //     orderBy('createdAt'),
  //     limitToLast(limitCount)
  //   )
  // );

  const { loading, error } = {
    loading: false,
    error: null,
  };

  // const { data } = useMessage({ conversationId });

  const [data, setData] = useState<MessageData>({
    messages: [],
    total: 0,
    conversationId: conversationId || '',
  });

  const socketService = useSocketService();

  useEffect(() => {
    chatService
      .getAllMessages({
        conversationId,
      })
      .then((data) => {
        setData({
          messages: data,
          total: data.length,
          conversationId,
        });
      });
  }, []);

  useEffect(() => {
    socketService.onMessageOnce(
      currentUser.uid,
      (receivedData: MessageItem) => {
        console.log('receivedData', receivedData);
        const updatedMessages = [...data?.messages, receivedData];
        setData((prevData) => {
          return {
            ...prevData,
            messages: updatedMessages,
            total: prevData + 1,
          };
        });
      }
    );
  }, [data]);

  const dataRef = useRef(data);
  const conversationIdRef = useRef(conversationId);
  const isWindowFocus = useRef(true);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);

  useEffect(() => {
    if (isWindowFocus.current) updateSeenStatus();

    scrollBottomRef.current?.scrollIntoView();

    setTimeout(() => {
      scrollBottomRef.current?.scrollIntoView();
    }, 100);
  }, [data?.messages?.slice(-1)?.[0]?.id || '']);

  const updateSeenStatus = () => {
    // TODO: update seen status
    // if (dataRef.current?.empty) return;
    // const lastDoc = dataRef.current?.docs?.slice(-1)?.[0];
    // if (!lastDoc) return;
    // updateDoc(doc(db, 'conversations', conversationIdRef.current as string), {
    //   [`seen.${currentUser?.uid}`]: lastDoc.id,
    // });
  };

  useEffect(() => {
    const focusHandler = () => {
      isWindowFocus.current = true;

      updateSeenStatus();
    };

    const blurHandler = () => {
      isWindowFocus.current = false;
    };

    addEventListener('focus', focusHandler);
    addEventListener('blur', blurHandler);

    return () => {
      removeEventListener('focus', focusHandler);
      removeEventListener('blur', blurHandler);
    };
  }, []);

  if (loading)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="flex-grow">
        <p className="mt-4 text-center text-gray-400">Something went wrong</p>
      </div>
    );

  if (data?.total === 0) {
    return (
      <div className="flex-grow">
        <p className="mt-4 text-center text-gray-400">
          No message recently. Start chatting now.
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={(data?.total as number) || 0}
      next={() => setLimitCount((prev) => prev + 10)}
      inverse
      hasMore={(data?.total as number) >= limitCount}
      loader={
        <div className="flex justify-center py-3">
          <Spinner />
        </div>
      }
      style={{ display: 'flex', flexDirection: 'column-reverse' }}
      height={`calc(100vh - ${144 + inputSectionOffset}px)`}
    >
      <div className="flex flex-col items-stretch gap-3 pt-10 pb-1">
        {data?.messages?.map((item, index) => (
          <Fragment key={item.id}>
            {item.sender === currentUser?.uid ? (
              <RightMessage
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                message={item}
              />
            ) : (
              <LeftMessage
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                message={item}
                index={index}
                conversation={conversation}
              />
            )}
            {Object.entries(conversation.seen).filter(
              ([key, value]) => key !== currentUser?.uid && value === item.id
            ).length > 0 && (
              <div className="flex justify-end gap-[1px] px-8">
                {Object.entries(conversation.seen)
                  .filter(
                    ([key, value]) =>
                      key !== currentUser?.uid && value === item.id
                  )
                  .map(([key, value]) => (
                    <AvatarFromId key={key} uid={key} size={14} />
                  ))}
              </div>
            )}
          </Fragment>
        ))}
        <div ref={scrollBottomRef}></div>
      </div>
    </InfiniteScroll>
  );
};

export default ChatView;
