import { Booking, BookingStatus } from '~/domain/booking';

export interface BookingDTO {
  booking_id: string;
  user_id: string;
  oa_id: string;
  store_id: string;
  store_name: string;
  start_time: number;
  end_time: number;
  is_cancel: boolean;
  is_match: boolean;
  conversation_id: string;
}

const getBookingStatus = (dto: BookingDTO): BookingStatus => {
  if (dto.end_time < Date.now()) return BookingStatus.EXPIRED;
  if (dto.is_cancel) return BookingStatus.CANCEL;
  if (dto.is_match) return BookingStatus.MATCH;
  return BookingStatus.ACTIVE;
};

export const bookingFromDTO = (dto: BookingDTO): Booking => {
  if (!dto || Object.keys(dto).length <= 0) return {} as Booking;
  return {
    bookingId: dto.booking_id,
    userId: dto.user_id,
    oaId: dto.oa_id,
    storeId: dto.store_id,
    storeName: dto.store_name,
    startTime: dto.start_time,
    endTime: dto.end_time,
    status: getBookingStatus(dto),
    conversationId: dto.conversation_id,
  };
};
