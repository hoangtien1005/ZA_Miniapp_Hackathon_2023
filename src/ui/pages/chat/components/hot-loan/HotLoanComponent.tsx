import React from 'react';

import HotLoanList from '../hot-loan-list/HotLoanList';

import { useGetHotProductsByTypeOptimizedQuery } from '~/application/hotProduct/useGetHotProductsByTypeOptimizedQuery';
import { PRODUCT_TYPE } from '~/constants/enums';
import { HotProduct } from '~/domain/hotProduct';
import useOpenLink from '~/ui/hooks/use-open-link';

const HotLoanComponent = () => {
  const openLink = useOpenLink();
  const { data } = useGetHotProductsByTypeOptimizedQuery({
    productType: PRODUCT_TYPE.LOAN,
  });

  const handleOnClickHotProduct = (prd: HotProduct) => {
    if (prd.redirectUrl) openLink(prd.redirectUrl);
  };
  return (
    <>
      <div className="module_box mt-24">
        <div className="module_box_heading">
          <div className="ttl">Gói vay đang Hot</div>
        </div>
        <div className="module_box_boding">
          <HotLoanList data={data} onClickItem={handleOnClickHotProduct} />
        </div>
      </div>
    </>
  );
};

export default HotLoanComponent;
