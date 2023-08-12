import React from 'react';

import { ZALOPAY_PAYMENT_URL } from '~/configs/app';
import { PaymentZalopayImg } from '~/ui/assets/images';
import { handleOpenWebview } from '~/utils/zalo.util';

interface PaymentZaloZoneProps {
  containerClassName?: string;
}

export const PaymentZaloZone: React.FC<PaymentZaloZoneProps> = ({
  containerClassName,
}) => {
  const handleClickPayment = () => {
    handleOpenWebview(ZALOPAY_PAYMENT_URL);
  };

  return (
    <div
      className={`module_payment ${containerClassName}`}
      onClick={handleClickPayment}
    >
      <div className="payment payment_zalopay">
        <div className="icon sz-40">
          <img className="w-full" src={PaymentZalopayImg} alt="" />
        </div>
        <div className="content">
          <div className="ttl fw-500">Truy vấn/Thanh toán khoản vay</div>
          <div className="text mt-4 fz-12">
            Thanh toán khoản vay với Zalopay
          </div>
        </div>
      </div>
    </div>
  );
};
