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

// const items = [
//   {
//     year: '2023',
//     list: [1, 2, 3, 4],
//   },
//   {
//     year: '2024',
//     list: [1, 2, 3, 4],
//   },
//   {
//     year: '2025',
//     list: [1, 2],
//   },
//   {
//     year: '2026',
//     list: [1],
//   },
// ];
const ProfileDataListContainer = () => {
  const navigate = useAppNavigate();

  const { data: submittedProfiles } = useGetSubmittedProfilesByQuery({});

  useEffect(() => {
  }, []);

  const handleViewDetailLead = (item) => {
   
    navigate(`${ROUTES.PROFILE_DATA_INFO}/${item.leadId}/${item.leadType}`);
  };

  return (
    <section className="block_ana has_navBottom pt-24 pb-40">
      <div className="container">
        <Noti
          color="blue"
          text="Fiza đang lưu các Thông tin cho quy trình đăng ký Sản phẩm của Quý Khách. Nếu Thu hồi dữ liệu, quy trình sẽ bị hủy."
        />

        <Accordion allowZeroExpanded preExpanded={[0]}>
          {submittedProfiles?.map((itemsByYear, key) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="group pt-24 group_data_list list_border_top">
                <AccordionItem uuid={key}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <div className="flex flex-midle flex-space pb-24">
                        <div className="ttl fw-700">
                          Lịch sử hẹn hò
                        </div>
                        <div className="color_blue_400">
                          <AccordionItemState>
                            {({ expanded }) =>
                              expanded ? 'Thu gọn' : 'Xem thêm'
                            }
                          </AccordionItemState>
                        </div>
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ul className="list_link">
                      {itemsByYear?.list?.map((item) => {
                        return (
                          <li
                            key={uuidv4()}
                            className="flex module_box mt-16 gap-16 flex-midle"
                            onClick={() => handleViewDetailLead(item)}
                          >
                            <div className="images_drop w-72">
                              <img src={item.imageUrl} />
                            </div>
                            <div className="des fz-12">
                              <div className="ttl_item fw-700">
                                {item?.productName}
                              </div>
                              <div className="status mt-4 color_text_700">
                                Trạng thái:
                                <span
                                  className={classNames(
                                    'ml-4',
                                    item.stateClassName
                                  )}
                                >
                                  {item?.stateText}
                                </span>
                                {/* <span className="status_wait ml-4">Đang xử lý</span> */}
                                {/* <span className="status_fail ml-4">Thất bại</span> */}
                                {/* <span className="status_done ml-4">Hoàn tất</span> */}
                              </div>
                            </div>
                            <div className="icon sz-14">
                              <i className="icon_right_blue" />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionItemPanel>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default withLayoutWrapper(ProfileDataListContainer);
