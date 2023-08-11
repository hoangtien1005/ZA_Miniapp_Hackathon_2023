import React from 'react';

import Banner from '~/domain/banner';
import { PartnerLogo } from '~/domain/partnerLogo';
import LogoList from '~/ui/shared/LogoList';
import SliderBanner from '~/ui/shared/SliderBanner';

interface LoansZoneProps {
  loanBanners: Banner[] | undefined;
  loanPartnerLogos: PartnerLogo[] | undefined;
}

export const LoansZone: React.FC<LoansZoneProps> = ({
  loanBanners = [],
  loanPartnerLogos = [],
}) => {
  return (
    <section className="sec_loan sec_module">
      <div className="container">
        <div className="heading">
          <h2 className="ttl fz-16 fw-700">Vay nhanh</h2>
          {/* <a className="link" onClick={viewDetailedLoans}>
            Xem thêm
          </a> */}
        </div>
        <div className="content_main">
          <SliderBanner banners={loanBanners} />
          <LogoList logos={loanPartnerLogos} />
        </div>
      </div>
    </section>
  );
};
