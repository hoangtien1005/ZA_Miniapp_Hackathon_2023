import React, { FC, Fragment, useState } from 'react';
import { formatDate, splitLinkFromMessage } from '~/utils/format.util';

import { useRecoilState } from 'recoil';
import { userProfileState } from '~/adapters/store/atoms/user';
import { EMOJI_REGEX } from '~/constants';
import { ConversationInfo, MessageItem } from '~/constants/interface';
import ReactionPopup from '../Chat/ReactionPopup';
import ReplyBadge from '../Chat/ReplyBadge';
import ClickAwayListener from '../ClickAwayListener';
import ReplyIcon from '../Icon/ReplyIcon';
import SpriteRenderer from '../SpriteRenderer';

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
  const [isSelectReactionOpened, setIsSelectReactionOpened] = useState(false);
  const [currentUser] = useRecoilState(userProfileState);

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
                className={`bg-dark-lighten rounded-lg p-2 text-white ${
                  conversation.users.length === 2
                    ? 'after:border-dark-lighten relative after:absolute after:right-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-l-transparent'
                    : ''
                }`}
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

            {isSelectReactionOpened && (
              <ClickAwayListener
                onClickAway={() => setIsSelectReactionOpened(false)}
              >
                {(ref) => (
                  <ReactionPopup
                    position={'left'}
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

export default LeftMessage;
