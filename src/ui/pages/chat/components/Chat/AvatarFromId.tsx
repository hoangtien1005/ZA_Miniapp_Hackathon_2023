import React, { FC } from 'react';
import Skeleton from '../../../../shared/Skeleton';
import { DEFAULT_AVATAR, IMAGE_PROXY } from '~/constants';

interface AvatarFromIdProps {
  uid: string;
  size?: number;
}

const AvatarFromId: FC<AvatarFromIdProps> = ({ uid, size = 30 }) => {
  // const { data, loading, error } = useUsersInfo([uid]);
  // TODO: get user data
  const { data, loading, error } = {
    data: {},
    loading: false,
    error: null,
  };

  if (loading)
    return (
      <Skeleton
        className="rounded-full"
        style={{ width: size, height: size }}
      ></Skeleton>
    );

  if (error)
    return (
      <img
        src={DEFAULT_AVATAR}
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    );

  return (
    <img
      title={data?.avatar}
      style={{ width: size, height: size }}
      className="rounded-full object-cover"
      src={data?.name}
    />
  );
};

export default AvatarFromId;
