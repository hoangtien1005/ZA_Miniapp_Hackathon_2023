/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import useOpenLink from '~/ui/hooks/use-open-link';

type EntryItemProps = {
  imageUrl: string;
  name: string;
  altText?: string;
  onClickItem?: any;
  redirectUrl: string;
  index: number;
  id: number;
  iconType: number;
};

export default function EntryItem(item: EntryItemProps) {
  const openLink = useOpenLink();

  const handleOnClick = () => {
    if (item.onClickItem) item.onClickItem(item);
    else if (item.redirectUrl) openLink(item.redirectUrl);
  };
  return (
    <div className="scroll_item">
      <div className="icon m-auto sz-24">
        <img
          className="w-full"
          alt={item.altText}
          src={item.imageUrl}
          onClick={handleOnClick}
        />
      </div>
      <div className="text mt-12 text-center">{item.name}</div>
    </div>
  );
}
