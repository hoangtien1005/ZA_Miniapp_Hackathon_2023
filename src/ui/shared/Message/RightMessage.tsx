import React, { FC, Fragment, useState } from 'react';
import { formatDate, splitLinkFromMessage } from '~/utils/format.util';

import { useParams } from 'react-router-dom';
import { EMOJI_REGEX } from '~/constants';
import { MessageItem } from '~/constants/interface';
import ReplyBadge from '../Chat/ReplyBadge';
import ImageView from '../ImageView';
import SpriteRenderer from '../SpriteRenderer';
import { handleOpenWebview } from '~/utils/zalo.util';

interface RightMessageProps {
  message: MessageItem;
  replyInfo: any;
  setReplyInfo: (value: any) => void;
}

const RightMessage: FC<RightMessageProps> = ({ message, setReplyInfo }) => {
  const { id: conversationId } = useParams();

  const [isImageViewOpened, setIsImageViewOpened] = useState(false);

  const removeMessage = (messageId: string) => {
    // TODO: update message
    // updateDoc(
    //   doc(db, 'conversations', conversationId as string, 'messages', messageId),
    //   {
    //     type: 'removed',
    //     file: null,
    //     content: '',
    //     reactions: [],
    //   }
    // );
  };

  const formattedDate = formatDate(
    message.createdAt ? +message.createdAt : Date.now()
  );

  return (
    <div id={`message-${message.id}`}>
      <div className="-mb-2 flex justify-end px-8">
        {!!message.replyTo && (
          <ReplyBadge messageId={message.replyTo as string} />
        )}
      </div>
      <div
        onClick={(e) => {
          if (e.detail === 2 && message.type !== 'removed') {
            setReplyInfo(message);
          }
        }}
        className={`group relative flex flex-row-reverse items-stretch gap-2 px-8 ${
          Object.keys(message.reactions || {}).length > 0 ? 'mb-2' : ''
        }`}
      >
        {message.type === 'text' ? (
          <>
            {EMOJI_REGEX.test(message.content) ? (
              <div
                onClick={(e) => e.stopPropagation()}
                title={formattedDate}
                className="text-4xl"
              >
                cacasca
                {message.content}
              </div>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                title={formattedDate}
                className={`bg-primary text-white relative rounded-lg p-2`}
              >
                {splitLinkFromMessage(message.content).map((item, index) => (
                  <Fragment key={index}>
                    {typeof item === 'string' ? (
                      <span>{item}</span>
                    ) : (
                      <a
                        className="mx-1 inline underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          handleOpenWebview(item.link);
                        }}
                      >
                        {item.link}
                      </a>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </>
        ) : message.type === 'image' ? (
          <>
            <img
              onClick={(e) => {
                setIsImageViewOpened(true);
                e.stopPropagation();
              }}
              title={formattedDate}
              className="max-w-[60%] cursor-pointer transition duration-300 hover:brightness-[85%]"
              src={message.content}
              alt=""
            />
            <ImageView
              src={message.content}
              isOpened={isImageViewOpened}
              setIsOpened={setIsImageViewOpened}
            />
          </>
        ) : message.type === 'sticker' ? (
          <SpriteRenderer
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
            src={message.content}
            size={130}
          />
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            title={formattedDate}
            className="border-dark-lighten rounded-lg border p-3 text-gray-400"
          >
            Message has been removed
          </div>
        )}
      </div>
    </div>
  );
};

export default RightMessage;
