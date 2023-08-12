import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/order
import { useGetSubmittedProfilesByQuery } from '~/application/submittedProfile/useGetSubmittedProfilesByQuery.usecase';

// import { useRecoilState, useRecoilValue } from 'recoil';
import ROUTES from '~/constants/routes';
// import { SubmittedProfile } from '~/domain/submittedProfile';
// import LOG from '~/log';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { useAppNavigate } from '~/ui/hooks';
// import '~/ui/assets/scss/profile.scss';
import Noti from '~/ui/shared/Noti';
import { ProfileImage } from '~/ui/assets/images';

const items = [
  {
    year: '2023',
    list: [1, 2, 3, 4],
  },
  {
    year: '2024',
    list: [1, 2, 3, 4],
  },
  {
    year: '2025',
    list: [1, 2],
  },
  {
    year: '2026',
    list: [1],
  },
];
const ProfileDataListContainer = () => {
  const navigate = useAppNavigate();

  const { data: submittedProfiles } = useGetSubmittedProfilesByQuery({});

  useEffect(() => {
  }, []);

  const handleViewDetailLead = (item) => {

    navigate(`${ROUTES.PROFILE_DATA_INFO}/${item.leadId}/${item.leadType}`);
  };

  return (
    <section className="sec_product">
      <h1 className='heading_home'>Hồ sơ của bạn</h1>
      <div className='user-info'>
        <h5>Hồ sơ ẩn danh</h5>
        <img src={ProfileImage}></img>
        <h3>Chồn ấm áp</h3>
      </div>
    </section>
  );
};

export default withLayoutWrapper(ProfileDataListContainer);
