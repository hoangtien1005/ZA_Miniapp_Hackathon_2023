import React, { FC, Fragment, useState } from 'react';
import { formatDate, splitLinkFromMessage } from '~/utils/format.util';

import { EMOJI_REGEX } from '~/constants';
import { ConversationInfo, MessageItem } from '~/constants/interface';
import ReplyBadge from '../Chat/ReplyBadge';
import SpriteRenderer from '../../../../shared/SpriteRenderer';
import { handleOpenWebview } from '~/utils/zalo.util';
import ImageView from '../../../../shared/ImageView';

interface LeftMessageProps {
  message: MessageItem;
  conversation: ConversationInfo;
  index: number;
  replyInfo: any;
  setReplyInfo: (value: any) => void;
}

const LeftMessage: FC<LeftMessageProps> = ({
  message,
  conversation,
  setReplyInfo,
}) => {
  const [isImageViewOpened, setIsImageViewOpened] = useState(false);

  const formattedDate = formatDate(
    message.createdAt ? +message.createdAt : Date.now()
  );

  return (
    <div id={`message-${message.id}`}>
      <div
        className={`${
          conversation.users.length === 2 ? 'px-8' : 'px-[70px]'
        } -mb-2 flex`}
      >
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
        className={`group relative flex items-stretch gap-2 px-8 ${
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
                {message.content}
              </div>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                title={formattedDate}
                className={`bg-[#F6F6F6] text-[#181818] rounded-lg p-2 ${
                  conversation.users.length === 2 ? 'relative ' : ''
                }`}
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

export default LeftMessage;
