import React, { FC, Fragment, useState } from 'react';
import {
  formatDate,
  formatFileSize,
  splitLinkFromMessage,
} from '~/utils/format.util';

import ClickAwayListener from '../ClickAwayListener';
import ImageView from '../ImageView';
import ReactionPopup from '../Chat/ReactionPopup';
import ReplyBadge from '../Chat/ReplyBadge';
import ReplyIcon from '../Icon/ReplyIcon';
import SpriteRenderer from '../SpriteRenderer';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userProfileState } from '~/adapters/store/atoms/user';
import { MessageItem } from '~/constants/interface';
import { EMOJI_REGEX } from '~/constants';

interface RightMessageProps {
  message: MessageItem;
  replyInfo: any;
  setReplyInfo: (value: any) => void;
}

const RightMessage: FC<RightMessageProps> = ({ message, setReplyInfo }) => {
  const [isSelectReactionOpened, setIsSelectReactionOpened] = useState(false);

  const { id: conversationId } = useParams();

  const [currentUser] = useRecoilState(userProfileState);

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
                {message.content}
              </div>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                title={formattedDate}
                className={`bg-primary after:border-primary relative rounded-lg p-2 text-white after:absolute after:left-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-r-transparent`}
              >
                {splitLinkFromMessage(message.content).map((item, index) => (
                  <Fragment key={index}>
                    {typeof item === 'string' ? (
                      <span>{item}</span>
                    ) : (
                      <a
                        className="mx-1 inline underline"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link}
                      </a>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </>
        ) : message.type === "image" ? (
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

        {message.type !== 'removed' && (
          <>
            <button
              onClick={() => setIsSelectReactionOpened(true)}
              className="text-lg text-gray-500 opacity-0 transition hover:text-gray-300 group-hover:opacity-100"
            >
              <i className="bx bx-smile"></i>
            </button>

            <button
              onClick={(e) => {
                setReplyInfo(message);
                e.stopPropagation();
              }}
              className="text-gray-500 opacity-0 transition hover:text-gray-300 group-hover:opacity-100"
            >
              <ReplyIcon />
            </button>

            <button
              onClick={(e) => {
                removeMessage(message.id as string);
                e.stopPropagation();
              }}
              className="text-lg text-gray-500 opacity-0 transition hover:text-gray-300 group-hover:opacity-100"
            >
              <i className="bx bxs-trash"></i>
            </button>

            {isSelectReactionOpened && (
              <ClickAwayListener
                onClickAway={() => setIsSelectReactionOpened(false)}
              >
                {(ref) => (
                  <ReactionPopup
                    position="right"
                    forwardedRef={ref}
                    setIsOpened={setIsSelectReactionOpened}
                    messageId={message.id as string}
                    currentReaction={
                      message.reactions?.[currentUser?.uid as string] || 0
                    }
                  />
                )}
              </ClickAwayListener>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightMessage;
