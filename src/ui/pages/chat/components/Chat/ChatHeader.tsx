import React, { FC, useState } from 'react';

import { Link } from 'react-router-dom';
import Skeleton from '../../../../shared/Skeleton';
import { ConversationInfo } from '~/constants/interface';
import { useRecoilState } from 'recoil';
import { userProfileState } from '~/adapters/store/atoms/user';

interface ChatHeaderProps {
  conversation: ConversationInfo;
}

const ChatHeader: FC<ChatHeaderProps> = ({ conversation }) => {
  // const { data: users, loading } = useUsersInfo(conversation.users);
  const { data: users, loading } = {
    data: [],
    loading: false,
  };
  const [currentUser] = useRecoilState(userProfileState);

  const filtered = users?.filter((user) => user.id !== currentUser?.uid);

  return (
    <>
      <div className="border-dark-lighten flex h-20 items-center justify-between border-b px-5">
        <div className="flex flex-grow items-center gap-3">
          <Link to="/" className="md:hidden">
            <i className="bx bxs-chevron-left text-primary text-3xl"></i>
          </Link>
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <>
              {conversation.users.length === 2 && (
                <img
                  className="h-10 w-10 rounded-full"
                  src={filtered?.avatar}
                  alt=""
                />
              )}
            </>
          )}

          {loading ? (
            <Skeleton className="h-6 w-1/4" />
          ) : (
            <p>
              {conversation.users.length === 2 &&
                filtered
                  ?.map((user) => user?.avatar)
                  .slice(0, 3)
                  .join(', ')}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
