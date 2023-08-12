import { TRACKING_URL } from '~/configs/app';
import { BaseApiService } from '../baseApi.service';
import { bookingFromDTO } from '~/dto/booking';

export interface ParamsGetBookingList {
  user_id: string;
}

class BookingService extends BaseApiService {
  getBookingList(params?: ParamsGetBookingList): Promise<any[]> {
    const path = 'booking/getAllUserBooking';
    return super
      .get(this.generateUrl(path, 'https://zah-4.123c.vn/api'), params)
      .then((res) => {
        const data = res.data.map(bookingFromDTO);
        return data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get booking list: ', err);
        }
        return [];
      });
  }
}
export const useBookingService = () => new BookingService();
