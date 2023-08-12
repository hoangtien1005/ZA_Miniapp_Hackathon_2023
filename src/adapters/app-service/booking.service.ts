import { BaseApiService } from '../baseApi.service';

export interface ParamsGetBookingList {
  user_id: string;
}

class BookingService extends BaseApiService {
  getBookingList(params?: ParamsGetBookingList): Promise<any[]> {
    const path = 'bookingByUserId';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res.result;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get booking by user id: ', err);
        }
        return [];
      });
  }
}
export const useBookingService = () => new BookingService();
