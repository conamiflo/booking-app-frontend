export interface ReservationBookingDtoModel {
  id: number;
  accommodation: number;
  guest: string;
  startDate: number; // Representing date as string in ISO format (yyyy-MM-dd)
  endDate: number;   // Representing date as string in ISO format (yyyy-MM-dd)
  numberOfGuests: number;
}
