import React from 'react';

import { PaymentZaloZone } from '../components/PaymentZaloZone';
import { ProfileTab } from '../components/ProfileTab';

import '~/ui/assets/scss/profile.scss';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { useAppNavigate } from '~/ui/hooks';
import { StatusLeadZone } from '~/ui/shared/StatusLeadZone';

const ProfileContainer = () => {
  const navigate = useAppNavigate();
  const PROFILE_TAB_ITEMS = [
    {
      label: 'Hồ sơ cá nhân',
      onClick: (item: any) => {
        // navigate(ROUTES.PROFILE_DATA_LIST);
      },
    },
    {
      label: 'Chính sách bảo mật',
      onClick: (item: any) => {
        // handleOpenViewPdf(consent.privacyPolicy);
      },
    },
  ];

  return (
    <section className="sec_profile pt-24 pb-40">
      <div className="container">
        <StatusLeadZone />
        <ProfileTab items={PROFILE_TAB_ITEMS} containerClassName="mt-24" />
        <PaymentZaloZone containerClassName="mt-24" />
      </div>
    </section>
  );
};

export default withLayoutWrapper(ProfileContainer);
