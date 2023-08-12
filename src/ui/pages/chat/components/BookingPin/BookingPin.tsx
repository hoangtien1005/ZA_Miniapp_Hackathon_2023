import React, { FC, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Skeleton from '../../../../shared/Skeleton';
import { useRecoilState } from 'recoil';
import { userProfileState } from '~/adapters/store/atoms/user';
import { useBookingService } from '~/adapters/app-service/booking.service';
import { Booking } from '~/domain/booking';
import { v4 as uuidv4 } from 'uuid';
import { ANONYMOUS_AVATARS, ANONYMOUS_NAMES } from '~/constants';
import { ThreeDotImg } from '~/ui/assets/images';

interface BookingPinProps {
  bookingId: string;
}

const getIndex = (id: string) => {
  const index = (id + '')?.split('')?.pop();
  return index || 0;
};

const BookingPin: FC<BookingPinProps> = ({ bookingId, partnerId }) => {
  const [currentUser] = useRecoilState(userProfileState);

  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const bookingService = useBookingService();

  console.log('currentBooking', currentBooking);

  useEffect(() => {
    bookingService
      .getBookingDetail({
        bookingId,
      })
      .then((data) => {
        setCurrentBooking(data);
      });
  }, [bookingId]);

  return (
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
        <div className="icon">
          <img src={ThreeDotImg} />
          {/* <i className="icon_right_blue" /> */}
        </div>
      </li>
    </div>
  );
};

export default BookingPin;
