export interface ReservationBookingDtoModel {
  id: number;
  accommodation: number;
  guest: string;
  startDate: string; // Representing date as string in ISO format (yyyy-MM-dd)
  endDate: string;   // Representing date as string in ISO format (yyyy-MM-dd)
  numberOfGuests: number;
}
