/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import { TYPE_LOGO } from '~/constants/enums';
import useOpenLink from '~/ui/hooks/use-open-link';

type InsuranceEntryItemProps = {
  id: number;
  index: number;
  bankId: number;
  partnerId: number;
  productId: number;
  productTypeId: number;
  imageUrl: string;
  altText?: string;
  name: string;
  onClickItem?: any;
  redirectUrl: string;
  logoType: TYPE_LOGO;
};

export default function InsuranceEntryItem(item: InsuranceEntryItemProps) {
  const openLink = useOpenLink();

  const handleOnClick = () => {
    if (item.onClickItem) item.onClickItem(item);
    else if (item.redirectUrl) openLink(item.redirectUrl);
  };
  return (
    <div className="insu_item bdrs shadow2 p-16" onClick={handleOnClick}>
      <div className="icon sz-32 m-auto">
        <img className="w-full" alt={item.altText} src={item.imageUrl} />
      </div>
      <div className="text mt-8">{item.name}</div>
    </div>
  );
}
