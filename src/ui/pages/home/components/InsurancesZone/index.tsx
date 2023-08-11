import React from 'react';

import Banner from '~/domain/banner';
import { PartnerLogo } from '~/domain/partnerLogo';
import InsuranceEntryList from '~/ui/shared/InsuranceEntryList';
import SliderBanner from '~/ui/shared/SliderBanner';

interface InsurancesZoneProps {
  banners: Banner[] | undefined;
  logos: PartnerLogo[] | undefined;
}

export const InsurancesZone: React.FC<InsurancesZoneProps> = ({
  banners,
  logos,
}) => {
  return (
    <section className="sec_loan sec_module">
      <div className="container">
        <div className="heading">
          <h2 className="ttl fz-16 fw-700">Bảo hiểm</h2>
          {/* <a className="link" onClick={viewDetailedCards}>
            Xem thêm
          </a> */}
        </div>
        <div className="content_main">
          <SliderBanner height="104" banners={banners} />
          <InsuranceEntryList insurances={logos} />
        </div>
      </div>
    </section>
  );
};
