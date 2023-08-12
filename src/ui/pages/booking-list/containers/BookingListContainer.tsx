import React, { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { useBookingService } from '~/adapters/app-service/booking.service';
import { userProfileState } from '~/adapters/store/atoms/user';
import { ANONYMOUS_AVATARS, ANONYMOUS_NAMES } from '~/constants';
import ROUTES from '~/constants/routes';
import { Booking, BookingStatus } from '~/domain/booking';
import { MatchingImg, ThreeDotImg } from '~/ui/assets/images';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { useAppNavigate } from '~/ui/hooks';
import { renderDateTime } from '~/utils/datetime.util';

const getIndex = (id?: string) => {
  if (!id) {
    return 0;
  }
  const index = (id + '')?.split('')?.pop();
  return index || 0;
};

const BookingListContainer = () => {
  const navigate = useAppNavigate();

  const bookingService = useBookingService();
  const [currentUser] = useRecoilState(userProfileState);

  const [data, setData] = useState<{
    activeList: Booking[];
    historyList: Booking[];
  }>({
    activeList: [],
    historyList: [],
  });

  const handle = async () => {
    try {
      const data = await bookingService.getBookingList();

      const bookingList = await Promise.all(
        data.map(async (item) => {
          const partnerInfo = await bookingService.getPartnerInfoFromBooking({
            bookingId: item.bookingId,
          });
          return {
            ...item,
            partner: partnerInfo,
          };
        })
      );
      const activeList = bookingList.filter(
        (item) =>
          item.status === BookingStatus.ACTIVE ||
          item.status === BookingStatus.MATCH
      );
      const historyList = bookingList.filter(
        (item) =>
          item.status === BookingStatus.CANCEL ||
          item.status === BookingStatus.EXPIRED
      );
      setData({
        activeList,
        historyList,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    handle();
  }, []);

  console.log('data', data);

  const handleViewChat = (item: Booking) => {
    console.log('item', item);
    navigate(
      `${ROUTES.CHAT}/${item.conversationId || '-1'}/${item.bookingId}`,
      {
        animate: false,
      }
    );
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
                    {data.activeList?.map((item, index) => {
                      return (
                        <li
                          key={uuidv4()}
                          className="flex module_box gap-16 flex-midle justify-between"
                          onClick={() => handleViewChat(item)}
                        >
                          <div className="flex gap-16 flex-midle">
                            <div className="images_drop w-72">
                              {!item?.partner && <img src={MatchingImg} />}
                              {item?.partner && (
                                <img
                                  src={
                                    ANONYMOUS_AVATARS[
                                      getIndex(item?.partner?.user_id)
                                    ]
                                  }
                                />
                              )}
                            </div>
                            <div className="des fz-12">
                              <h1 className="text-sub text-lg">
                                {!item?.partner && 'Đang tìm kiếm...'}
                                {item?.partner &&
                                  ANONYMOUS_NAMES[
                                    getIndex(item?.partner?.user_id)
                                  ]}
                              </h1>
                              <div className="mt-4">
                                <span className="ml-4">
                                  Tại Chi nhánh quận {index + 1}
                                </span>
                              </div>
                              <div className="mt-4">
                                <span className="text-primary ml-4">
                                  {renderDateTime(item.startTime, item.endTime)}
                                </span>
                                {/* <span className="status_fail ml-4">Thất bại</span> */}
                                {/* <span className="status_done ml-4">Hoàn tất</span> */}
                              </div>
                            </div>
                          </div>
                          <div className="icon">
                            <img src={ThreeDotImg} />
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
                    {data.historyList?.map((item, index) => {
                      return (
                        <li
                          key={uuidv4()}
                          className="flex module_box gap-16 flex-midle justify-between"
                          onClick={() => handleViewChat(item)}
                        >
                          <div className="flex gap-16 flex-midle">
                            <div className="images_drop w-72">
                              {!item?.partner && <img src={MatchingImg} />}
                              {item?.partner && (
                                <img
                                  src={
                                    ANONYMOUS_AVATARS[
                                      getIndex(item?.partner?.user_id)
                                    ]
                                  }
                                />
                              )}
                            </div>
                            <div className="des fz-12">
                              <h1 className="text-sub text-lg">
                                {!item?.partner && 'Đang tìm kiếm...'}
                                {item?.partner &&
                                  ANONYMOUS_NAMES[
                                    getIndex(item?.partner?.user_id)
                                  ]}
                              </h1>
                              <div className="mt-4">
                                <span className="ml-4">
                                  Tại Chi nhánh quận {index + 1}
                                </span>
                              </div>
                              <div className="mt-4">
                                <span className="text-primary ml-4">
                                  {renderDateTime(item.startTime, item.endTime)}
                                </span>
                                {/* <span className="status_fail ml-4">Thất bại</span> */}
                                {/* <span className="status_done ml-4">Hoàn tất</span> */}
                              </div>
                            </div>
                          </div>
                          <div className="icon">
                            <img src={ThreeDotImg} />
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
