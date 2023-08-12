import { ProfileDTO } from '~/dto/profile';
import { mockApi } from './mock.helper';
import { ResponseData } from '~/adapters/api.helper';
import { Booking, BookingStatus } from '~/domain/booking';

export function mockBooking() {
  return {
    async getBookingList(): Promise<ResponseData<Booking[]>> {
      return mockApi([
        {
          bookingId: '1',
          userId: '1',
          oaId: '1',
          storeId: '1',
          storeName: 'Store 5',
          startTime: Date.now() + '',
          endTime: Date.now() + '',
          status: BookingStatus.ACTIVE,
          conversationId: '2',
        },
        {
          bookingId: '2',
          userId: '1',
          oaId: '1',
          storeId: '1',
          storeName: 'Store 1',
          startTime: Date.now() + '',
          endTime: Date.now() + '',
          status: BookingStatus.CANCEL,
          conversationId: null,
        },
        {
          bookingId: '3',
          userId: '1',
          oaId: '1',
          storeId: '1',
          storeName: 'Store 2',
          startTime: Date.now() + '',
          endTime: Date.now() + '',
          status: BookingStatus.CANCEL,
          conversationId: null,
        },
        {
          bookingId: '4',
          userId: '1',
          oaId: '1',
          storeId: '1',
          storeName: 'Store 3',
          startTime: Date.now() + '',
          endTime: Date.now() + '',
          status: BookingStatus.EXPIRED,
          conversationId: null,
        },
        {
          bookingId: '5',
          userId: '1',
          oaId: '1',
          storeId: '1',
          storeName: 'Store 4',
          startTime: Date.now() + '',
          endTime: Date.now() + '',
          status: BookingStatus.CANCEL,
          conversationId: null,
        },
      ]);
    },
  };
}
