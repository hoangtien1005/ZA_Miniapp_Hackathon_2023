/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import { TYPE_LOGO } from '~/constants/enums';
import useOpenLink from '~/ui/hooks/use-open-link';

type LogoItemProps = {
  altText?: string;
  onClickItem?: any;
  redirectUrl: string;
  bankId: number;
  index: number;
  partnerId: number;
  productId: number;
  id: number;
  name: string;
  imageUrl: string;
  productTypeId: number;
  logoType: TYPE_LOGO;
};

export default function LogoItem(product: LogoItemProps) {
  const openLink = useOpenLink();
  const handleOnClick = () => {
    if (product.onClickItem) product.onClickItem(product);
    else if (product.redirectUrl) openLink(product.redirectUrl);
  };
  return (
    <div className="bank_item" onClick={handleOnClick}>
      <div className="imgDrop bdrs shadow2">
        <img alt={product.altText} src={product.imageUrl} />
      </div>
    </div>
  );
}
