import { BaseApiService } from '../baseApi.service';
import { bookingFromDTO } from '~/dto/booking';
import { Booking } from '~/domain/booking';

export interface ParamsGetBookingList {
  user_id: string;
}

class BookingService extends BaseApiService {
  getBookingList(params?: ParamsGetBookingList): Promise<Booking[]> {
    const path = 'booking/getAllUserBooking';
    return super
      .get(this.generateUrl(path, 'http://118.102.2.130/zahackathondb/api'), params)
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

  getBookingDetail(params: { bookingId: string }): Promise<Booking> {
    const path = 'booking/get';
    return super
      .get(this.generateUrl(path, 'http://118.102.2.130/zahackathondb/api'), params)
      .then((res) => {
        const data = bookingFromDTO(res.data);
        return data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get booking detail: ', err);
        }
        return [];
      });
  }
}
export const useBookingService = () => new BookingService();
