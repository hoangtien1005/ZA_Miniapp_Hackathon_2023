/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import { openPhone } from 'zmp-sdk/apis';

import { OLD_FIZA_URL } from '~/configs/app';
import { GROUP_STATE_CARD_AND_LOAN, PRODUCT_TYPE } from '~/constants/enums';
import useOpenLink from '~/ui/hooks/use-open-link';

type SliderProductItemProps = {
  altText?: string;
  onClickItem?: any;
  onClickStatusItem: any;
  hasStatus: boolean;
  productData: any;
};
const STATE_HIDDEN_HOTLINE = GROUP_STATE_CARD_AND_LOAN.APPROVED;
const STATE_INCOMPLETE = GROUP_STATE_CARD_AND_LOAN.INCOMPLETE;

export default function SliderProductItem(product: SliderProductItemProps) {
  const { hasStatus = false, productData = {}, onClickStatusItem } = product;
  const {
    id,
    imageUrl,
    redirectUrl,
    productTypeId,
    name,
    statusText,
    statusClassName,
    promoteContent,
    groupState,
    hotline,
    formSource,
  } = productData;
  const openLink = useOpenLink();
  const handleOnClickProductItem = () => {
    // @ts-ignore
    if (product.onClickItem) product.onClickItem(productData);
    else if (redirectUrl) openLink(redirectUrl);
  };
  const is_insurance_type = productTypeId === PRODUCT_TYPE.INSURANCE;
  const viewHotline = () => {
    openPhone({
      phoneNumber: hotline,
      fail: (error) => {
        console.log('Error open phone', error);
      },
    });
  };
  const goToFormLoan = () => {
    openLink(`${OLD_FIZA_URL}/loan-new/${formSource}`);
  };
  return (
    <div className="card_item" onClick={handleOnClickProductItem}>
      <div className="card_thumb">
        <div className={`${is_insurance_type ? 'thumb_insu' : 'imgDrop'}`}>
          <img alt={product.altText} src={imageUrl} />
        </div>
      </div>
      <div className="card_des">
        <h4 className="ttl fw-700">{name}</h4>
        {hasStatus ? (
          <div>
            <div className="status mt-4 fz-12 color_text_700">
              Trạng thái: <span className={statusClassName}>{statusText}</span>
            </div>
            {groupState !== STATE_HIDDEN_HOTLINE &&
              groupState !== STATE_INCOMPLETE && (
                <a
                  className="btn_next mt-4 color_main fw-700 block"
                  onClick={viewHotline}
                >
                  Liên hệ Hotline
                </a>
              )}

            {groupState === STATE_INCOMPLETE && (
              <a
                className="btn_next mt-4 color_main fw-700 block"
                onClick={goToFormLoan}
              >
                Tiếp tục
              </a>
            )}
          </div>
        ) : (
          <div className="text color_text_700 mt-4 fz-12">{promoteContent}</div>
        )}
      </div>
    </div>
  );
}
