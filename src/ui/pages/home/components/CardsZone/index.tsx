import React, { useEffect, useState } from 'react';

import { useGetPromoteProductsByTypeQuery } from '~/application/promoteProduct/useGetPromoteProductsByTypeQuery.usecase';
import { MAX_PROMOTE_CARD_HOME } from '~/constants';
import { PRODUCT_TYPE } from '~/constants/enums';
import { PartnerLogo } from '~/domain/partnerLogo';
import useOpenLink from '~/ui/hooks/use-open-link';
import LogoList from '~/ui/shared/LogoList';
import SliderProduct from '~/ui/shared/SliderProduct';
import { sortTwoItemByIndex } from '~/utils/common.util';

interface CardsZoneProps {
  cardPartnerLogos: PartnerLogo[] | undefined;
}

export const CardsZone: React.FC<CardsZoneProps> = ({ cardPartnerLogos }) => {
  const openLink = useOpenLink();
  const { data: displayProducts } = useGetPromoteProductsByTypeQuery({
    productType: PRODUCT_TYPE.CARD,
    sortFn: sortTwoItemByIndex,
    max: MAX_PROMOTE_CARD_HOME,
  });

  const onClickPromoteProductItem = (productData) => {
    const { id, imageUrl, redirectUrl, productTypeId, productId, index } =
      productData;
    if (redirectUrl) openLink(redirectUrl);
  };

  return (
    <section className="sec_loan sec_module">
      <div className="container">
        <div className="heading">
          <h2 className="ttl fz-16 fw-700">Thẻ tín dụng</h2>
          {/* <a className="link" onClick={viewDetailedCards}>
            Xem thêm
          </a> */}
        </div>
        <div className="content_main">
          <SliderProduct
            products={displayProducts}
            onClickItem={onClickPromoteProductItem}
          />
          <LogoList logos={cardPartnerLogos} />
        </div>
      </div>
    </section>
  );
};
