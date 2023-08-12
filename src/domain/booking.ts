export enum BookingStatus {
  ACTIVE = 'ACTIVE',
  CANCEL = 'CANCEL',
  MATCH = 'MATCH',
  EXPIRED = 'EXPIRED',
}

export interface Booking {
  bookingId: string;
  userId: string;
  oaId: string;
  storeId: string;
  storeName: string;
  startTime: number;
  endTime: number;
  status: BookingStatus;
  conversationId: string | null;
}
