import React, { FC, useEffect, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Sheet, useSnackbar } from 'zmp-ui';
import { useBookingService } from '~/adapters/app-service/booking.service';
import { ANONYMOUS_AVATARS, ANONYMOUS_NAMES } from '~/constants';
import { Booking } from '~/domain/booking';
import { MatchingImg, ThreeDotImg } from '~/ui/assets/images';
import useDialog from '~/ui/hooks/use-dialog';

interface BookingPinProps {
  bookingId: string;
}

const getIndex = (id: string) => {
  const index = (id + '')?.split('')?.pop();
  return index || 0;
};

const BookingPin: FC<BookingPinProps> = ({ bookingId, partnerId }) => {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [visible, actions] = useDialog();

  const bookingService = useBookingService();
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();

  const timmerId = useRef();

  useEffect(
    () => () => {
      closeSnackbar();
      clearInterval(timmerId.current);
    },
    []
  );

  useEffect(() => {
    bookingService
      .getBookingDetail({
        bookingId,
      })
      .then((data) => {
        setCurrentBooking(data);
      });
  }, [bookingId]);

  const handleClickCTA = () => {
    actions.handleClose();
    openSnackbar({
      icon: true,
      type: 'info',
      text: ' Tính năng đang trong giai đoạn phát triển',
      action: {
        text: 'close',
        close: true,
      },
      duration: 10000000,
    });
  };

  if (!partnerId) {
    return (
      <div className="absolute top-[60px] left-4 right-4 z-[400]">
        <li
          key={uuidv4()}
          className="flex module_box mt-16 gap-16 px-3 py-4 flex-midle justify-between"
        >
          <div className="flex gap-16 flex-midle">
            <div className="images_drop w-72">
              <img src={MatchingImg} />
            </div>
            <div className="des fz-12">
              <h1 className="text-sub text-lg">Đang tìm kiếm...</h1>
              <div className="mt-4">
                <span className="ml-4">Tại Chi nhánh quận 7</span>
              </div>
              <div className="mt-4">
                <span className="text-primary ml-4">30 phút nữa</span>
                {/* <span className="status_fail ml-4">Thất bại</span> */}
                {/* <span className="status_done ml-4">Hoàn tất</span> */}
              </div>
            </div>
          </div>
          <div className="icon" onClick={actions.handleOpen}>
            <img src={ThreeDotImg} />
          </div>
        </li>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-[60px] left-4 right-4 z-[400]">
        <li
          key={uuidv4()}
          className="flex module_box mt-16 gap-16 px-3 py-4 flex-midle justify-between"
        >
          <div className="flex gap-16 flex-midle">
            <div className="images_drop w-72">
              <img src={ANONYMOUS_AVATARS[getIndex(partnerId)]} />
            </div>
            <div className="des fz-12">
              <h1 className="text-sub text-lg">
                {ANONYMOUS_NAMES[getIndex(partnerId)]}
              </h1>
              <div className="mt-4">
                <span className="ml-4">Tại Chi nhánh quận 7</span>
              </div>
              <div className="mt-4">
                {/* <span className={classNames('ml-4', item.stateClassName)}>
              {item?.stateText}
            </span> */}
                <span className="text-primary ml-4">30 phút nữa</span>
                {/* <span className="status_fail ml-4">Thất bại</span> */}
                {/* <span className="status_done ml-4">Hoàn tất</span> */}
              </div>
            </div>
          </div>
          <div className="icon" onClick={actions.handleOpen}>
            <img src={ThreeDotImg} />
            {/* <i className="icon_right_blue" /> */}
          </div>
        </li>
      </div>
      <Sheet
        visible={visible}
        onClose={actions.handleClose}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <div className="flex flex-col justify-center pt-[20px] pb-[40px] px-[40px]">
          <button
            className="btn-primary btn-error-outline mb-16"
            onClick={handleClickCTA}
          >
            Huỷ hẹn
          </button>
          <button
            className="btn-primary btn-warning-outline mb-32"
            onClick={handleClickCTA}
          >
            Dời hẹn
          </button>
          <button
            className="btn-primary btn-error mt-16"
            onClick={handleClickCTA}
          >
            Report
          </button>
        </div>
      </Sheet>
    </>
  );
};

export default BookingPin;
