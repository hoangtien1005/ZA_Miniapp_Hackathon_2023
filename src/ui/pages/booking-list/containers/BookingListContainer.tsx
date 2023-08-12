import React, { useEffect, useState } from 'react';

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
import { Booking, BookingStatus } from '~/domain/booking';
import { mockBooking } from '~/mock/booking.mock';

const BookingListContainer = () => {
  const navigate = useAppNavigate();

  const [data, setData] = useState<{
    activeList: Booking[];
    historyList: Booking[];
  }>({
    activeList: [],
    historyList: [],
  });

  useEffect(() => {
    mockBooking()
      .getBookingList()
      .then((res) => {
        const bookingList = res.data;
        const activeList = bookingList.filter(
          (item) => item.status === BookingStatus.ACTIVE
        );
        const historyList = bookingList.filter(
          (item) => item.status !== BookingStatus.ACTIVE
        );
        setData({
          activeList,
          historyList,
        });
      });
  }, []);

  const handleViewChat = (item: Booking) => {
    navigate(`${ROUTES.CHAT}/${item.conversationId}`);
  };

  return (
    <section className="block_ana has_navBottom pt-24 pb-40">
      <div className="container">
        <Accordion
          allowMultipleExpanded
          preExpanded={['activeList', 'historyList']}
        >
          {data.activeList.length > 0 && (
            <div className="group pt-24 group_data_list list_border_top">
              <AccordionItem uuid="activeList">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="flex flex-midle flex-space pb-24">
                      <div className="ttl fw-700">Cuộc hẹn sắp tới</div>
                      <div className="color_blue_400"></div>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ul className="list_link">
                    {data.activeList?.map((item) => {
                      return (
                        <li
                          key={uuidv4()}
                          className="flex module_box mt-16 gap-16 flex-midle"
                          onClick={() => handleViewChat(item)}
                        >
                          <div className="images_drop w-72">
                            {/* <img src={item.imageUrl} /> */}
                            <img src="https://picsum.photos/200" />
                          </div>
                          <div className="des fz-12">
                            <div className="ttl_item fw-700">
                              {item?.storeName}
                            </div>
                            <div className="status mt-4 color_text_700">
                              Trạng thái:
                              {/* <span
                                className={classNames(
                                  'ml-4',
                                  item.stateClassName
                                )}
                              >
                                {item?.storeName}
                              </span> */}
                              <span className="status_wait ml-4">
                                Đang xử lý
                              </span>
                              <span className="status_fail ml-4">Thất bại</span>
                              <span className="status_done ml-4">Hoàn tất</span>
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
          )}
          {data.historyList.length > 0 && (
            <div className="group pt-24 group_data_list list_border_top">
              <AccordionItem uuid="historyList">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="flex flex-midle flex-space pb-24">
                      <div className="ttl fw-700">Đã hẹn</div>
                      <div className="color_blue_400"></div>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ul className="list_link">
                    {data.historyList?.map((item) => {
                      return (
                        <li
                          key={uuidv4()}
                          className="flex module_box mt-16 gap-16 flex-midle"
                          onClick={() => handleViewChat(item)}
                        >
                          <div className="images_drop w-72">
                            {/* <img src={item.imageUrl} /> */}
                            <img src="https://picsum.photos/200" />
                          </div>
                          <div className="des fz-12">
                            <div className="ttl_item fw-700">
                              {item?.storeName}
                            </div>
                            <div className="status mt-4 color_text_700">
                              Trạng thái:
                              {/* <span
                                className={classNames(
                                  'ml-4',
                                  item.stateClassName
                                )}
                              >
                                {item?.storeName}
                              </span> */}
                              <span className="status_wait ml-4">
                                Đang xử lý
                              </span>
                              <span className="status_fail ml-4">Thất bại</span>
                              <span className="status_done ml-4">Hoàn tất</span>
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
          )}
        </Accordion>
      </div>
    </section>
  );
};

export default withLayoutWrapper(BookingListContainer);
